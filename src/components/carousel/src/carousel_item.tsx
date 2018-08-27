// import classNames from 'classnames';
import * as React from 'react';
import './carousel_item.css';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'default' | 'small';

export interface ICarouselItemProps {
    textInside?: boolean;
    type?: ProgressType;
    // size?: ProgressSize;
}

export interface ITagStates {
    closing: boolean;
}

export default class CarouselItem extends React.Component<ICarouselItemProps, {}> {
    public static defaultProps = {
    }
    constructor(props: ICarouselItemProps) {
        super(props);
    }

    public render() {
        return (
            <div className="rc-el-carousel-item"
                // :class="{
                // 'is-active': active,
                // 'el-carousel__item--card': $parent.type === 'card',
                // 'is-in-stage': inStage,
                // 'is-hover': hover,
                // 'is-animating': animating
                // }"
                // @click="handleItemClick"
                // :style="{
                // msTransform: `translateX(${ translate }px) scale(${ scale })`,
                // webkitTransform: `translateX(${ translate }px) scale(${ scale })`,
                // transform: `translateX(${ translate }px) scale(${ scale })`
                // }"
                >

                {/* <slot></slot> */}
            </div>
        )
    }
}