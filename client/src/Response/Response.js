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
                <div className="results__meta">
                    <div className="results__related">
                        <h3 className="related__heading">References:</h3>
                        <ul className="related__refs">
                            <li className="refs__item"> <a href="/" className="item__link">Name biding</a></li>
                        </ul>
                    </div>
                    <ul className="results__tags">
                        <li className="tags__keyword">Wikipedia</li>
                        <li className="tags__keyword">PHP</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Response;