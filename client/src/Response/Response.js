import React, { Component } from 'react';
import './Response.css';

class Response extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        console.log('from response component render:', this.props);
        console.log('from response component render:', this.props.result.summary);

        if (isEmpty(this.props.result)) {
            return '';
        }
        var summary = this.props.result.summary.replace("\n", "");
        return (
            <div className="app__results">
                <div className="results__summary">
                    <p className="summary__text text ">{summary.split('\n').map((item, key) => { return <span key={key}>{item}<br/><br/></span> })}</p>
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
    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    if (typeof obj !== "object") return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export default Response;