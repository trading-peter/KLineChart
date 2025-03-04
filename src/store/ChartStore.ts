/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import KLineData from '../common/KLineData'
import Precision from '../common/Precision'
import VisibleData from '../common/VisibleData'
import { getDefaultStyles, Styles, getDefaultCustomApi, CustomApi, defaultLocale, Options } from '../common/Options'

import { isArray, isString, merge } from '../common/utils/typeChecks'

import TimeScaleStore from './TimeScaleStore'
import IndicatorStore from './IndicatorStore'
import CrosshairStore from './CrosshairStore'
import OverlayStore from './OverlayStore'
import ActionStore from './ActionStore'

import { getStyles } from '../extension/styles/index'

import Chart from '../Chart'

export default class ChartStore {
  /**
   * Internal chart
   */
  private readonly _chart: Chart

  /**
   * Style config
   */
  private readonly _styles: Styles = getDefaultStyles()

  /**
   * Custom api
   */
  private readonly _customApi: CustomApi = getDefaultCustomApi()

  /**
   * language
   */
  private _locale: string = defaultLocale

  /**
   * Price and volume precision
   */
  private _precision: Precision = { price: 2, volume: 0 }

  /**
   * Data source
   */
  private _dataList: KLineData[] = []

  /**
   * Drag pane flag
   */
  private _dragPaneFlag = false

  /**
   * Time scale store
   */
  private readonly _timeScaleStore = new TimeScaleStore(this)

  /**
   * Indicator store
   */
  private readonly _indicatorStore = new IndicatorStore(this)

  /**
   * Overlay store
   */
  private readonly _overlayStore = new OverlayStore(this)

  /**
   * Crosshair store
   */
  private readonly _crosshairStore = new CrosshairStore(this)

  /**
   * Chart action store
   */
  private readonly _actionStore = new ActionStore()

  /**
   * Visible data array
   */
  private _visibleDataList: VisibleData[] = []

  constructor (chart: Chart, options?: Options) {
    this._chart = chart
    this.setOptions(options)
  }

  /**
   * @description Adjust visible data
   * @return {*}
   */
  adjustVisibleDataList (): void {
    this._visibleDataList = []
    const { from, to } = this._timeScaleStore.getVisibleRange()
    for (let i = from; i < to; i++) {
      const kLineData = this._dataList[i]
      const x = this._timeScaleStore.dataIndexToCoordinate(i)
      this._visibleDataList.push({
        dataIndex: i,
        x,
        data: kLineData
      })
    }
  }

  setOptions (options?: Options): ChartStore {
    if (options !== undefined) {
      const { locale, timezone, styles, customApi } = options
      if (locale !== undefined) {
        this._locale = locale
      }
      if (timezone !== undefined) {
        this._timeScaleStore.setTimezone(timezone)
      }
      if (styles !== undefined) {
        if (isString(styles)) {
          merge(this._styles, getStyles(styles as string))
        } else {
          merge(this._styles, styles)
        }
      }
      if (customApi !== undefined) {
        merge(this._customApi, customApi)
      }
    }
    return this
  }

  getStyles (): Styles {
    return this._styles
  }

  getLocale (): string {
    return this._locale
  }

  getCustomApi (): CustomApi {
    return this._customApi
  }

  getPrecision (): Precision {
    return this._precision
  }

  setPrecision (precision: Precision): ChartStore {
    this._precision = precision
    this._indicatorStore.setSeriesPrecision(precision)
    return this
  }

  getDataList (): KLineData[] {
    return this._dataList
  }

  getVisibleDataList (): VisibleData[] {
    return this._visibleDataList
  }

  addData (data: KLineData | KLineData[], pos: number, more?: boolean): void {
    if (isArray(data)) {
      this._timeScaleStore.setLoading(false)
      this._timeScaleStore.setMore(more ?? true)
      const isFirstAdd = this._dataList.length === 0
      this._dataList = (data as KLineData[]).concat(this._dataList)
      if (isFirstAdd) {
        this._timeScaleStore.resetOffsetRightDistance()
      }
      this._timeScaleStore.adjustVisibleRange()
    } else {
      const dataSize = this._dataList.length
      if (pos >= dataSize) {
        this._dataList.push(data as KLineData)
        let offsetRightBarCount = this._timeScaleStore.getOffsetRightBarCount()
        if (offsetRightBarCount < 0) {
          this._timeScaleStore.setOffsetRightBarCount(--offsetRightBarCount)
        }
        this._timeScaleStore.adjustVisibleRange()
      } else {
        this._dataList[pos] = data as KLineData
        this.adjustVisibleDataList()
      }
    }
    this._crosshairStore.recalculate(true)
  }

  clearDataList (): void {
    this._dataList = []
    this._visibleDataList = []
    this._timeScaleStore.clear()
  }

  getTimeScaleStore (): TimeScaleStore {
    return this._timeScaleStore
  }

  getIndicatorStore (): IndicatorStore {
    return this._indicatorStore
  }

  getOverlayStore (): OverlayStore {
    return this._overlayStore
  }

  getCrosshairStore (): CrosshairStore {
    return this._crosshairStore
  }

  getActionStore (): ActionStore {
    return this._actionStore
  }

  getChart (): Chart {
    return this._chart
  }

  getDragPaneFlag (): boolean {
    return this._dragPaneFlag
  }

  setDragPaneFlag (flag: boolean): ChartStore {
    this._dragPaneFlag = flag
    return this
  }
}
