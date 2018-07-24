import * as React from 'react';
// import classNames from 'classnames';
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
    // public static defaultProps = {
    //     closable: false,
    // }
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
        // const { } = this.props;
        // let progress;

        return (
            <p>this is progress</p>
        )
    }
}