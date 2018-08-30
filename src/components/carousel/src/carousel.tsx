// import classNames from 'classnames';
import * as React from 'react';
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
    constructor(props: ICarouselProps) {
        super(props);
        this.state = {
            distance: -350,
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
        const base = 350;
        distance = distance - base;

        if (distance === -base * 5) {
            distance = -base;
        }
        if (distance === 0) {
            distance = -base * 4;
        }

        const arr = new Array(4).fill(false);
        const current = distance / base * (-1);
        arr[current - 1] = true;
        this.setState({
            distance,
            solts: arr,
        });
    }

    public componentWillMount() {
        this.buildChildren();
    }

    public componentDidMount() {
        // var component = this.hello;
        // const children = React.Children.map(this.props.children, (child: React.ReactElement<{}>) => {
        //     console.log(child.type.toString);    
        //     return child;
        // })
        // console.log(children.length);
        this.startTimer();
        console.log(this.carouselElement.clientWidth);
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        const { autoplay } = this.props;
        console.log(this.props);
        if (autoplay === false && this.timer) {
            this.pauseTimer();
        }
        if (autoplay === true && !this.timer) {
            this.startTimer();
        }
    }

    public toggleArrow = (type: string): void => {
        let { distance } = this.state;
        const base = 350;
        if (type === 'left') {
            distance = distance + base;
        } else {
            distance = distance - base;
        }
        if (distance === -base * 5) {
            distance = -base;
        }
        if (distance === 0) {
            distance = -base * 4;
        }
        const arr = new Array(4).fill(false);
        const current = distance / base * (-1);
        arr[current - 1] = true;
        console.log(type);
        this.setState({
            distance,
            solts: arr,
        });
    }

    public soltHandle = (index: number): void => {
        const arr = new Array(4).fill(false);
        arr[index] = true;
        const currentDistance = (index + 1) * (-350);
        this.setState({
            distance: currentDistance,
            solts: arr,
        });
    }

    public buildChildren = (): void => {
        const { width } = this.props;
        this.children = React.Children.map(this.props.children, (child: React.ReactElement<any>, index) => {
            const style = {
                ...child.props.style,
                display: 'inline-block',
                height: '100%',
                // width: '350px',
            }
            if (width) {
                style.width = width;
            }
            // console.log(child.props.style);
            return React.cloneElement(child, { style: { ...style }, key: index });
        })
    }

    public render() {
        const { distance, solts } = this.state;
        // const { width } = this.props;
        const carouselStyle = {
            transform: `translate(${distance}px, 0)`
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
        // const children = 
        // children.unshift(children[children.length]);
        // children.push(children[1]);
        // console.log(children,width);
        return (
            <div className="rc-el-carousel" ref={this.refHandlers.carousel}>
                <button className="rc-el-carousel-arrow rc-el-carousel-arrow-left"
                    onClick={this.toggleArrow.bind(this, 'left')}>{'‹'}</button>
                <button className="rc-el-carousel-arrow rc-el-carousel-arrow-right"
                    onClick={this.toggleArrow.bind(this, 'right')}>{'›'}</button>
                <div className="rc-el-carousel-container" style={carouselStyle}>
                    {this.children}
                </div>
                <ul className="rc-el-carousel-indicators">
                    <li className="rc-el-carousel-indicator"
                        onClick={this.soltHandle.bind(this, 0)}>
                        <button style={{ opacity: solts[0] === true ? 1 : undefined }}
                            className="rc-el-carousel-button" />
                    </li>
                    <li className="rc-el-carousel-indicator"
                        onClick={this.soltHandle.bind(this, 1)}>
                        <button style={{ opacity: solts[1] === true ? 1 : undefined }}
                            className="rc-el-carousel-button" />
                    </li>
                    <li className="rc-el-carousel-indicator"
                        onClick={this.soltHandle.bind(this, 2)}>
                        <button style={{ opacity: solts[2] === true ? 1 : undefined }}
                            className="rc-el-carousel-button" />
                    </li>
                    <li className="rc-el-carousel-indicator"
                        onClick={this.soltHandle.bind(this, 3)}>
                        <button style={{ opacity: solts[3] === true ? 1 : undefined }}
                            className="rc-el-carousel-button" />
                    </li>
                </ul>
            </div>
        )
    }
}