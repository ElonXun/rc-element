import classNames from 'classnames';
import * as React from 'react';
// import PropTypes from 'prop-types';
import './tag.css';

export interface ITagProps {
    color?: string;
    /** 标签是否可以关闭 */
    closable?: boolean;
    type?: string;
    style?: React.CSSProperties;
    size?: string;
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
        if (!type) { return false };
        return /(success|info|warning|danger)/gi.test(type)
    }

    public isPresetSize(size?: string): boolean {
        if (!size) { return false };
        return /(medium|small|mini)/gi.test(size)
    }

    public render() {
        const { type, style, size, children, closable } = this.props;
        const isPresetType = this.isPresetType(type);
        const isPresetSize = this.isPresetSize(size);
        const closeIcon = closable ?
            <i className="rc_el_tag_close rc_el_tag_icon_close"
            // onClick={this.handleIconClick} 
            />
            : '';
        const classString = classNames('rc_el_tag', {
            [`rc_el_tag_${type}`]: isPresetType,
            [`rc_el_tag_${size}`]: isPresetSize,
            // [`${prefixCls}-close`]: this.state.closing,
            'test': true,
        });
        const tagStyle = {
            ...style
        }
        return (
            <span className={classString} style={tagStyle}>
                {/* <i class="el-tag__close el-icon-close"
                v-if="closable"
                @click.stop="handleClose"></i> */}
                {children || 'tag'}
                {closeIcon}
            </span>
        )
    }
}