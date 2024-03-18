import React, { Component } from 'react';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import CasaValidation from '../../CasaValidation';
import axios from 'axios';
import './Stile.css';
import { Link } from 'react-router-dom';

class CreateCasa extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        values: {
            owner: '',
            agente: '',
            nome: '',
            paese: '',
            citta: '',
            via: '',
            prezzo: '',
            immagine: '',
            descrizione: ''
        },
        errors: {
            proprietario: '',
            agente: '',
            nome: '',
            paese: '',
            citta: '',
            via: '',
            prezzo: '',
            immagine: '',
            descrizione: ''
        },
        successMessage: '',
        showMessage: false,
        proprietari: [],
        agenti: []
    }

    componentDidMount() {
        if (!localStorage.getItem('userName') || localStorage.getItem('userName')==="logout")  {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
        else {
            axios.post('http://localhost:8081/admin/listaPropietario')
            .then(response => {
                if(response.data.status === "Success") {
                    const proprietari = response.data.propietario;
                    // Aggiorna lo stato con i dati dei proprietari
                    if(Array.isArray(proprietari)) {
                        this.setState({ proprietari });
                    } else {
                        console.log("Dati proprietario non validi:", proprietari);
                    }
                } else {
                    console.log("Failed to fetch proprietari");
                }
            })
            .catch(error => {
                console.log("Error fetching proprietari:", error);
            });

            //seconda drop down list
            axios.post('http://localhost:8081/admin/listaAgente')
            .then(resp => {
                if(resp.data.status === "Success") {
                    const agenti = resp.data.agente;
                    // Aggiorna lo stato con i dati dei agenti
                    if(Array.isArray(agenti)) {
                        this.setState({ agenti });
                    } else {
                        console.log("Dati agente non validi:", agenti);
                    }
                } else {
                    console.log("Failed to fetch agenti");
                }
            })
            .catch(error => {
                console.log("Error fetching agenti:", error);
            });
        }
    }    
    
    handleSubmit = (event) => {
        event.preventDefault();
        const CasaValidationErrors = CasaValidation(this.state.values);
        this.setState({ errors: CasaValidationErrors });
        
        if (!Object.values(CasaValidationErrors).some(error => error !== "") && !Object.values(this.state.values).some(value => value === "")) {
            // Effettua la query per verificare se esiste già una casa con gli stessi valori
            axios.post('http://localhost:8081/admin/crudAdmin/checkDuplicateCasa', this.state.values)
                .then(resp => {
                    console.log("--> " + resp.data.status);
                    if (resp.data.status === "Success") {
                        // Se non ci sono case duplicate, procedi con la creazione
                        axios.post('http://localhost:8081/admin/crudAdmin/createCasa', this.state.values)
                            .then(response => {
                                if(response.data.status === "Success") {
                                    this.setState({ 
                                        successMessage: "Casa creata con successo!",
                                        showMessage: true
                                    });
                                } else {
                                    console.log("Failed to create casa");
                                }
                            })
                            .catch(error => {
                                console.log("Error creating casa:", error);
                            });
                    } else {
                        // Se esiste già una casa con gli stessi valori, mostra un messaggio di errore
                        this.setState({ 
                            successMessage: "Esiste già una casa con gli stessi valori!",
                            showMessage: true
                        });
                    }
                })
                .catch(error => {
                    console.log("Error checking duplicate casa:", error);
                });
        }
    };

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
    };

    render() {
        const { successMessage, showMessage, errors } = this.state;
        const { handleInput, handleSubmit } = this;
        return (
            <>
                <AdBar />
                <br />                     
                <div>
                    <header>
                        <h2 className='titolo-1'><center>Crea un nuovo inserimento di Casa</center></h2>
                    </header>
                    <br />
                    <main>
                        <div className="login-form-container">
                            <div className="login-form">
                                <p>{showMessage && <span className="text-success">{successMessage}</span>}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="login-form-group">
                                        <label htmlFor="owner">
                                            <strong>Propietario</strong>
                                        </label>
                                        <select
                                            name="owner"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        >
                                            <option value="">Seleziona propietario Immobile</option>
                                            {this.state.proprietari && this.state.proprietari.map(prop => (
                                                <option key={prop.Id_propietario} value={prop.Id_propietario}>{prop.Nome.charAt(0).toUpperCase() + prop.Nome.slice(1)} {prop.Cognome.charAt(0).toUpperCase() + prop.Cognome.slice(1)}</option>
                                            ))}
                                        </select>
                                        {errors.proprietario && <span className="text-danger">{errors.proprietario}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="agente">
                                            <strong>Agente</strong>
                                        </label>
                                        <select
                                            name="agente"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        >
                                            <option value="">Seleziona agente Immobiliare</option>
                                            {this.state.agenti && this.state.agenti.map(agImm => (
                                                <option key={agImm.Id_agente} value={agImm.Id_agente}>{agImm.Nome.charAt(0).toUpperCase() + agImm.Nome.slice(1)} {agImm.Cognome.charAt(0).toUpperCase() + agImm.Cognome.slice(1)}</option>
                                            ))}
                                        </select>
                                        {errors.agente && <span className="text-danger">{errors.agente}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="nome">
                                            <strong>Nome</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="nome"
                                            placeholder="Inserisci nome"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.nome && <span className="text-danger">{errors.nome}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="paese">
                                            <strong>Paese</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="paese"
                                            placeholder="Inserisci paese"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.paese && <span className="text-danger">{errors.paese}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="citta">
                                            <strong>Città</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="citta"
                                            placeholder="Inserisci città"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.citta && <span className="text-danger">{errors.citta}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="via">
                                            <strong>Via</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="via"
                                            placeholder="Inserisci via"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.via && <span className="text-danger">{errors.via}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="prezzo">
                                            <strong>Prezzo</strong> <i>(non usare ne , ne .)</i>
                                        </label>
                                        <div className="price-input-container">
                                            <span className="currencyinput">€</span>
                                            <input
                                                type="text"
                                                name="prezzo"
                                                placeholder="Inserisci prezzo"
                                                onChange={handleInput}
                                                className="form-control rounded-0"
                                            />
                                        </div>
                                        {errors.prezzo && <span className="text-danger">{errors.prezzo}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="immagine">
                                            <strong>Immagine Copertina</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="immagine"
                                            placeholder="Inserisci URL Casa"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.immagine && <span className="text-danger">{errors.immagine}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="descrizione">
                                            <strong>Descrizione</strong>
                                        </label>
                                        <textarea
                                            name="descrizione"
                                            placeholder="Inserisci descrizione"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        ></textarea>
                                        {errors.descrizione && <span className="text-danger">{errors.descrizione}</span>}
                                    </div>
                                    <button type="submit" className="login-btn btn btn-success"> Create </button>
                                    <Link to="/admin/listaCase"><button type="submit" className="login-btn btn "> Indietro </button></Link>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>

                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default CreateCasa;
