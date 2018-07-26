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
    showInfo?: boolean;
    percentage?: number;
    status?: 'success' | 'active' | 'exception';
    color?: string;
    style?: React.CSSProperties;
    tagKey?: string;
}

export interface ITagStates {
    closing: boolean;
}

const validProgress = (progress: number | undefined) => {
    if (!progress || progress < 0) {
        return 0;
    } else if (progress > 100) {
        return 100;
    }
    return progress;
};

export default class Tag extends React.Component<IProgressProps, {}> {
    public static defaultProps = {
        percentage: 0,
        showInfo: true,
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
        const { type, showInfo, percentage, color, status } = this.props;
        let progress;
        let progressInfo;
        const textFormatter = (percentNumber: number) => (`${percentNumber}%`);
        const statusIconClassNames = classNames('rc-el-icon-progress',
            { [`rc-el-icon-progress-circle-${status}`]: status === 'success' || status === 'exception' }
        );
        if (showInfo) {
            let text;
            if (status !== 'success' && status !== 'exception') {
                text = textFormatter(validProgress(percentage));
            } else if (status === 'success') {
                text = <i className={statusIconClassNames} />
            } else if (status === 'exception') {
                text = <i className={statusIconClassNames} />
            }
            progressInfo = <span className={`rc-el-progress-text`}>{text}</span>;
        }
        if (type === 'line') {
            const percentStyle = {
                background: color,
                height: '8px',
                width: `${validProgress(percentage)}%`,
            };
            progress = (
                <div>
                    <div className={`rc-el-progress-outer`}>
                        <div className={`rc-el-progress-inner`}>
                            <div className={`rc-el-progress-bg`} style={percentStyle} />
                            {/* {successSegment} */}
                        </div>
                    </div>
                    {progressInfo}
                </div>
            );
        }

        const classString = classNames('rc-el-progress', {
            [`rc-el-progress-${type === 'dashboard' && 'circle' || type}`]: true,
            // [`${prefixCls}-${type === 'dashboard' && 'circle' || type}`]: true,
            // [`${prefixCls}-status-${progressStatus}`]: true,
            [`rc-el-progress-show-info`]: showInfo,
            // [`${prefixCls}-${size}`]: size,
        });

        return (
            <div className={classString}>
                {progress}
            </div>
        )
    }
}