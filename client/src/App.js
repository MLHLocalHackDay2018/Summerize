import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header';
import Form from './Form/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
    };
    this.handleApiRequest = this.handleApiRequest.bind(this)
  }

  handleApiRequest(result) {
    // console.log('Called handleApiRequest...');
    this.setState({result: result});
    console.log('handleApiRequest: ', this.state.result);
  }

  renderForm() {
    return (
      <Form
        // value={this.state.squares[i]}
        // onClick={() => this.handleApiRequest()}
        handleApiRequest = {this.handleApiRequest}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.renderForm()}
      </div>
    );
  }
}

export default App;
