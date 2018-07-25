import classNames from 'classnames';
import * as React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Animate from 'rc-animate';
// import PropTypes from 'prop-types';
import './progress.css';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'default' | 'small';

export interface IProgressProps {
    type?: ProgressType;
    size?: ProgressSize;
    strokeWidth?: number;
    style?: React.CSSProperties;
    tagKey?: string;
}

export interface ITagStates {
    closing: boolean;
}

export default class Tag extends React.Component<IProgressProps, {}> {
    public static defaultProps = {
        type: 'line' as ProgressType,
    }
    constructor(props: IProgressProps) {
        super(props);
        this.state = {
            // closing: false
        }
    }

    // public isPresetType(type?: string): boolean {
    //     if (!type) { return false };
    //     return /(success|info|warning|danger)/gi.test(type)
    // }

    // public isPresetSize(size?: string): boolean {
    //     if (!size) { return false };
    //     return /(medium|small|mini)/gi.test(size)
    // }

    public render() {
        const { type } = this.props;
        let progress;
        if (type === 'line') {
            const percentStyle = {
                height: '8px',
                width: '30%',
                // background: strokeColor,
            };
            progress = (
                <div>
                    <div className={`rc-el-progress`}>
                        <div className={`rc-el-progress-inner`}>
                            <div className={`rc-el-progress-bg`} style={percentStyle} />
                            {/* {successSegment} */}
                        </div>
                    </div>
                    {/* {progressInfo} */}
                </div>
            );
        }

        const classString = classNames({
            [`rc-el-progress - ${type === 'dashboard' && 'circle' || type}`]: true,
            // [`${prefixCls}-${type === 'dashboard' && 'circle' || type}`]: true,
            // [`${prefixCls}-status-${progressStatus}`]: true,
            // [`${prefixCls}-show-info`]: showInfo,
            // [`${prefixCls}-${size}`]: size,
        });

        return (
            <div className={classString}>
                {progress}
            </div>
        )
    }
}