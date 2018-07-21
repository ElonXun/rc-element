## API

### Tag Attributes

| 参数 | 说明 | 类型 | 可选值| 默认值 |
| --- | --- | --- | --- | --- |
| type | 标签主题 | string | success/info/warning/danger | - |
| closable | 标签是否可以关闭 | boolean | - | false |
| tagKey | 标签标示 | string | - | - |
| size | 标签尺寸 | string | medium / small / mini | - |
| style | 自定义style | object | - | - |



### Tag Events

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onClose | 关闭 Tag 时触发的事件 | (tagKey) => void | - |


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

>后使用css animation 属性在tag刚渲染时加入动画

#### 核心代码

```
   tag.css
   .rc_el_tag {
        animation:show .3s;
   }

   @keyframes show {
        from {
            opacity: 0;
            transform: scaleX(0);
        }
        to {
            opacity: 1;
            transform: scaleX(1);
        }
   }
```
> 结果还是不尽人意

ps：详情请看[codeSandBox](https://codesandbox.io/s/5z9lynmkwx)

> 参考antd的[tag](https://github.com/ant-design/ant-design/blob/782abe7bb63eff175dadc0b65fdcbeb292c24b42/components/tag/index.tsx)组件 发现antd用的是他们自己基于[ReactCSSTransitionGroup](https://reactjs.org/docs/animation.html)封装的[rc-animate](rc-animate)

>最后决定使用[ReactCSSTransitionGroup](https://reactjs.org/docs/animation.html)相关的API 但开发过程中还是发现transitionLeave事件在父组件变化state使子组件消失时没有调用 未找到原因 最后还是妥协自己写了一个setTimeout延迟onCLose事件变相实现transitionLeave事件

#### 核心代码

```
    tag.css
    .rc_el_tag {
        opacity: 1;
        transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }

    .rc_el_tag_zoom-appear {
        opacity: 0.5;
    }

    .rc_el_tag_zoom-appear.rc_el_tag_zoom-appear-active {
        opacity: 1;
        transition: opacity .3s ease-in;
    }

    .rc_el_tag_closed {
        opacity: 0;
        transform: scaleX(0);
    }

    tag.tsx
    public handleIconClick = () => {
        const onClose = this.props.onClose;
        if (onClose) {
            this.setState({
                closing: true
            });
            setTimeout(()=>{
                onClose(this.props.tagKey);               
            },300)
        }
    }

    public render() {
        const { type, style, size, children, closable } = this.props;
        const isPresetType = this.isPresetType(type);
        const isPresetSize = this.isPresetSize(size);
        const closeIcon = closable ? 
            <i className="rc_el_tag_close rc_el_tag_icon_close" 
                onClick={this.handleIconClick}
            /> 
            : '';
        const classString = classNames('rc_el_tag', {
            [`rc_el_tag_${type}`]: isPresetType,
            [`rc_el_tag_${size}`]: isPresetSize,
            'rc_el_tag_closed': this.state.closing,
        });
        const tagStyle = {
            ...style
        }

        
        const tag = <span className={classString} style={tagStyle}>
                        {children || 'tag'}
                        {closeIcon}
                    </span>
        return (
            <ReactCSSTransitionGroup 
                transitionName="rc_el_tag_zoom"
                transitionAppear={true}
                transitionEnter={false}
                transitionLeave={false}
                transitionAppearTimeout={300}>
                {tag}
            </ReactCSSTransitionGroup>
        )
    }
```
