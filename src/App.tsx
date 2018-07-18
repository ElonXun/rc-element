import * as React from 'react';
import './App.css';
import Tag from './components/tag/index';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Tag/>
        <Tag type="success"/>
        <Tag type="info"/>
        <Tag type="warning"/>
        <Tag type="danger"/>
        <Tag type="other" />
      </div>
    );
  }
}

export default App;
