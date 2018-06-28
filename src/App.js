import React, { Component } from 'react';
import './App.css';
import Canvas from './containers/Canvas';
import MainCanvas from './containers/MainCanvas';

class App extends Component {
  render() {
    return (
      <div className="App">
			<div className="Header"></div>

				<MainCanvas />


      </div>
    );
  }
}

export default App;
