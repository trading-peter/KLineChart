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

import Coordinate from '../../common/Coordinate'
import { PolygonStyle, PolygonType, LineType } from '../../common/Options'

import { FigureTemplate } from '../../component/Figure'

export function checkCoordinateOnPolygon (coordinate: Coordinate, polygon: PolygonAttrs): boolean {
  let on = false
  const coordinates = polygon.coordinates
  for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
    if (
      (coordinates[i].y > coordinate.y) !== (coordinates[j].y > coordinate.y) &&
      (coordinate.x < (coordinates[j].x - coordinates[i].x) * (coordinate.y - coordinates[i].y) / (coordinates[j].y - coordinates[i].y) + coordinates[i].x)
    ) {
      on = !on
    }
  }
  return on
}

export function drawPolygon (ctx: CanvasRenderingContext2D, attrs: PolygonAttrs, styles: Partial<PolygonStyle>): void {
  const { coordinates } = attrs
  const {
    style = PolygonType.FILL,
    color = 'currentColor',
    borderSize = 1,
    borderColor = 'currentColor',
    borderStyle = LineType.SOLID,
    borderDashedValue = [2, 2]
  } = styles
  if (style === PolygonType.FILL || styles.style === PolygonType.STROKE_FILL) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(coordinates[0].x, coordinates[0].y)
    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i].x, coordinates[i].y)
    }
    ctx.closePath()
    ctx.fill()
  }
  if (style === PolygonType.STROKE || styles.style === PolygonType.STROKE_FILL) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderSize
    if (borderStyle === LineType.DASHED) {
      ctx.setLineDash(borderDashedValue)
    } else {
      ctx.setLineDash([])
    }
    ctx.beginPath()
    ctx.moveTo(coordinates[0].x, coordinates[0].y)
    for (let i = 1; i < coordinates.length; i++) {
      ctx.lineTo(coordinates[i].x, coordinates[i].y)
    }
    ctx.closePath()
    ctx.stroke()
  }
}

export interface PolygonAttrs {
  coordinates: Coordinate[]
}

const polygon: FigureTemplate<PolygonAttrs, Partial<PolygonStyle>> = {
  name: 'polygon',
  checkEventOn: checkCoordinateOnPolygon,
  draw: (ctx: CanvasRenderingContext2D, attrs: PolygonAttrs, styles: Partial<PolygonStyle>) => {
    drawPolygon(ctx, attrs, styles)
  }
}

export default polygon
