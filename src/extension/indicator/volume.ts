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

import KLineData from '../../common/KLineData'
import { IndicatorStyle } from '../../common/Options'
import { formatValue } from '../../common/utils/format'

import { Indicator, IndicatorTemplate, IndicatorFigureStylesCallbackData, IndicatorSeries, IndicatorFigure } from '../../component/Indicator'

interface Vol {
  volume?: number
  ma1?: number
  ma2?: number
  ma3?: number
}

const volume: IndicatorTemplate<Vol> = {
  name: 'VOL',
  shortName: 'VOL',
  series: IndicatorSeries.VOLUME,
  calcParams: [5, 10, 20],
  shouldFormatBigNumber: true,
  precision: 0,
  minValue: 0,
  figures: [
    { key: 'ma1', title: 'MA5: ', type: 'line' },
    { key: 'ma2', title: 'MA10: ', type: 'line' },
    { key: 'ma3', title: 'MA20: ', type: 'line' },
    {
      key: 'volume',
      title: 'VOLUME: ',
      type: 'bar',
      baseValue: 0,
      styles: (data: IndicatorFigureStylesCallbackData<Vol>, indicator: Indicator, defaultStyles: IndicatorStyle) => {
        const kLineData = data.current.kLineData as KLineData
        let color: string
        if (kLineData.close > kLineData.open) {
          color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor) as string
        } else if (kLineData.close < kLineData.open) {
          color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor) as string
        } else {
          color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor) as string
        }
        return { color }
      }
    }
  ],
  regenerateFigures: (params: any[]) => {
    const figures: Array<IndicatorFigure<Vol>> = params.map((p: number, i: number) => {
      return { key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' }
    })
    figures.push({
      key: 'volume',
      title: 'VOLUME: ',
      type: 'bar',
      baseValue: 0,
      styles: (data: IndicatorFigureStylesCallbackData<Vol>, indicator: Indicator, defaultStyles: IndicatorStyle) => {
        const kLineData = data.current.kLineData as KLineData
        let color: string
        if (kLineData.close > kLineData.open) {
          color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor) as string
        } else if (kLineData.close < kLineData.open) {
          color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor) as string
        } else {
          color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor) as string
        }
        return { color }
      }
    })
    return figures
  },
  calc: (dataList: KLineData[], indicator: Indicator<Vol>) => {
    const { calcParams: params, figures } = indicator
    const volSums: number[] = []
    return dataList.map((kLineData: KLineData, i: number) => {
      const volume = kLineData.volume ?? 0
      const vol: Vol = { volume }
      params.forEach((p, index) => {
        volSums[index] = (volSums[index] ?? 0) + volume
        if (i >= p - 1) {
          vol[figures[index].key] = volSums[index] / p
          volSums[index] -= (dataList[i - (p - 1)].volume ?? 0)
        }
      })
      return vol
    })
  }
}

export default volume
