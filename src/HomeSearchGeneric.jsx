import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import logoEsteso from './components/pic/logo.png';
import './Client/HomeSearch.css';

class HomeSearchGeneric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCase: [],
            loading: true,
            showPopup: false, // Stato per gestire la visualizzazione del popup
            popupMessage: ""
        };
    }

    showPopup = (message) => {
        this.setState({
            showPopup: true,
            popupMessage: message,
        });
    };

    componentDidMount() {
        this.getHomesFromQueryParams();
    }

    async getHomesFromQueryParams() {
        // Leggi i parametri URL
        const params = new URLSearchParams(window.location.search);
        const paese = params.get('paese');
        const citta = params.get('citta');
        const rangePrezzo = params.get('rangePrezzo');

        try {
            let response;
    
            if (paese && !citta && !rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaCasexPaese', {
                    Paese: paese
                });
            } else if (paese && citta && !rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaCase', {
                    Paese: paese,
                    Citta: citta
                });
            } else if (paese && !citta && rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaCasexPaesePrezzo', {
                    Paese: paese,
                    Prezzo: rangePrezzo
                });
            } else if (paese && citta && rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaTuttiCampi', {
                    Paese: paese,
                    Citta: citta,
                    Prezzo: rangePrezzo
                });
            } else if (!paese && citta && !rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaCasexCitta', {
                    Citta: citta
                });
            } else if (!paese && citta && rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaCasexCittaPrezzo', {
                    Citta: citta,
                    Prezzo: rangePrezzo
                });
            } else if (!paese && !citta && rangePrezzo) {
                response = await axios.post('http://localhost:8081/Client/ricercaCasexPrezzo', {
                    Prezzo: rangePrezzo
                });
            } else {
                this.setState({
                    listaCase: [],
                    loading: false,
                    noResults: true
                });
                return;
            }
    
            if (response.data.status === "Success") {
                this.setState({
                    listaCase: response.data.ricercaCase,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
            console.error("Errore durante la richiesta al server:", error);
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <br />
                <center><img src={logoEsteso} className="logo-esteso logo-esteso2" alt="Logo Esteso" /></center>
                <h2 className='subtitle-1'><b><i>Elenco case disponibili</i></b></h2>
                <br />
                {/* Mostra le case */}
                {this.state.loading ? (
                    <p>Caricamento...</p>
                ) : (
                    <div className="houses-container">
                        {this.state.listaCase.map(house => (
                            <div key={house.Id_casa} className="house">
                                <div className="house-image" onClick={() => this.showPopup(`Per visualizzare i dettagli effettua il login.`)}>
                                    <img src={house.ImageURL} alt="House" />
                                </div>
                                <div className="house-details">
                                    <h3><i onClick={() => this.showPopup(`Per visualizzare i dettagli effettua il login.`)}>
                                        {house.Nome}
                                    </i></h3>
                                    <p><b><i>Indirizzo</i></b></p>
                                    <p>{house.Via}</p>
                                    <p><b><i>Paese</i></b></p>
                                    <p>{house.Paese}</p>
                                    <p><b><i>Città</i></b></p>
                                    <p>{house.Citta}</p>
                                    <p><b><i>Descrizione</i></b></p>
                                    <p>{house.Descrizione}</p>
                                    <p><b><i>Prezzo:</i></b> € {parseFloat(house.Prezzo).toFixed(6)} </p>
                                </div>
                            </div>
                        ))}
                        {this.state.listaCase.length === 0 && <p>Nessun risultato trovato.</p>}
                    </div>
                )}

                {/* popup */}
                {this.state.showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close-popup" onClick={() => this.setState({ showPopup: false })}>&times;</span>
                            <p>{this.state.popupMessage}</p>
                            <a href="/login">Accedi</a>
                        </div>
                    </div>
                )}

                <div>
                    <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home' }} />
                </div>
            </>
        );
    }
}

export default HomeSearchGeneric;
