import * as React from 'react';
import Loading from '../src/loading';

export interface IDemoState {
    spinning: boolean;
}
class LoadingDemo extends React.Component<{}, IDemoState> {

    constructor(props: object) {
        super(props);
        this.state = {
            // tagLists: ['标签一', '标签二', '标签三', '标签四', '标签五']
            // percentage: 60
            spinning: false
        }
    }

    public onLoadingClick = () => {
        this.setState({
            spinning: !this.state.spinning,
        })
    }

    public render() {
        return (
            <div className="App">
                <div style={{ width: '500px' }}>
                    <Loading spinning={this.state.spinning} type={"dynamicEllipsis"}>
                        <span>sadasdasdasddasdasasdasdasdasdasdasdasdasdasdasdasddasdasdasdasdasdasd<br />asdasdasdasdasdsadasdadsdassssssssssssssssssssssssssssssssssssssssssssss</span>
                    </Loading>
                    <div style={{margin: '16px 0'}} />
                    <Loading spinning={this.state.spinning} type={"ellipsis"} >
                        <span>sadasdasdasddasdasasdasdasdasdasdasdasdasdasdasdasddasdasdasdasdasdasd<br />asdasdasdasdasdsadasdadsdassssssssssssssssssssssssssssssssssssssssssssss</span>
                    </Loading>
                    <div style={{ margin: '16px 0' }} />
                    <Loading spinning={this.state.spinning} type={"fence"} >
                        <span>sadasdasdasddasdasasdasdasdasdasdasdasdasdasdasdasddasdasdasdasdasdasd<br />asdasdasdasdasdsadasdadsdassssssssssssssssssssssssssssssssssssssssssssss</span>
                    </Loading>
                    <span onClick={this.onLoadingClick}>点击</span>
                </div>
            </div>
        );
    }
}

export default LoadingDemo;
