## API

### Progress Attributes

| 参数 | 说明 | 类型 | 可选值| 默认值 |
| --- | --- | --- | --- | --- |
| type | 标签主题 | string | success/info/warning/danger | - |
| closable | 标签是否可以关闭 | boolean | - | false |
| tagKey | 标签标示 | string | - | - |
| size | 标签尺寸 | string | medium / small / mini | - |
| style | 自定义style | object | - | - |



### Progress Events

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onClose | 关闭 Tag 时触发的事件 | (tagKey) => void | - |


## 说明
> 比较antd和element两个组件库中progress的写法 antd-progress使用 vertical-align:middle来做垂直居中处理  在没有heigh和line-height的时候是个好方法 此外 element-progress并未处理progress组件的垂直居中