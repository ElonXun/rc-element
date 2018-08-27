// import classNames from 'classnames';
import * as React from 'react';
import './carousel.css';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'default' | 'small';

export interface IProgressProps {
    textInside?: boolean;
    type?: ProgressType;
    // size?: ProgressSize;
}

export interface ITagStates {
    closing: boolean;
}

export default class Carousel extends React.Component<IProgressProps, {}> {
    public static defaultProps = {
    }
    constructor(props: IProgressProps) {
        super(props);
    }

    public render() {
        return (
            <div className="rc-el-carousel-container">
                hello carousel
                {this.props.children}
            </div>
        )
    }
}