import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Canvas from './containers/Canvas';
import MainCanvas from './containers/MainCanvas';

class App extends Component {
  render() {
    return (
      <div className="App">
		
				<Routes />

      </div>
    );
  }
}

export default App;
