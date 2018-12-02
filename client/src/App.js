import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import Form from './Form/Form';
import Response from './Response/Response';

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

  renderResponse() {
    return (
      <Response
        result = {this.state.result}
      />
    );
  }


  render() {
    return (
      <div className="App">
        <Header />
        {this.renderForm()}
        {this.renderResponse()}
      </div>
    );
  }
}

export default App;
