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
    circleWidth?: number;
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
        circleWidth: 126, // 环形进度条画布宽度
        percentage: 0,
        showInfo: true,
        strokeWidth: 8,  // 进度条高度
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

    public relativeStrokeWidth(strokeWidth: number, width: number): string {
        return (strokeWidth / width * 100).toFixed(1);
    }

    public render() {
        const { type, showInfo, percentage, color, status, strokeWidth, circleWidth } = this.props;
        let progress;
        let progressInfo;
        const textFormatter = (percentNumber: number) => (`${percentNumber}%`);
        const progressStatus = percentage && percentage >= 100 ? 'success' : status;
        const statusIconClassNames = classNames('rc-el-icon-progress',
            { [`rc-el-icon-progress-circle-${progressStatus}`]: progressStatus === 'success' || progressStatus === 'exception' }
        );
        if (showInfo) {
            let text;
            if (progressStatus !== 'success' && progressStatus !== 'exception') {
                text = textFormatter(validProgress(percentage));
            } else if (progressStatus === 'success') {
                text = <i className={statusIconClassNames} />
            } else if (progressStatus === 'exception') {
                text = <i className={statusIconClassNames} />
            }
            progressInfo = <span className={`rc-el-progress-text`}>{text}</span>;
        }
        if (type === 'line') {
            const percentStyle = {
                background: color,
                height: `${strokeWidth}px`,
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
        } else if (type === 'circle') {
            const relativeStrokeWidth = this.relativeStrokeWidth(strokeWidth || 8, circleWidth || 126);
            const radius = parseInt((50 - parseFloat(relativeStrokeWidth) / 2) + '', 10);
            const trackPath = `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
            const circleStyle = {
                height: `${circleWidth}px`,
                width: `${circleWidth}px`,
            }
            progress = (
                <div style={circleStyle}>
                    <svg viewBox="0 0 100 100">
                        <path className="el-progress-circle__track"
                            d={trackPath} stroke="#e5e9f2"
                            strokeWidth={relativeStrokeWidth}
                            fill="none" />
                        {/* <path class="el-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" : style="circlePathStyle"></path> */}
                    </svg>
                </div>
            );
        }

        const classString = classNames('rc-el-progress', {
            [`rc-el-progress-${type === 'dashboard' && 'circle' || type}`]: true,
            // [`${prefixCls}-${type === 'dashboard' && 'circle' || type}`]: true,
            [`rc-el-progress-${progressStatus}`]: !!progressStatus,
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