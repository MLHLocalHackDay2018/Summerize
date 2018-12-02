import React, { Component } from 'react';

class Response extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        // let result = JSON.parse(this.props);
        console.log('from response component render:', this.props);
        console.log('from response component render:', this.props.result.summary);
        return (
            <div className="app__results">
                <div className="results__summary">
                    <p className="summary__text text ">{this.props.result.summary}</p>
                </div>
                <div className="results__related">
                    <h1 className="related__heading">Related links:</h1>
                    <div className="related__item">
                        <span className="item__name">Name biding: </span>
                        <a href="/" className="item__link">Wikipedia URL</a>
                    </div>
                </div>
                <ul className="results__tags">
                    <li className="tags__keyword">Wikipedia</li>
                    <li className="tags__keyword">PHP</li>
                </ul>
            </div>
        );
    }
}

export default Response;