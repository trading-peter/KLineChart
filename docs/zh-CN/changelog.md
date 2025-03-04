# 📠 更新日志
## 9.0.0-alpha6
`2023-01-20`
+ 🆕 国际化支持增量注册。
+ 💄 优化部分typescript入参。
+ 🐞 修复由深色主题切换到浅色主题不生效问题。
+ 🐞 修复y轴缩放滚动问题。
+ 🐞 修复覆盖物删除，图表刷新问题。

## 9.0.0-alpha5
`2023-01-17`
+ 🆕 实例方法`createIndicator`和`overrideIndicator`新增成功回调。
+ 🆕 样式`indicator.lines`和`overlay.line`新增`smooth`。
+ 💄 优化指标计算方法触发条件。
+ 💄 优化样式`overlay`。


## 9.0.0-alpha4
`2023-01-12`
+ 🐞 修复创建主图指标不更新问题。
+ 🐞 修复删除覆盖物问题。
+ 💄 优化内置覆盖物。


## 9.0.0-alpha3
`2023-01-11`
+ 🆕 新增实例方法`getVisibleRange`。
+ 🐞 修复反转y轴垂直缩放问题。


## 9.0.0-alpha2
`2023-01-10`
+ 🆕 `Overlay`支持分组。
+ 🐞 修复无数据时，提示显示问题。


## 9.0.0-alpha1
`2023-01-09`
+ 🛠 Typescript重构。
+ 🆕 新特性
   + 新增Y轴方向缩放，滚动。
   + API
     + 新增基图表方法`registerFigure`，`getSupportFigures`，`getFigureClass`，`rigisterOverlay`，`getSupportOverlays`，`registerLocale`，`getSupportLocales`，`registerStyles`。
     + 新增实例方法，`getSize`，`setLocale`，`getLocal`，`setCustomApi`，`createOverlay`，`getOverlayById`，`overrideOverlay`，`removeOverlay`。
   + 样式配置
     + 新增`candle.priceMark.last.text.borderStyle`，`indicator.lastValueMark.text.borderStyle`，`crosshair.horizontal.text.borderStyle`，`crosshair.vertical.text.borderStyle`。
+ 👉 变更
   + API
     + 图表方法`extension.addTechnicalIndicatorTemplate`变更为`registerIndicator`。
     + 图表方法`extension.addShapeTemplate`变更为`registerOverlay`。
     + 实例方法`setStyleOptions`变更为`setStyles`。
     + 实例方法`getStyleOptions`变更为`getStyles`。
     + 实例方法`setPaneOptions(options)`，`options`新增属性`gap`。
     + 实例方法`setOffsetRightSpace`变更为`setOffsetRightDistance`。
     + 实例方法`createTechnicalIndicator`变更为`createIndicator`。
     + 实例方法`overlayTechnicalIndicator`变更为`overlayIndicator`。
     + 实例方法`getTechnicalIndicatorByPaneId`变更为`getIndicatorByPaneId`。
     + 实例方法`removeTechnicalIndicator`变更为`removeIndicator`。
   + 样式配置
     + 所有`line.style`选项变更为`solid`和`dashed`。
     + 所有`dashValue`变更为`dashedValue`。
     + `xAxis.height`变更为`xAxis.size`，`xAxis.tickText.paddingTop`变更为`xAxis.tickText.marginStart`，`xAxis.tickText.paddingBottom`变更为`xAxis.tickText.marginEnd`。
     + `yAxis.height`变更为`yAxis.size`，`yAxis.tickText.paddingTop`变更为`yAxis.tickText.marginStart`，`yAxis.tickText.paddingBottom`变更为`yAxis.tickText.marginEnd`。
     + `technicalIndicator.bar`变更为`indicator.bars`，`technicalIndicator.line`变更为`indicator.lines`，`technicalIndicator.circle`变更为`indicator.circles`。
   + 自定义扩展
      + 技术指标属性`calcParams`，变更为支持任意类型。
      + 技术指标属性`plots`变更为`figures`。
      + 技术指标属性`regeneratePlots`变更为`regeneratefigures`。
      + 技术指标属性`calcTechnicalIndicator`变更为`calc`。
      + 技术指标属性`render`变更为`draw`。
+ 🗑 废弃
   + API
      + 删除实例方法`getWidth`，`getHeight`，改用`getSize`。
      + 删除实例方法`createShape`，`createAnnotation`，`createTag`，改用`createOverlay`。
      + 删除实例方法`removeShape`，`removeAnnotation`，`removeTag`，改用`removeOverlay`。
      + 删除实例方法`setShapeOptions`，改用`overrideOverlay`。
      + 删除实例方法`createHtml`，`removeHtml`，`addTechnicalIndicatorTemplate`，`getTechnicalIndicatorTemplate`，`addShapeTemplate`。
   + 样式配置
      + 删除`shape`，`annotation`，`tag`，改用`overlay`。
      + 删除`candle.margin`，`technicalIndicator.margin`。
   + 自定义扩展
      + 技术指标模版不再保存相关属性。
      + 技术指标删除属性`shouldCheckParamCount`。
      + 删除`Shape`，改用`Overlay`。


## 8.x

去[Github](https://github.com/liihuu/KLineChart/blob/v8.6.3/docs/zh-CN/changelog.md)上查看 8.x 的 Change Log。


## 7.x

去[Github](https://github.com/liihuu/KLineChart/blob/v7.5.0/docs/zh-CN/changelog.md)上查看 7.x 的 Change Log。

## 6.x

去[Github](https://github.com/liihuu/KLineChart/blob/v6.1.0/docs/zh-CN/CHANGELOG.md)上查看 6.x 的 Change Log。

## 5.x

去[Github](https://github.com/liihuu/KLineChart/releases/tag/v5.0.0)上查看 5.x 的版本记录。

## 4.x

去[Github](https://github.com/liihuu/KLineChart/releases/tag/v4.0.0)上查看 4.x 的版本记录。
