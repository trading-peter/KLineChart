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

import Bounding from '../common/Bounding'
import { AxisStyle, Styles } from '../common/Options'

import { LineAttrs } from '../extension/figure/line'
import { TextAttrs } from '../extension/figure/text'

import Axis, { AxisTick } from '../component/Axis'

import View from './View'

export default abstract class AxisView<C extends Axis> extends View<C> {
  drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const axis = pane.getAxisComponent()
    const styles: AxisStyle = this.getAxisStyles(pane.getChart().getStyles())
    if (styles.show) {
      if (styles.axisLine.show) {
        this.createFigure('line', this.createAxisLine(bounding, styles), styles.axisLine)?.draw(ctx)
      }
      const ticks = axis.getTicks()
      if (styles.tickLine.show) {
        const lines = this.createTickLines(ticks, bounding, styles)
        lines.forEach(line => {
          this.createFigure('line', line, styles.tickLine)?.draw(ctx)
        })
      }
      if (styles.tickText.show) {
        const texts = this.createTickTexts(ticks, bounding, styles)
        texts.forEach(text => {
          this.createFigure('text', text, styles.tickText)?.draw(ctx)
        })
      }
    }
  }

  protected abstract getAxisStyles (styles: Styles): AxisStyle

  protected abstract createAxisLine (bounding: Bounding, styles: AxisStyle): LineAttrs
  protected abstract createTickLines (ticks: AxisTick[], bounding: Bounding, styles: AxisStyle): LineAttrs[]
  protected abstract createTickTexts (tick: AxisTick[], bounding: Bounding, styles: AxisStyle): TextAttrs[]
}
