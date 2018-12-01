import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'Please write an essay about your favorite DOM element.'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <form className="app__form form" onSubmit={this.handleSubmit}>
            <label className="form__label label">
              Enter your text:
            </label>
             <textarea className="form__textarea textarea" value={this.state.value} onChange={this.handleChange} />
            <input className="form__button button" type="submit" value="Submit" />
          </form>
        );
      }
}

export default Form;