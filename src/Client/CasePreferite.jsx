import React, { Component } from 'react';
import ClientBar from './components/ClientBar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';
import "./HomeSearch.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

class CasePreferite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCase: [],
            loading: true
        };
    }

    componentDidMount() {
        if (localStorage.getItem('userName') === "logout" || !localStorage.getItem('userName')) {
            window.location.href = "/";
        } else {
            this.getPreferredHomes(); // Chiamata alla funzione per ottenere le case preferite
        }
    }

    // Funzione per ottenere le case preferite dal backend
    getPreferredHomes = () => {
        const userId = localStorage.getItem('userId'); // Assumi che l'ID dell'utente sia memorizzato nel localStorage
        axios.post('http://localhost:8081/Client/Prefer', { Id_user: userId })
            .then(response => {
                if (response.data.status === "Success") {
                    this.setState({ listaCase: response.data.casePreferite, loading: false });
                } else {
                    this.setState({ loading: false });
                    console.log("Nessuna casa preferita trovata");
                }
            })
            .catch(error => {
                console.error("Errore durante il recupero delle case preferite:", error);
                this.setState({ loading: false });
            });
    }

    // Funzione per eliminare una casa preferita
    deletePreferredHome = (prefeId) => {
        axios.post('http://localhost:8081/Client/DeletePreferite', { Id_prefe: prefeId })
            .then(response => {
                if (response.data.status === "Success") {
                    // Rimuovi l'elemento eliminato dalla lista delle case preferite
                    const updatedList = this.state.listaCase.filter(house => house.Id_prefe !== prefeId);
                    this.setState({ listaCase: updatedList });
                } else {
                    console.log("Errore durante l'eliminazione della casa preferita:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Errore durante l'eliminazione della casa preferita:", error);
            });
    }
    

    render() {
        return (
            <>
                <ClientBar />
                <br />
                <center><img src={logoEsteso} className="logo-esteso logo-esteso2" alt="Logo Esteso" /></center>
                <h2 className='subtitle-1'><b><i>&nbsp;  Case Preferite</i></b></h2>
                <br />
                {/* Mostra le case */}
                {this.state.loading ? (
                    <p>Caricamento...</p>
                ) : (
                    <div className="houses-container">
                        {this.state.listaCase.map(house => (
                            <div key={house.Id_prefe} className="house">
                                <div className="house-image">
                                    <Link to={`/Client/dettaglicasa?casaId=${house.Id_casa}&agentId=${house.Id_agente}`}>
                                        <img src={house.ImageURL} alt="House" />
                                    </Link>
                                </div>
                                <br />
                                <button className="trash-button1" 
                                    onClick={() => this.deletePreferredHome(house.Id_prefe)}>
                                    <span className="trash-icon1"></span>
                                </button>

                                <div className="house-details">
                                    <h3><i>
                                        <Link to={`/Client/dettaglicasa?casaId=${house.Id_casa}&agentId=${house.Id_agente}`}>{house.Nome} </Link>
                                    </i></h3>
                                    <p><b><i>Indirizzo</i></b></p>
                                    <p>{house.Via}</p>
                                    <p><b><i>Paese</i></b></p>
                                    <p>{house.Paese}</p>
                                    <p><b><i>Città</i></b></p>
                                    <p>{house.Citta}</p>
                                    <p><b><i>Descrizione</i></b></p>
                                    <p>{house.Descrizione}</p>
                                    <p><b><i>Prezzo:</i></b> € {parseFloat(house.Prezzo).toFixed(2)} </p>
                                </div>
                            </div>
                        ))}
                        {this.state.listaCase.length === 0 && <p>&nbsp;&nbsp; Nessun casa tra i preferiti.</p>}
                    </div>
                )}
                <div>
                    <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home' }} />
                </div>
            </>
        );
    }
}

export default CasePreferite;
