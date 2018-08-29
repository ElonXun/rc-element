// import classNames from 'classnames';
import * as React from 'react';
import './carousel.css';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'default' | 'small';

export interface ICarouselProps {
    textInside?: boolean;
    type?: ProgressType;
    width?: number;
    // size?: ProgressSize;
}

export interface ICarouselStates {
    distance: number;
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselStates> {
    public static defaultProps = {
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
    constructor(props: ICarouselProps) {
        super(props);
        this.state = {
            distance: -350,
        }
    }

    public componentDidMount() {
        // var component = this.hello;
        // const children = React.Children.map(this.props.children, (child: React.ReactElement<{}>) => {
        //     console.log(child.type.toString);    
        //     return child;
        // })
        // console.log(children.length);
        console.log(this.carouselElement.clientWidth);
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
        // let arr = new Array(3).fill(false);
        // let current = distance / 100 * (-1);
        // arr[current - 1] = true;
        // this.solts = arr;
        console.log(type);
        this.setState({
            distance,
        });
    }

    public render() {
        const { distance } = this.state;
        const { width } = this.props;
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
        const children = React.Children.map(this.props.children, (child: React.ReactElement<any>, index) => {
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
        // console.log(children,width);
        return (
            <div className="rc-el-carousel" ref={this.refHandlers.carousel}>
                <button className="rc-el-carousel-arrow rc-el-carousel-arrow-left"
                    onClick={this.toggleArrow.bind(this, 'left')}>{'‹'}</button>
                <button className="rc-el-carousel-arrow rc-el-carousel-arrow-right"
                    onClick={this.toggleArrow.bind(this, 'right')}>{'›'}</button>
                <div className="rc-el-carousel-container" style={carouselStyle}>
                    {children}
                </div>
                <ul className="rc-el-carousel-indicators">
                    <li className="rc-el-carousel-indicator">
                        <button className="rc-el-carousel-button" />
                    </li>
                    <li className="rc-el-carousel-indicator">
                        <button className="rc-el-carousel-button" />
                    </li>
                    <li className="rc-el-carousel-indicator">
                        <button className="rc-el-carousel-button" />
                    </li>
                    <li className="rc-el-carousel-indicator">
                        <button className="rc-el-carousel-button" />
                    </li>
                </ul>
            </div>
        )
    }
}