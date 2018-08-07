import classNames from 'classnames';
import Animate from 'rc-animate';
import * as React from 'react';
// import PropTypes from 'prop-types';
import './loading.css';

export type LoadingType = 'fence' | 'ellipsis' | 'dynamicEllipsis' | 'circle';

export interface ILoadingProps {
    /** 标签是否可以关闭 */
    spinning?: boolean;
    type?: LoadingType;
    style?: React.CSSProperties;
    size?: string;
    /** 关闭时的回调 */
    onClose?: (arg1?: string) => void;
    tagKey?: string;
}

// export interface ILoadingStates {
//     closing: boolean;
// }

export default class Tag extends React.Component<ILoadingProps, {}> {
    public static defaultProps = {
        type: 'fence',
    }
    constructor(props: ILoadingProps) {
        super(props);
        this.state = {
            // closing: false
        }
    }

    public render() {
        const { spinning, type } = this.props
        const loadingChange = classNames({
            "rc-spinning-circle": type === "circle",
            "rc-spinning-dynamic-ellipsis": type === "dynamicEllipsis",
            "rc-spinning-ellipsis": type === "ellipsis",
            "rc-spinning-fence": type === "fence",
            "rc-spinning-loading": true,
        })
        const spinIndicator =
            type === 'circle' ?
                (
                    <span className={loadingChange}>
                        <svg className="rc-spinning-circle-circular" viewBox="25 25 50 50">
                            <circle className="rc-spinning-circle-path" cx="50" cy="50" r="20" fill="none" />
                        </svg>
                    </span>
                ) : (<span className={loadingChange}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </span>)
        return (
            <Animate component="div"
                className={'rc-spinning-loading-wrap'}
                showProp='data-show'
                transitionName="fade" >
                <div className={spinning ? 'rc-spinning-item-container' : ''} key="container">
                    <div className={"rc-spinning-item-children"}>{this.props.children}</div>
                    <div data-show={spinning} style={{ display: spinning ? 'block' : 'none' }} key="loading">{spinIndicator}</div>
                </div>
            </Animate>
        );
    }
}