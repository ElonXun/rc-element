## API

### Tag Attributes

| 参数 | 说明 | 类型 | 可选值| 默认值 |
| --- | --- | --- | --- | --- |
| type | 标签主题 | string | success/info/warning/danger | - |
| onClose | 关闭 Tag 时触发的事件 | (tagKey) => void | - | - |
| tagKey | 标签标示 | string | - | - |
| size | 标签尺寸 | string | medium / small / mini | - |
| style | 自定义style | object | - | - |



### Tag Events

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 标签是否可以关闭 | boolean | false |


## 说明
> 为达到 element-ui 中 [tag](http://element.eleme.io/#/zh-CN/component/tag) 组件标签移除和新加入时的动画效果
> 最开始选用css translation,开发过程中发现动态减少tag组件时没有触发关闭动画,与预期效果不相符
> 暂时可以使用setTimeout延迟onClose回调来达到预期关闭动画效果

#### 核心代码
```
    tag.tsx

    public handleIconClick = () => {
        const onClose = this.props.onClose;
        if (onClose) {
            this.setState({
                closing: true
            });
            setTimeout(()=>{
                onClose(this.props.tagKey);
            },200)
        }
    }

    const classString = classNames('rc_el_tag', {
        [`rc_el_tag_${type}`]: isPresetType,
        [`rc_el_tag_${size}`]: isPresetSize,
        'rc_el_tag_closed': this.state.closing,
    });

    tag.css
    
    .rc_el_tag_closed {
        opacity: 0;
        transform: scaleX(0);
    }

    .rc_el_tag {
        opacity: 1;
        transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }

```
>此方法虽然做到了关闭动画效果  但新增一个新tag时不会有新增动画故还是不符合预期

ps：详情请看[codeSandBox](https://codesandbox.io/s/vv2kz6ynpy)
