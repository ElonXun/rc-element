import * as React from 'react';
import ProgressDemo from '../src/components/progress/demo/progressDemo';
import './App.css';

export interface IAppState {
  tagLists: any[];
}
class App extends React.Component<{}, IAppState> {

  constructor(props: object) {
    super(props);
    this.state = {
      tagLists: ['标签一', '标签二', '标签三', '标签四', '标签五']
    }
  }

  public render() {
    return (
      <ProgressDemo />
    );
  }
}

export default App;
