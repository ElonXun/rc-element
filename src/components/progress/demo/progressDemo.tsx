import * as React from 'react';
import Progress from '../src/progress';

export interface IDemoState {
    percentage: number;
}
class TagDemo extends React.Component<{}, IDemoState> {

    constructor(props: object) {
        super(props);
        this.state = {
            // tagLists: ['标签一', '标签二', '标签三', '标签四', '标签五']
            percentage: 60
        }
    }

    public addHandler = () => {
        this.setState({
            percentage: this.state.percentage + 10
        })
    }

    public reduceHandler = () => {
        this.setState({
            percentage: this.state.percentage - 10
        })
    }

    public render() {
        return (
            <div className="App">
                <div style={{ width: '500px' }}>
                    <p>线性进度条</p>
                    <Progress />
                    <Progress percentage={95.567} />
                    <Progress percentage={70} status="active" />
                    <Progress percentage={80} color="#8e71c7" />
                    <Progress percentage={80} status="success" />
                    <Progress percentage={80} status="success" showInfo={false} />
                    <Progress percentage={100} status="success" />
                    <Progress percentage={50} status="exception" />
                    <Progress percentage={80} color="#8e71c7" strokeWidth={10} />
                </div>
                <br />
                <div style={{ width: '500px' }}>
                    <p>线形进度条 — 百分比内显</p>
                    <Progress percentage={80} textInside={true} />
                    <Progress percentage={70} textInside={true} status="active" />
                    <Progress percentage={100} textInside={true} />
                    <Progress percentage={60} textInside={true} status="exception" />
                </div>
                <br />
                <div style={{ width: '500px' }}>
                    <p>圆形进度条</p>
                    <Progress type={"circle"} percentage={0} />
                    <Progress type={"circle"} percentage={30} color="orange" />
                    <Progress type={"circle"} percentage={80} status="success" />
                    <Progress type={"circle"} percentage={80} status="exception" />
                    <Progress type={"circle"} percentage={100} />
                    <Progress type={"circle"} percentage={80} circleWidth={90} strokeWidth={6} />
                </div>
                <br />
                <div style={{ width: '500px' }}>
                    <p>动态进度条</p>
                    <Progress percentage={this.state.percentage} />
                    <Progress type={"circle"} percentage={this.state.percentage} />
                    <Progress percentage={this.state.percentage} textInside={true} />
                    <button onClick={this.addHandler}>增加10</button>
                    <button onClick={this.reduceHandler}>减少10</button>
                </div>
            </div>
        );
    }
}

export default TagDemo;
