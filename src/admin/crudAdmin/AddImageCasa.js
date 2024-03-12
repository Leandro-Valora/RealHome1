import React, { Component } from 'react';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import UserProfile from '../../UserProfile';
import axios from 'axios';
import './Stile.css';
import { Link } from 'react-router-dom';

class AddImageCasa extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        values: {
            casa: '',
            immagine: ''
        },
        errors: {
            casa: '',
            immagine: ''
        },
        successMessage: '',
        showMessage: false,
        case: [],
        agenti: []
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if ((!userName || userName.trim() === "generic") && !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
        else {
            axios.post('http://localhost:8081/admin/listaCase')
            .then(response => {
                if(response.data.status === "Success") {
                    const listaCase = response.data.case;
                    // Aggiorna lo stato con i dati dei case
                    if(Array.isArray(listaCase)) {
                        this.setState({ listaCase });
                    } else {
                        console.log("Dati caseo non validi:", listaCase);
                    }
                } else {
                    console.log("Failed to fetch case");
                }
            })
            .catch(error => {
                console.log("Error fetching case:", error);
            });
        }
    }    
    
    handleSubmit = (event) => {
        event.preventDefault();
            
        if (!Object.values(this.state.values).some(value => value === "")) {
            axios.post('http://localhost:8081/admin/crudAdmin/AddImage', this.state.values)
                .then(response => {
                    if(response.data.status === "Success") {
                        this.setState({ 
                            successMessage: "Casa creata con successo!",
                            showMessage: true
                        });
                    } else {
                        console.log("Failed to fetch casa");
                    }
                })
                .catch(error => {
                    console.log("Error fetching case:", error);
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
                        <h2 className='titolo-1'><center>Aggiungi immagine interni casa</center></h2>
                    </header>
                    <br />
                    <main>
                        <div className="login-form-container">
                            <div className="login-form">
                                <p>{showMessage && <span className="text-success">{successMessage}</span>}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="login-form-group">
                                        <label htmlFor="casa">
                                            <strong>Lista Case</strong>
                                        </label>
                                        <select
                                            name="casa"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        >
                                            <option value="">Seleziona Immobile</option>
                                            {this.state.listaCase && this.state.listaCase.map(imm => (
                                                <option key={imm.Id_casa} value={imm.Id_casa}>{imm.Nome.charAt(0).toUpperCase() + imm.Nome.slice(1)} </option>
                                            ))}
                                        </select>
                                        {errors.casa && <span className="text-danger">{errors.casa}</span>}
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

                                    <button type="submit" className="login-btn btn btn-success"> Create </button> &nbsp; &nbsp;
                                    <Link to="/admin/listaCase"><button className="login-btn btn btn-success"> Indietro </button></Link>
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

export default AddImageCasa;
