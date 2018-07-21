import * as React from 'react';
import Tag from '../src/tag';

export interface IDemoState {
    tagLists: any[];
}
class TagDemo extends React.Component<{}, IDemoState> {

    constructor(props: object) {
        super(props);
        this.state = {
            tagLists: ['标签一', '标签二', '标签三', '标签四', '标签五']
        }
    }

    public handleClose = (tag: string) => {
        console.log('当前要关闭的tag名称', tag);
        let arr = this.state.tagLists;
        arr = arr.filter((item, index) => {
            return item !== tag
        })
        console.log("now", arr)
        this.setState({
            tagLists: arr
        })
    }

    public addNewHandler = () => {
        const arr = this.state.tagLists;
        arr.push("new tag");
        this.setState({
            tagLists: arr
        })
    }

    public render() {
        return (
            <div className="App">
                <Tag>标签一</Tag>
                <Tag type="success" />
                <Tag type="info" />
                <Tag type="warning" />
                <Tag type="danger" />
                <Tag style={{ backgroundColor: 'rgba(255, 64, 194, .1)', borderColor: 'rgba(255, 64, 194, .2)', color: 'rgb(255, 64, 194)' }} />
                <br />
                <Tag size="medium" />
                <Tag size="small" type="info" />
                <Tag size="mini" type="danger" />
                <br />
                <Tag closable={true}>标签一</Tag>
                <Tag type="success" closable={true} />
                <Tag type="info" closable={true} />
                <Tag type="warning" closable={true} />
                <Tag type="danger" closable={true} />
                <br />
                {this.state.tagLists.map((item, index) => {
                    return (
                        <Tag type="default"
                            closable={true}
                            onClose={this.handleClose}
                            key={item}
                            tagKey={item}>
                            {item}
                        </Tag>
                    )
                })}
                <button onClick={this.addNewHandler}>addNew</button>
            </div>
        );
    }
}

export default TagDemo;
