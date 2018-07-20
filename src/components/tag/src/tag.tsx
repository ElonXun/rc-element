import classNames from 'classnames';
import * as React from 'react';
// import PropTypes from 'prop-types';
import './tag.css';

export interface ITagProps {
    /** 标签是否可以关闭 */
    closable?: boolean;
    type?: string;
    style?: React.CSSProperties;
    size?: string;
    /** 关闭时的回调 */
    onClose?: (arg1?: string) => void;
    tagKey?: string;
}

export interface ITagStates {
    closing: boolean;
}

export default class Tag extends React.Component<ITagProps, ITagStates> {
    public static defaultProps = {
        closable: false,
    }
    constructor(props: ITagProps) {
        super(props);
        this.state = {
            closing: false
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

    public handleIconClick = () => {
        const onClose = this.props.onClose;
        if (onClose) {
            this.setState({
                closing: true
            });
            setTimeout(() => {
                onClose(this.props.tagKey);
            }, 200)
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
        return (
            <span className={classString} style={tagStyle}>
                {children || 'tag'}
                {closeIcon}
            </span>
        )
    }
}