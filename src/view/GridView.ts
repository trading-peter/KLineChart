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

import XAxis from '../component/XAxis'
import YAxis from '../component/YAxis'

import { PaneIdConstants } from '../pane/Pane'

import View from './View'

export default class GridView extends View<YAxis> {
  protected drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = this.getWidget().getPane()
    const chart = pane.getChart()
    const bounding = widget.getBounding()

    const gridStyles = chart.getStyles().grid
    const show = gridStyles.show

    if (show) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over'
      const horizontalStyles = gridStyles.horizontal
      const horizontalShow = horizontalStyles.show
      if (horizontalShow) {
        const xAxis = chart.getPaneById(PaneIdConstants.XAXIS)?.getAxisComponent() as XAxis
        xAxis.getTicks().forEach(tick => {
          this.createFigure(
            'line',
            {
              coordinates: [
                { x: tick.coord, y: 0 },
                { x: tick.coord, y: bounding.height }
              ]
            },
            horizontalStyles
          )?.draw(ctx)
        })
      }
      const verticalStyles = gridStyles.vertical
      const verticalShow = verticalStyles.show
      if (verticalShow) {
        const yAxis = pane.getAxisComponent()
        yAxis.getTicks().forEach(tick => {
          this.createFigure(
            'line',
            {
              coordinates: [
                { x: 0, y: tick.coord },
                { x: bounding.width, y: tick.coord }
              ]
            },
            verticalStyles
          )?.draw(ctx)
        })
      }
      ctx.restore()
    }
  }
}
