import React from 'react';
import ReactDOM from 'react-dom';

import Chart from './chart';

class App extends React.Component {
  render() {
    return (
    	<div>
      	<Chart />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

// Enables HMR.
if (module.hot) {
  module.hot.accept();
}
