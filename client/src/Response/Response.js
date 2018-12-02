import React, { Component } from 'react';
import './Response.css';

class Response extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        // let result = JSON.parse(this.props);
        console.log('from response component render:', this.props);
        console.log('from response component render:', this.props.result.summary);

        if (isEmpty(this.props.result)) {
            return '';
        }

        return (
            <div className="app__results">
                <div className="results__summary">
                    <p className="summary__text text ">{this.props.result.summary}</p>
                </div>
                <div className="results__meta">
                    <div className="results__related">
                        <h3 className="related__heading">References:</h3>
                        <ul className="related__refs">
                            {this.props.result.entities.map(item => 
                                <li className="refs__item"> 
                                    <a rel="noopener noreferrer" target="_blank" href={item.wikipediaUrl} className="item__link">{item.name}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <ul className="results__tags">
                    	<h3 className="tags__heading">Related Tags:</h3>
                        {this.props.result.keyPhrases.map(keyPhrase => 
                            <li className="tags__keyword">{keyPhrase}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export default Response;