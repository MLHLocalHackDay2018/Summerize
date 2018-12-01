import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header';
import Form from './Form/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Form />
      </div>
    );
  }
}

export default App;
