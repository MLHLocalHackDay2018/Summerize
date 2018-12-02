import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          url: '',
        };
    
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleValueChange(event) {
        this.setState({value: event.target.value});
      }

      handleUrlChange(event) {
        this.setState({url: event.target.value});
      }
    
      handleSubmit(event) {
        //alert('An essay was submitted: ' + this.state.value);
        let result;
        if (this.state.value !== '' && this.state.url === '') {
          console.log(this.state.value);
          postData('/api/summarize', {text: this.state.value})
          .then(data => {
            console.log(JSON.stringify(data));
            result = data;
            this.props.handleApiRequest(result);
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
        } 
        else if (this.state.url !== '' && this.state.value === '') {
          console.log(this.state.url);
          postData('/api/summarizeurl', {url: this.state.url})
          .then(data => {
            console.log(JSON.stringify(data));
            console.log(data);
            result = data;
            this.props.handleApiRequest(result);
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
        }
        else if (this.state.url !== '' && this.state.value !== '') {
          alert('Please enter either text or a URL not both.');
        }
        event.preventDefault();
      }
    
      render() {
        return (
        <div className="app__form-wrapper form-wrapper">
          <h1 className="Title">Summerize</h1>
          <form className="app__form form" onSubmit={this.handleSubmit}>
            <label className="form__label label">
              Enter your text:
            </label>
           <textarea rows="50" className="form__textarea textarea"  value={this.state.value} onChange={this.handleValueChange} />
            <label className="form__label label">
              Or Enter your URL:
            </label>
             <input className="form__input input" type="url" value={this.state.url} onChange={this.handleUrlChange} />
            <input className="form__button button button_deep-blue" type="submit" value="Submit" />
          </form>
        </div>
        );
      }
}

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}

export default Form;