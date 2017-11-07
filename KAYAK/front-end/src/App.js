import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import HomePage from "./components/HomePage";


class App extends Component {

    constructor(){
        super();

        injectTapEventPlugin();
    }

  render() {
    return (
        <BrowserRouter >
            <HomePage/>
        </BrowserRouter>
    );
  }
}

export default App;



