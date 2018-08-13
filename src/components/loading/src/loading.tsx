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
}

export default class Tag extends React.Component<ILoadingProps, {}> {
    public static defaultProps = {
        type: 'fence',
    }
    constructor(props: ILoadingProps) {
        super(props);
        this.state = {
            spinning: false,
            type: 'ellipsis',
        }
    }

    public render() {
        const { spinning, type } = this.props
        const loadingChange = classNames({
            "rc-el-spinning-circle": type === "circle",
            "rc-el-spinning-dynamic-ellipsis": type === "dynamicEllipsis",
            "rc-el-spinning-ellipsis": type === "ellipsis",
            "rc-el-spinning-fence": type === "fence",
            "rc-el-spinning-loading": true,
        })
        const spinIndicator =
            type === 'circle' ?
                (
                    <span className={loadingChange}>
                        <svg className="rc-el-spinning-circle-circular" viewBox="25 25 50 50">
                            <circle className="rc-el-spinning-circle-path" cx="50" cy="50" r="20" fill="none" />
                        </svg>
                    </span>
                ) : (<span className={loadingChange}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </span>)
        const spinningLoadingWrapClassNames = classNames('rc-el-spinning-loading-wrap',
            {
                'rc-el-spinning-loading-default': !this.props.children,
            }
        )
        return (
            <Animate component="div"
                className={spinningLoadingWrapClassNames}
                showProp='data-show'
                transitionName="fade" >
                <div className={spinning ? 'rc-el-spinning-item-container' : ''} key="container">
                    <div className={"rc-el-spinning-item-children"}>{this.props.children || <span>&nbsp;</span>}</div>
                    <div data-show={spinning} style={{ display: spinning ? 'block' : 'none' }} key="loading">{spinIndicator}</div>
                </div>
            </Animate>
        );
    }
}