import * as React from 'react';
import './App.css';

import PrescriptionsComponent from "./issue/PrescriptionsComponent";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <PrescriptionsComponent/>
      </div>
    );
  }
}

export default App;
