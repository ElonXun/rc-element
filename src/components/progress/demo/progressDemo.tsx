import * as React from 'react';
import Progress from '../src/progress';

export interface IDemoState {
    tagLists: any[];
}
class TagDemo extends React.Component<{}, {}> {

    constructor(props: object) {
        super(props);
        this.state = {
            // tagLists: ['标签一', '标签二', '标签三', '标签四', '标签五']
        }
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
                    <Progress percentage={80} status="success" showInfo={false} />
                    <Progress percentage={100} status="success" />
                    <Progress percentage={50} status="exception" />
                </div>
                <br />
                <div style={{ width: '500px' }}>
                    <p>圆形进度条</p>
                    <Progress type={"circle"} percentage={0} />
                </div>
            </div>
        );
    }
}

export default TagDemo;
