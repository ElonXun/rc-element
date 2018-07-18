import * as React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames'; 
import RadioProps from './interface';

export default class Radio extends React.Component<RadioProps, {}> {
    public static defaultProps = {
        disabled: false,
        label: '0'
    }
    constructor(props: RadioProps){
        super(props);
    }

    public render(){
        // const wrapperClassString = classNames(className, {
            // [`${prefixCls}-wrapper`]: true,
            // [`${prefixCls}-wrapper-checked`]: radioProps.checked,
            // [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
        // });
        return(
            // <label
            //     class="el-radio"
            //     :class="[
            //     border && radioSize ? 'el-radio--' + radioSize : '',
            //     { 'is-disabled': isDisabled },
            //     { 'is-focus': focus },
            //     { 'is-bordered': border },
            //     { 'is-checked': model === label }
            //     ]"
            //     role="radio"
            //     :aria-checked="model === label"
            //     :aria-disabled="isDisabled"
            //     :tabindex="tabIndex"
            //     @keydown.space.stop.prevent="model = isDisabled ? model : label"
            // >
            //     <span class="el-radio__input"
            //     :class="{
            //         'is-disabled': isDisabled,
            //         'is-checked': model === label
            //     }"
            //     >
            //     <span class="el-radio__inner"></span>
            //     <input
            //         class="el-radio__original"
            //         :value="label"
            //         type="radio"
            //         aria-hidden="true"
            //         v-model="model"
            //         @focus="focus = true"
            //         @blur="focus = false"
            //         @change="handleChange"
            //         :name="name"
            //         :disabled="isDisabled"
            //         tabindex="-1"
            //     >
            //     </span>
            //     <span class="el-radio__label" @keydown.stop>
            //     <slot></slot>
            //     <template v-if="!$slots.default">{{label}}</template>
            //     </span>
            // </label>
            <label>test</label>
        )
    }
}