import classNames from 'classnames';
import * as React from 'react';
import './progress.css';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'default' | 'small';

export interface IProgressProps {
    textInside?: boolean;
    type?: ProgressType;
    // size?: ProgressSize;
    strokeWidth?: number;
    showInfo?: boolean;
    percentage?: number;
    status?: 'success' | 'active' | 'exception';
    color?: string;
    circleWidth?: number;
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
        textInside: false, // 百分百内显
        type: 'line' as ProgressType,
    }
    constructor(props: IProgressProps) {
        super(props);
    }

    public relativeStrokeWidth(strokeWidth: number, width: number): string {
        return (strokeWidth / width * 100).toFixed(1);
    }

    public render() {
        const { type, showInfo, percentage, color, status, strokeWidth, circleWidth, textInside } = this.props;
        let progress;
        let progressInfo;
        const insideProgressInfo = textInside && (type === 'line');
        const textFormatter = (percentNumber: number) => (`${percentNumber}%`);
        const progressStatus = percentage && percentage >= 100 ? 'success' : status;
        const statusIconClassNames = classNames('rc-el-icon-progress',
            { [`rc-el-icon-progress-circle-${progressStatus}`]: progressStatus === 'success' || progressStatus === 'exception' }
        );
        const progressTextClassNames = classNames('rc-el-progress-text', {
            [`rc-el-progress-text-${type}`]: type === 'circle'
        })
        if (showInfo) {
            let text;
            if (progressStatus !== 'success' && progressStatus !== 'exception') {
                text = textFormatter(validProgress(percentage));
            } else if (progressStatus === 'success') {
                text = <i className={statusIconClassNames} />
            } else if (progressStatus === 'exception') {
                text = <i className={statusIconClassNames} />
            }
            progressInfo = <span className={progressTextClassNames}>{text}</span>;
        }
        if (type === 'line') {
            const percentStyle = {
                background: color,
                height: `${insideProgressInfo ? 18 : strokeWidth}px`,
                width: `${validProgress(percentage)}%`,
            };
            progress = (
                <div>
                    <div className={`rc-el-progress-outer`}>
                        <div className={`rc-el-progress-inner`}>
                            <div className={`rc-el-progress-bg`} style={percentStyle}>
                                {insideProgressInfo ? progressInfo : null}
                            </div>
                            {/* {successSegment} */}
                        </div>
                    </div>
                    {insideProgressInfo ? null : progressInfo}
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

            const perimeter = 2 * Math.PI * (50 - parseFloat(relativeStrokeWidth) / 2);
            const circlePathStyle = {
                strokeDasharray: `${perimeter}px,${perimeter}px`,
                strokeDashoffset: (1 - (validProgress(percentage) || 0) / 100) * perimeter + 'px',
                transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
            }
            let strokeColor;
            if (progressStatus !== 'success' && progressStatus !== 'exception') {
                strokeColor = color || '#409eff';
            } else if (progressStatus === 'success') {
                strokeColor = color || '#67c23a';
            } else if (progressStatus === 'exception') {
                strokeColor = color || '#f56c6c';
            }

            progress = (
                <div style={circleStyle} className="rc-el-progress-circle-wrapper">
                    <svg viewBox="0 0 100 100">
                        <path className="rc-el-progress-circle-track"
                            d={trackPath} stroke="#f5f5f5"
                            strokeWidth={relativeStrokeWidth}
                            fill="none" />
                        <path className="rc-el-progress-circle-path"
                            d={trackPath}
                            strokeLinecap="round"
                            stroke={strokeColor}
                            strokeWidth={relativeStrokeWidth}
                            fill="none"
                            style={circlePathStyle} />
                    </svg>
                    {progressInfo}
                </div>
            );
        }

        const classString = classNames('rc-el-progress', {
            [`rc-el-progress-${type === 'dashboard' && 'circle' || type}`]: true,
            [`rc-el-progress-${progressStatus}`]: !!progressStatus,
            [`rc-el-progress-show-info`]: showInfo,
            [`rc-el-progress-text-inside`]: insideProgressInfo,
        });

        return (
            <div className={classString}>
                {progress}
            </div>
        )
    }
}