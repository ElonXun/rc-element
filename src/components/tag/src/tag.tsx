import classNames from 'classnames';
import * as React from 'react';
// import PropTypes from 'prop-types';
import './tag.css';

export interface ITagProps {
    color?: string;
    /** 标签是否可以关闭 */
    closable?: boolean;
    type?: string;
} 

export default class Tag extends React.Component<ITagProps, {}> {
    public static defaultProps = {
        closable: false,
    }
    constructor(props: ITagProps) {
        super(props);
        this.state = {      
        }
    }

    public isPresetType(type?: string): boolean {
        if (!type) {return false};
        return /(success|info|warning|danger)/gi.test(type)
    }

    public render() {
        const { color, type } = this.props;
        const isPresetType = this.isPresetType(type);
        const classString = classNames('rc_el_tag', {
            [`rc_el_tag_${type}`]: isPresetType,
            // [`${prefixCls}-has-color`]: (color && !isPresetColor),
            // [`${prefixCls}-close`]: this.state.closing,
            'test': true,
        });
        const tagStyle = {
            backgroundColor: color
        }
        return (
            <span className={classString} style={tagStyle}
            // :class="[
            //     type ? 'el-tag--' + type : '',
            //     tagSize && `el-tag--${tagSize}`,
            //     {'is-hit': hit}
            // ]"
            // :style="{backgroundColor: color}"
            >
            {/* <slot></slot> */}
            {/* <i class="el-tag__close el-icon-close"
                v-if="closable"
                @click.stop="handleClose"></i> */}
                tag
            </span>
        )
    }
}