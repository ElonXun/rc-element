import classNames from 'classnames';
import * as React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './carousel.css';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'default' | 'small';

export interface ICarouselProps {
    autoplay?: boolean;
    textInside?: boolean;
    type?: ProgressType;
    width?: number;
    interval?: number;
    // size?: ProgressSize;
}

export interface ICarouselStates {
    distance: number;
    solts: boolean[];
    carouselActive: boolean | null;
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselStates> {
    public static defaultProps = {
        autoplay: true,
        interval: 1000,
    }
    /**
     * typescript Pass a callback to ref prop instead of a string literal?
     * 
     * https://github.com/palantir/tslint-react/issues/26
     * 
     */
    private carouselElement: HTMLElement;
    private refHandlers = {
        carousel: (ref: any) => this.carouselElement = ref,
    };
    private timer: any;
    private children: any;
    private childrenLength: number;
    private carouselWidth: number;
    constructor(props: ICarouselProps) {
        super(props);
        this.state = {
            carouselActive: null,
            distance: 0,
            solts: [true, false, false, false],
        }
    }

    public startTimer = (): void => {
        const { interval = 0, autoplay } = this.props;
        if (interval <= 0 || !autoplay) {
            return;
        }
        this.timer = setInterval(this.playSlides, interval);
    }

    public pauseTimer = (): void => {
        clearInterval(this.timer);
        this.timer = null;
    }

    public playSlides = (): void => {
        let { distance } = this.state;
        const base = this.carouselWidth;
        distance = distance - base;

        if (distance === -base * (this.childrenLength + 1)) {
            distance = -base;
        }
        if (distance === 0) {
            distance = -base * this.childrenLength;
        }

        const arr = new Array(this.childrenLength).fill(false);
        const current = distance / base * (-1);
        arr[current - 1] = true;
        this.setState({
            distance,
            solts: arr,
        });
    }

    public componentWillMount() {
        // this.buildChildren(this.props.children);
    }

    public componentDidMount() {
        let width;
        if (this.props.width && this.props.width > 0) {
            width = this.props.width;
        } else {
            width = this.carouselElement.clientWidth;
        }
        this.buildChildren(this.props.children, width);
        this.carouselWidth = width;
        this.setState({
            distance: -width,
        });
        this.startTimer();
        console.log(this.carouselElement.clientWidth);
    }

    public componentWillUpdate(nextProps: any, nextState: any) {
        console.log('nextprops', nextProps.children, 'thisprops', this.props.children);
        console.log(this.props === nextProps);
        if (this.props !== nextProps) {
            this.buildChildren(nextProps.children, this.carouselWidth);
        }
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        const { autoplay } = this.props;
        // console.log(this.props); 
        if (autoplay === false && this.timer) {
            this.pauseTimer();
        }
        if (autoplay === true && !this.timer) {
            this.startTimer();
        }
    }

    public toggleArrow = (type: string): void => {
        let { distance } = this.state;
        const base = this.carouselWidth;
        if (type === 'left') {
            distance = distance + base;
        } else {
            distance = distance - base;
        }
        if (distance === -base * (this.childrenLength + 1)) {
            distance = -base;
        }
        if (distance === 0) {
            distance = -base * this.childrenLength;
        }
        const arr = new Array(this.childrenLength).fill(false);
        const current = distance / base * (-1);
        arr[current - 1] = true;
        console.log(type);
        this.setState({
            distance,
            solts: arr,
        });
    }

    public soltHandle = (index: number): void => {
        const arr = new Array(this.childrenLength).fill(false);
        arr[index] = true;
        const currentDistance = (index + 1) * (-this.carouselWidth);
        this.setState({
            distance: currentDistance,
            solts: arr,
        });
    }

    /**
     * child: React.ReactElement<{}> whats wrong?
     * 
     * https://stackoverflow.com/questions/42261783/how-to-assign-the-correct-typing-to-react-cloneelement-when-giving-properties-to
     * 
     * The problem is that the definition for ReactChild is this:
     * type ReactText = string | number;
     * type ReactChild = ReactElement<any> | ReactText;
     * If you're sure that child is always a ReactElement then cast it:
     * return React.cloneElement(child as React.ReactElement<any>, {
     *     width: this.props.width,
     *     height: this.props.height
     * });
     * Otherwise use the isValidElement type guard:
     * if (React.isValidElement(child)) {
     *     return React.cloneElement(child, {
     *         width: this.props.width,
     *         height: this.props.height
     *     });
     * }
     */
    public buildChildren = (children: React.ReactNode, width?: number): void => {
        const result: Array<React.ReactElement<any>> = [];
        const childrenLength = React.Children.count(children);
        React.Children.forEach(children, (child: React.ReactElement<any>, index) => {
            const style = {
                ...child.props.style,
                display: 'inline-block',
                height: '100%',
                // width: '350px',
            }
            if (width) {
                style.width = width;
            }
            result.push(React.cloneElement(child, { style: { ...style }, key: index + 1 }));
        })
        // console.log('before', result);
        result.unshift(React.cloneElement(result[childrenLength - 1], { key: 0 }));
        result.push(React.cloneElement(result[1], { key: childrenLength + 1 }));
        // console.log('after',result);
        this.children = result;
        this.childrenLength = childrenLength;
    }

    public onCarouselEnter = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState({
            carouselActive: true,
        })
    }

    public onCarouselLeave = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState({
            carouselActive: false,
        })
    }

    public render() {
        const { distance, solts, carouselActive } = this.state;
        // const { width } = this.props;
        const carouselContainerStyle = {
            transform: `translate(${distance}px, 0)`,
            width: `${this.carouselWidth * (this.childrenLength + 2)}px`
        }
        const carouselStyle = {
            width: `${this.carouselWidth}px`,
        }
        const indicators: Array<React.ReactElement<any>> = [];
        for (let i = 0; i < this.childrenLength; i++) {
            indicators.push(
                <li className="rc-el-carousel-indicator" key={i}
                    onClick={this.soltHandle.bind(this, i)}>
                    <button style={{ opacity: solts[i] === true ? 1 : undefined }}
                        className="rc-el-carousel-button" />
                </li>
            );
        }
        const leftArrowClassName = classNames('rc-el-carousel-arrow-left-default', {
            'rc-el-carousel-arrow-left-enter': carouselActive === true,
            'rc-el-carousel-arrow-left-leave': carouselActive === false,
        });

        const rightArrowClassName = classNames('rc-el-carousel-arrow-right-default', {
            'rc-el-carousel-arrow-right-enter': carouselActive === true,
            'rc-el-carousel-arrow-right-leave': carouselActive === false,
        });
        return (
            <div className="rc-el-carousel"
                ref={this.refHandlers.carousel}
                style={carouselStyle}
                onMouseEnter={this.onCarouselEnter}
                onMouseLeave={this.onCarouselLeave}>
                <button className={leftArrowClassName}
                    onClick={this.toggleArrow.bind(this, 'left')}>{'‹'}</button>
                <button className={rightArrowClassName}
                    onClick={this.toggleArrow.bind(this, 'right')}>{'›'}</button>
                <div className="rc-el-carousel-container" style={carouselContainerStyle}>
                    {this.children}
                </div>
                <ul className="rc-el-carousel-indicators">
                    {indicators}
                </ul>
            </div>
        )
    }
}