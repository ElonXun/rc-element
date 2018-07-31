## API

### Progress Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| percentage | 进度条百分比 | number |  0-100 | 0 |
| type | 进度条类型 | string | line/circle | line |
| strokeWidth `(type=line)` | 进度条线的宽度，单位 px | number | - | 8 |
| strokeWidth `(type=circle)` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | - | 6 |
| status | 进度条当前状态 | string | success/exception/active | - |
| color | 进度条背景色（会覆盖 status 状态颜色） | string | - | - |
| circleWidth `(type=circle)` | 圆形进度条画布宽度（只在 type=circle 时可用） | number | - | 126 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true/false | true |
| textInside `(type=line)` | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | true/false | true |


## 说明
> 比较 antd 和 element 两个组件库中progress的写法 antd-progress使用 vertical-align:middle来做垂直居中处理  在没有height和line-height的时候是个好方法 此外 element-progress并未处理progress组件的垂直居中

### 使用示例
[![Edit 0ynk8zp64p](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0ynk8zp64p)