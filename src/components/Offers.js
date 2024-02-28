import React, { Component } from 'react';
import Card from './Card.js';
import './Navbar.css';

class Offers extends Component {
    state = {
        cards: [
            { id: 'image-1', titolo: 'Villa Aquaterra', testo: 'Locata in Grecia', immagine: "https://images.homify.com/v1437060185/p/photo/image/6606/HI-MACS_House_in_Germany_Klopfer_Dirk_Willhelmy_03.jpg" },
            { id: 'image-2', titolo: 'Villa Golf club', testo: 'Locata in Spagna', immagine: "https://www.engelvoelkers.com/images/31a13d90-6384-4e1a-ac1d-14f64ec787e3/progetto-esclusivo-di-ville-con-vista-sul-golf" },
            { id: 'image-3', titolo: 'Villa Arzachena', testo: 'Locata in Algeria', immagine: "https://www.coldwellbankerluxury.blog/wp-content/uploads/2021/01/20200911162607-167-1024x682.jpg" },
            { id: 'image-4', titolo: 'Appartamento Roman', testo: 'Locata in Roma', immagine: "https://www.coldwellbankerluxury.blog/wp-content/uploads/2021/01/20200612182916-17-1024x819.jpg" },
            { id: 'image-5', titolo: 'Villa Moderate', testo: 'Locata in Francia', immagine: "https://www.arredamento.it/img/452/foto-ville_oit_132001.webp" },
            { id: 'image-6', titolo: 'Villa Oxford', testo: 'Locata nella campagna Inglese ', immagine: "https://www.arredamento.it/img/452/foto-ville_oit_132010.webp" },
            { id: 'image-7', titolo: 'Villa Constantia', testo: 'Locata in citta del capo', immagine: "https://www.turismo.it/typo3temp/pics/6576379869.jpg" },
            { id: 'image-8', titolo: 'Villa Neptune', testo: 'Locata in Grecia', immagine: "https://www.myluxury.it/img/2021/07/casa-di-lusso-1200x800.jpg" }
        ]
    }
    render() {
        return (
            <>
                <div className="wrapper">
                    <div className="gallery">
                        {this.state.cards.map(card => (
                            <Card
                                key={card.id}
                                card={card} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}
export default Offers;