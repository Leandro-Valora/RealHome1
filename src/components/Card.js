import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    render() {
        return (
            <div className="col">
                <div className="card">
                    <img src={this.props.card.immagine} className="gallery__img" alt={this.props.card.title} />
                    <div className="card-body">
                        <h5 className="card-title"><b>{this.props.card.titolo}</b></h5>
                        <p className="card-text"><i>{this.props.card.testo}</i></p>
                        <Link to="/info/caseSpeciali"> 
                            <button className="btn btn-light">Scopri di più</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Card;