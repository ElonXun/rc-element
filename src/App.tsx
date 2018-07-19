import * as React from 'react';
import './App.css';
import Tag from './components/tag/index';

class App extends React.Component {
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
      </div>
    );
  }
}

export default App;
