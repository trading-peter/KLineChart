# Instance API

## getDom(paneId, position)
```typescript
(paneId?: string, position?: 'root' | 'main' | 'yAxis') => HTMLElement
```
Get the dom container.
- `paneId` window id, the default is the entire chart container
- `position` options are 'root', 'main' and 'yAxis', default is 'root'


## getSize(paneId, position)
```typescript
(paneId?: string, position?: 'root' | 'main' | 'yAxis') => {
   width: number,
   height: number,
   left: number,
   top: number,
   right: number,
   bottom: number
}
```
Get the dimensions.
- `paneId` window id, the default is the entire chart container
- `position` position, supports `root`, `main`, `yAxis`, the default is `root`


## setStyles(styles)
```typescript
(styles: string | object) => HTMLElement
```
Set style configuration.
- `styles` style configuration, which can be the style name registered through `registerStyles`. When it is an object, please refer to [styles](/guide/style) for details, and it supports merging.


## getStyles()
```typescript
() => object
```
Get the style configuration, return the complete type refer to [styles](/guide/style).


## setPriceVolumePrecision(pricePrecision, volumePrecision)
```typescript
(pricePrecision: number, volumePrecision: number) => void
```
Setting the price and volume precision, while the technical indicator series is 'price' or 'volume' will also be affected.
- `pricePrecision` price precision
- `volumePrecision` volume precision


## setTimezone(timezone)
```typescript
(timezone: string) => void
```
Set the time zone.
- `timezone` time zone name, such as 'Asia/Shanghai', if not set, it will automatically get the local time zone, please refer to [Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List ).


## getTimezone()
```typescript
() => string
```
Get the chart time zone name.


## setZoomEnabled(enabled)
```typescript
(enabled: boolean) => void
```
Set whether to scale.


## isZoomEnabled()
```typescript
() => boolean
```
Whether it can be scaled.


## setScrollEnabled(enabled)
```typescript
(enabled: boolean) => void
```
Set whether dragging and scrolling is possible.


##isScrollEnabled()
```typescript
(enabled: boolean) => void
```
Whether dragging and scrolling is possible.


## setOffsetRightDistance(distance)
```typescript
(distance: number) => void
```
Sets the gap that can be left to the right of the chart.


## setLeftMinVisibleBarCount(barCount)
```typescript
(barCount: number) => void
```
Sets the minimum number of visible candles to the left.


## setRightMinVisibleBarCount(barCount)
```typescript
(barCount: number) => void
```
Sets the minimum number of visible candles to the right.


## setBarSpace(space)
```typescript
(space: number) => void
```
Sets the width of a single candlestick of the chart.


## getBarSpace()
```typescript
() => number
```
Gets the width of a single candlestick on the chart.

## getVisibleRange()
```typescript
() => { from: number, to: number }
```
Get visible range.


## applyNewData(dataList, more)
```typescript
(
   dataList: Array<{
     timestamp: number,
     open: number,
     close: number,
     high: number,
     low: number,
     volume?: number,
     turnover?: number
   }>,
   more?: boolean
) => void
```
Add new data, this method will clear the chart data, no need to call the clearData method additionally.
- `dataList` is an array of K-line data. For details of the data type, please refer to [data](/guide/data)
- `more` tells the chart whether there is more historical data, can be defaulted, the default is true


## applyMoreData(dataList, more)
```typescript
(
   dataList: Array<{
     timestamp: number,
     open: number,
     close: number,
     high: number,
     low: number,
     volume?: number,
     turnover?: number
   }>,
   more?: boolean
) => void
```
Add more historical data.
- `dataList` is an array of K-line data. For details of the data type, please refer to [data](/guide/data)
- `more` tells the chart whether there is more historical data, can be defaulted, the default is true


## updateData(data)
```typescript
(data: {
   timestamp: number,
   open: number,
   close: number,
   high: number,
   low: number,
   volume?: number,
   turnover?: number
}) => void
```
Update data. Currently, only the timestamp of the last piece of data will be matched. If it is the same, it will be overwritten, and if it is different, it will be appended.
- `data` single k-line data, please refer to [data](/guide/data) for details of data type


## getDataList()
```typescript
() => Array<{
   timestamp: number,
   open: number,
   close: number,
   high: number,
   low: number,
   volume?: number,
   turnover?: number
}>
```
Get the current data source of the chart. For the returned data type, please refer to [data](/guide/data).


## clearData()
```typescript
() => void
```
Clear the data of the chart. Generally, it is not necessary to call it manually. In order to avoid repeated drawing, the data is only cleared here, and the chart will not be redrawn.


## loadMore(cb)
```typescript
(cb: (timestamp: number | null) => void) => void
```
Set load more callback function.
- `cb` is a callback method, `timestamp` is the timestamp of the first piece of data.

## createIndicator(value, isStack, paneOptions, callback)
```typescript
(
   value: string | {
   name: string,
     shortName?: string,
     precision?: number,
     calcParams?: any[],
     shouldOhlc?: boolean,
     shouldFormatBigNumber?: boolean,
     extendData?: any,
     series?: 'normal' | 'price' | 'volume',
     figures?: Array<{
       key: string,
       title?: string,
       type?: string,
       baseValue?: number,
       styles?: (
         data: object,
         indicator: object,
         defaultStyles: object
       ) => { style?: 'solid' | 'dashed' | 'stroke' | 'fill' | 'stroke_fill', color?: string }
     }>
     minValue?: number,
     maxValue?: number,
     styles?: object,
     calc?: (dataList: KLineData[], indicator: object) => Promise<object[]> | object[],
     regenerateFigures?: (calcParms: any[]) => Array<{
       key: string,
       title?: string,
       type?: string,
       baseValue?: number,
       styles?: (
         data: object,
         indicator: object,
         defaultStyles: object
       ) => { style?: 'solid' | 'dashed' | 'stroke' | 'fill' | 'stroke_fill', color?: string }
     }>,
     createTooltipDataSource?: (params: object) => {
       name?: string,
       calcParamsText?: string,
       values?: Array<{
         title: string | { text: string, color: string },
         value: string | { text: string, color: string }
       }>
     },
     draw?: (params: object) => boolean
   },
   isStack?: boolean,
   paneOptions?: {
     id?: string,
     height?: number,
     minHeight?: number,
     dragEnabled?: boolean
     gap?: {
       top?: number,
       bottom?: number
     }
   } | null,
   callback?: () => void
) => string | null
```
Create a technical indicator, the return value is a string that identifies the window, which is very important, and this identification is required for some subsequent operations on the window.
- `value` technical indicator name or technical indicator object, when it is an object, the type is consistent with the input parameter of the chart method `overrideIndicator`
- `isStack` is overrides
- `paneOptions` window configuration information, can be default
    - `id` window id, can be default
    - `height` window height, can be default
    - `minHeight` minimum height of the window, can be defaulted
    - `dragEnbaled` Whether the window can be dragged to adjust the height, it can be defaulted
    - `gap` margins
      - `top` top margin, value less than 1 is a percentage
      - `bottom` bottom margin, value less than 1 is a percentage
- `callback` success callback
<Alert type="info">
   Special id: 'candle_pane', the window id of the main picture
</Alert>

Example:
```javascript
chart.createTechnicalIndicator('MA', false, {
   id: 'pane_1',
   height: 100,
   minHeight: 30,
   dragEnabled: true,
   gap: { top: 0.2, bottom: 0.1 }
}, () => {})
```

## overrideIndicator(override, paneId, callback)
```typescript
(
   override: {
     name: string,
     shortName?: string,
     precision?: number,
     calcParams?: any[],
     shouldOhlc?: boolean,
     shouldFormatBigNumber?: boolean,
     extendData?: any,
     series?: 'normal' | 'price' | 'volume',
     figures?: Array<{
       key: string,
       title?: string,
       type?: string,
       baseValue?: number,
       styles?: (
         data: object,
         indicator: object,
         defaultStyles: object
       ) => { style?: 'solid' | 'dashed' | 'stroke' | 'fill' | 'stroke_fill', color?: string }
     }>
     minValue?: number,
     maxValue?: number,
     styles?: object,
     calc?: (dataList: KLineData[], indicator: object) => Promise<object[]> | object[],
     regenerateFigures?: (calcParms: any[]) => Array<{
       key: string,
       title?: string,
       type?: string,
       baseValue?: number,
       styles?: (
         data: object,
         indicator: object,
         defaultStyles: object
       ) => { style?: 'solid' | 'dashed' | 'stroke' | 'fill' | 'stroke_fill', color?: string }
     }>,
     createTooltipDataSource?: (params: object) => {
       name?: string,
       calcParamsText?: string,
       values?: Array<{
         title: string | { text: string, color: string },
         value: string | { text: string, color: string }
       }>
     },
     draw?: (params: object) => boolean
   },
   paneId?: string | null,
   callback?: () => void
) => void
```
Overlay technical indicator information.
- `override` some parameters that need to be overridden
   - `name` metric name, unique identifier for creation and operation
   - `shortName` short name for display
   - `precision` precision
   - `calcParams` calculation parameters
   - `shouldOhlc` needs ohlc auxiliary graphics
   - `shouldFormatBigNumber` should format large numbers. For example, 1000 is converted to 1k, 1000000 is converted to 1M, etc.
   - `extendData` extended data
   - `series` indicator series, optional options are 'normal', 'price' and 'volume'
   - `figures` graphics configuration
   - `minValue` specifies the minimum value
   - `maxValue` specifies the maximum value
   - `styles` styles
   - `calc` calculation method
   - `regenerateFigures` method to regenerate figure information
   - `createTooltipDataSource` method to create custom tip information
   - `draw` custom drawing method
- `paneId` window id, default is set to all
- `callback` success callback
<Alert type="info">
   Special paneId: 'candle_pane', the window id of the main image
</Alert>

Example:
```javascript
chart.overrideIndicator({
   name: 'BOLL',
   showName: 'BOLL'
   calcParams: [20, 5.5],
   precision: 4,
   shouldOhlc: true,
   shouldFormatBigNumber: false,
   extendData: 2432435,
   series: 'price',
   figures: [],
   minValue: null,
   maxValue: null,
   calc: () => [],
   regenerateFigures: () => [],
   draw: () => {},
   styles: {
   bars: [{
       style: 'fill,
       borderStyle: 'solid,
       borderSize: 1,
       borderDashedValue: [2, 2],
       upColor: '#26A69A',
       downColor: '#EF5350',
       noChangeColor: '#888888'
     }],
     lines: [{
       size: 1,
       style: 'solid',
       dashedValue: [2, 2],
       color: '#FF9600'
     }],
     circles: [{
       style: 'fill,
       borderStyle: 'solid,
       borderSize: 1,
       borderDashedValue: [2, 2],
       upColor: '#26A69A',
       downColor: '#EF5350',
       noChangeColor: '#888888'
     }]
   }
}, 'candle_pane', () => {})
```

## getIndicatorByPaneId(paneId, name)
```typescript
(paneId?: string, name?: string) => object
```
Obtain technical indicator information according to the window id.
- `paneId` window id, that is, the window ID returned when calling the `createIndicator` method, can be defaulted, and all will be returned by default.
- `name` technical indicator name
<Alert type="info">
   Special paneId: 'candle_pane', the window id of the main image
</Alert>


## removeIndicator(paneId, name)
```typescript
(paneId: string, name?: string) => object
```
Remove technical indicators.
- `paneId` window id, that is, the window ID returned when calling the `createIndicator` method
- `name` technical indicator name, if default, will remove all
<Alert type="info">
   Special paneId: 'candle_pane', the window id of the main image
</Alert>

## createOverlay(value, paneId)
```typescript
(
   value: string | {
     name: string,
     id?: string,
     groupId?: string,
     lock?: boolean,
     needDefaultPointFigure?: boolean,
     needDefaultXAxisFigure?: boolean,
     needDefaultYAxisFigure?: boolean,
     mode?: 'normal' | 'weak_magnet' | 'strong_magnet',
     points?: Array<{ timestamp?: number, dataIndex?: number, value?: number }>,
     extendData?: any,
     styles?: object,
     onDrawStart?: (event: object) => boolean,
     onDrawing?: (event: object) => boolean,
     onDrawEnd?: (event: object) => boolean,
     onClick?: (event: object) => boolean,
     onRightClick?: (event: object) => boolean,
     onPressedMoveStart?: (event: object) => boolean,
     onPressedMoving?: (event: object) => boolean,
     onPressedMoveEnd?: (event: object) => boolean,
     onMouseEnter?: (event: object) => boolean,
     onMouseLeave?: (event: object) => boolean,
     onRemoved?: (event: object) => boolean,
     onSelected?: (event: object) => boolean,
     onDeselected?: (event: object) => boolean
   },
   paneId?: string
) => string | null
```
Creates an overlay, returning an identifier of type String.
- `value` Overlay name or object, when it is an object, the parameters are consistent with `overrideOverlay`
- `paneId` window id, can be default
<Alert type="info">
   Special paneId: 'candle_pane', the window id of the main image
</Alert>

Example:
```javascript
chart.createOverlay({
   name: 'segment',
   id: 'segment_1',
   groupId: 'segment',
   points: [
     { timestamp: 1614171282000, value: 18987 },
     { timestamp: 1614171202000, value: 16098 },
   ],
   styles: {
     line: {
       style: 'solid',
       dashedValue: [2, 2]
       color: '#f00',
       size: 2
     }
   },
   lock: false,
   mode: 'weak_magnet',
   extendData: 'xxxxxxxx',
   needDefaultPointFigure: false,
   needDefaultXAxisFigure: false,
   needDefaultYAxisFigure: false,
   onDrawStart: function (event) { console. log(event) },
   onDrawing: function (event) { console. log(event) },
   onDrawEnd: function (event) { console. log(event) },
   onClick: function (event) { console. log(event) },
   onRightClick: function (event) {
     console. log(event)
     return false
   },
   onMouseEnter: function (event) { console. log(event) },
   onMouseLeave: function (event) { console. log(event) },
   onPressedMoveStart: function (event) { console. log(event) },
   onPressedMoving: function (event) { console. log(event) },
   onPressedMoveEnd: function (event) { console. log(event) },
   onRemoved: function (event) { console. log(event) },
   onSelected: function (event) { console. log(event) },
   onDeselected: function (event) { console. log(event) }
})
```

## getOverlayById(id)
```typescript
(id: string) => object
```
Get overlay information by id.
- `id` calls the `createOverlay` method to return the ID


## overrideOverlay(override)
```typescript
(
   override: {
     name: string,
     id?: string,
     groupId?: string,
     lock?: boolean,
     needDefaultPointFigure?: boolean,
     needDefaultXAxisFigure?: boolean,
     needDefaultYAxisFigure?: boolean,
     mode?: 'normal' | 'weak_magnet' | 'strong_magnet',
     points?: Array<{ timestamp?: number, dataIndex?: number, value?: number }>,
     extendData?: any,
     styles?: object,
     onDrawStart?: (event: object) => boolean,
     onDrawing?: (event: object) => boolean,
     onDrawEnd?: (event: object) => boolean,
     onClick?: (event: object) => boolean,
     onRightClick?: (event: object) => boolean,
     onPressedMoveStart?: (event: object) => boolean,
     onPressedMoving?: (event: object) => boolean,
     onPressedMoveEnd?: (event: object) => boolean,
     onMouseEnter?: (event: object) => boolean,
     onMouseLeave?: (event: object) => boolean,
     onRemoved?: (event: object) => boolean,
     onSelected?: (event: object) => boolean,
     onDeselected?: (event: object) => boolean
   }
) => string | null
```
Overlays that have been drawn.
- `override` parameters that need to be overridden
   - `name` overlay name, unique identifier for creation
   - `id` Overlay identification, if the id exists, it will be based on the id to overwrite
   - `groupId` Group id
   - `lock` is locked to prevent dragging
   - `needDefaultPointFigure` needs a default point figure
   - `needDefaultXAxisFigure` needs the default x-axis figure
   - `needDefaultYAxisFigure` needs the default y-axis figure
   - `mode` mode, options are 'normal', 'weak_magnet' and 'strong_magnet'
   - `points` point information
   - `extendData` extended data
   - `styles` styles
   - `onDrawStart` start drawing event
   - `onDrawing` drawing event
   - `onDrawEnd` draw end event
   - `onClick` click event
   - `onRightClick` right click event
   - `onPressedMoveStart` press start move event
   - `onPressedMoving` Press and move event
   - `onPressedMoveEnd` Press and move end event
   - `onMouseEnter` mouse enter event
   - `onMouseLeave` mouse out event
   - `onRemoved` delete event
   - `onSelected` selected event
   - `onDeselected` deselected event

Example:
```javascript
chart.overrideOverlay({
   name: 'segment',
   id: 'segment_1',
   groupId: 'segment',
   points: [
     { timestamp: 1614171282000, value: 18987 },
     { timestamp: 1614171202000, value: 16098 },
   ],
   styles: {
     line: {
       style: 'solid',
       dashedValue: [2, 2]
       color: '#f00',
       size: 2
     }
   },
   lock: false,
   mode: 'weak_magnet',
   extendData: 'xxxxxxxx',
   needDefaultPointFigure: false,
   needDefaultXAxisFigure: false,
   needDefaultYAxisFigure: false,
   onDrawStart: function (event) { console. log(event) },
   onDrawing: function (event) { console. log(event) },
   onDrawEnd: function (event) { console. log(event) },
   onClick: function (event) { console. log(event) },
   onRightClick: function (event) {
     console. log(event)
     return false
   },
   onMouseEnter: function (event) { console. log(event) },
   onMouseLeave: function (event) { console. log(event) },
   onPressedMoveStart: function (event) { console. log(event) },
   onPressedMoving: function (event) { console. log(event) },
   onPressedMoveEnd: function (event) { console. log(event) },
   onRemoved: function (event) { console. log(event) },
   onSelected: function (event) { console. log(event) },
   onDeselected: function (event) { console. log(event) }
})
```

## removeOverlay(remove)
```typescript
(
  remove: string | {
    id?: string,
    groupId?: string,
    name?: string
  }
) => void
```
Remove graphics.
- `id` The ID returned by calling the `createOverlay` method.
- `groupId` Group id
- `name` Overlay name


## scrollByDistance(distance, animationDuration)
```typescript
(distance: number, animationDuration?: number) => void
```
Scroll a certain distance.
- `distance` distance
- `animationDuration` animation time, can be default, default is no animation


## scrollToRealTime(animationDuration)
```typescript
(distance: number, animationDuration?: number) => void
```
Scroll to original position.
- `animationDuration` animation time, can be default, default is no animation


## scrollToDataIndex(dataIndex, animationDuration)
```typescript
(dataIndex: number, animationDuration?: number) => void
```
Scroll to the specified location.
- `dataIndex` the index of the data
- `animationDuration` animation time, can be default, default is no animation

## scrollToTimestamp(timestamp, animationDuration)
```typescript
(timestamp: number, animationDuration?: number) => void
```
Scroll to the specified timestamp.
- `timestamp` timestamp
- `animationDuration` animation time, can be default, default is no animation


## zoomAtCoordinate(scale, coordinate, animationDuration)
```typescript
(scale: number, coordinate?: { x: number, y: number }, animationDuration?: number) => void
```
Scale at a certain coordinate point.
- `scale` scaling factor
- `coordinate` coordinate point, can be defaulted, the default is to zoom in the middle of the chart
- `animationDuration` animation time, can be default, default is no animation


## zoomAtDataIndex(scale, dataIndex, animationDuration)
```typescript
(scale: number, dataIndex: number, animationDuration?: number) => void
```
Scale at a certain position.
- `scale` scaling factor
- `dataIndex` the index of the data
- `animationDuration` animation time, can be default, default is no animation


## zoomAtTimestamp(scale, timestamp, animationDuration)
```typescript
(scale: number, timestamp: number, animationDuration?: number) => void
```
Scale on the specified timestamp.
- `scale` scaling factor
- `timestamp` timestamp
- `animationDuration` animation time, can be default, default is no animation


## setPaneOptions(options)
```typescript
(options: {
   id: string,
   height?: number,
   minHeight?: number,
   dragEnabled?: boolean
   gap?: {
     top?: number,
     bottom?: number
   }
}) => void
```
Set window configuration.
- `paneOptions` window configuration information, can be default
    - `id` window id
    - `height` window height, can be default
    - `minHeight` minimum height of the window, can be defaulted
    - `dragEnbaled` Whether the window can be dragged to adjust the height, it can be defaulted
    - `gap` margins
      - `top` top margin, value less than 1 is a percentage
      - `bottom` bottom margin, value less than 1 is a percentage
<Alert type="info">
   Special id: 'candle_pane', the window id of the main picture
</Alert>

Example:
```javascript
chart.setPaneOptions({
   id: 'pane_1',
   height: 100,
   minHeight: 3,
   dragEnabled: true,
   gap: { top: 0.2, bottom: 0.1 }
})
```


## subscribeAction(type, callback)
```typescript
(
   type: 'onZoom' | 'onScroll' | 'onVisibleDataChange' | 'onCrosshairChange' | 'onPaneDrag',
   callback: (data?: any) => void
) => void
```
Subscribe to chart actions.
- `type` options are 'onZoom', 'onScroll', 'onVisibleDataChange', 'onCrosshairChange' and 'onPaneDrag'
- `callback` is a callback method


## unsubscribeAction(type, callback)
```typescript
(
   type: 'onZoom' | 'onScroll' | 'onVisibleDataChange' | 'onCrosshairChange' | 'onPaneDrag',
   callback?: (data?: any) => void
) => void
```
Unsubscribe from chart actions.
- `type` options are 'onZoom', 'onScroll', 'onVisibleDataChange', 'onCrosshairChange' and 'onPaneDrag'
- `callback` is the callback method when subscribing, the default is to cancel all the current types


## convertToPixel(value, finder)
```typescript
(
   value: {
     dataIndex?: number,
     timestamp?: number,
     value?: number
   } | Array<{
     dataIndex?: number,
     timestamp?: number,
     value?: number
   }>,
   finder: {
     paneId?: string,
     absolute?: boolean
   }
) => { x: number?, y?: number } | Array<{ x?: number, y?: number }>
```
Convert values to coordinates.
- `value` The value to be converted, it can be an object or an array
   - `dataIndex` data index, if `dataIndex` and `timestamp` exist at the same time, it will be converted according to the index
   - `timestamp` timestamp
   - `value` corresponds to the value of the y-axis
- `finder` filter
   - `paneId` window id
   - `absolute` is an absolute coordinate, only works on the y axis


## convertFromPixel(coordinate, finder)
```typescript
(
   coordinate: { x: number?, y?: number } | Array<{ x?: number, y?: number },
   finder: {
     paneId?: string,
     absolute?: boolean
   }
) => {
     dataIndex?: number,
     timestamp?: number,
     value?: number
   } | Array<{
     dataIndex?: number,
     timestamp?: number,
     value?: number
   }>
```
Convert coordinates to values.
- `coordinate` needs to be converted, it can be an object or an array
- `finder` filter
   - `paneId` window id
   - `absolute` is an absolute coordinate, only works on the y axis


## getConvertPictureUrl(includeOverlay, type, backgroundColor)
```typescript
(includeOverlay?: boolean, type?: string, backgroundColor?: string) => string
```
Get the image url after the chart is converted into an image.
- `includeOverlay` needs to include the overlay layer, it can be defaulted
- `type` The converted image type, one of the three types of 'png', 'jpeg', 'bmp', can be defaulted, the default is 'jpeg'
- `backgroundColor` background color, can be defaulted, the default is '#FFFFFF'


## resize()
```typescript
() => void
```
Resizing the chart will always fill the container size.
<Alert type="warning">
   Note: This method will recalculate the size of each module in the entire chart, frequent calls may affect performance, please call with caution
</Alert>
