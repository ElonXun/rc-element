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
                <Progress />
            </div>
        );
    }
}

export default TagDemo;
