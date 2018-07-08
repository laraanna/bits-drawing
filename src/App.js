import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import MainCanvas from './containers/MainCanvas';
import ReactResizeDetector from 'react-resize-detector';


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
