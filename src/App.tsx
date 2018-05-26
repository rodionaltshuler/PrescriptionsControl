import * as React from 'react';
import './App.css';

import IssuePrescription from "./issue/IssuePrescription";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <IssuePrescription/>
      </div>
    );
  }
}

export default App;
