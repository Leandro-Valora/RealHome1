import React, { Component } from 'react';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import ValidationEmail from '../../EmailValidation';
import axios from 'axios';

class CreatePropierario extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        values: {
            nome: '',
            cognome: '',
            email: '',
            numero_cell: ''
        },
        errors: {
            nome: '',
            cognome: '',
            numero_cell: ''
        },
        successMessage: '',
        showMessage: false, 
        showMessageError: false
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const ValidationEmailErrors = ValidationEmail(this.state.values);
        this.setState({ errors: ValidationEmailErrors });
        
        const { values } = this.state;
        const numeroCell = values.numero_cell.trim();

        if (!Object.values(ValidationEmailErrors).some(error => error !== "") && 
        !Object.values(values).some(value => value === "") && numeroCell.length >= 6 && numeroCell.length <= 12) {
            axios.post('http://localhost:8081/admin/crudAdmin/createPropietario', values)
                .then(response => {
                    if(response.data.status === "Success") {
                        this.setState({ 
                            successMessage: "Propietario creato con successo!",
                            showMessage: true,
                            showMessageError: false
                        });
                    } else {
                        console.log("Failed to fetch propietario");
                        this.setState({ 
                            successMessage: "Qualcosa è andato storto!",
                            showMessage: false,
                            showMessageError: true
                        });
                    }
                })
                .catch(error => {
                    console.log("Error fetching propietario:", error);
                    this.setState({ 
                        successMessage: "Prova a cambiare email!",
                        showMessage: false,
                        showMessageError: true
                    });
                });
        }
    };
    
    

    handleInput = (event) => {
        const { name, value } = event.target;
        let newValue = value;
        // Verifica se il campo è "numero_cell" e applica la validazione
        if (name === "numero_cell") {
            // Rimuovi spazi bianchi
            newValue = value.trim();
            // Verifica la lunghezza del numero di telefono
            if (newValue.length < 6 || newValue.length > 12) {
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        [name]: "Il numero di telefono deve essere compreso tra 6 e 12 caratteri."
                    }
                }));
                return; // Interrompi la validazione
            }
        }
        // Aggiorna lo stato con il nuovo valore e cancella gli eventuali errori precedenti
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: newValue
            },
            errors: {
                ...prevState.errors,
                [name]: "" // Cancella eventuali errori precedenti
            }
        }));
    };
    

    render() {
        const { successMessage, showMessageError, showMessage, errors } = this.state;
        const { handleInput, handleSubmit } = this;
        return (
            <>
                <AdBar />
                <br />                     
                <div>
                    <header>
                        <h2 className='titolo-1'><center>Crea un nuovo Propietario Immobiliare </center></h2>
                    </header>
                    <br />
                    <main>
                        <div className="login-form-container">
                            <div className="login-form">
                                <p>{showMessage && <span className="text-success">{successMessage}</span>}</p>
                                <p>{showMessageError && <span className="text-danger">{successMessage}</span>}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="login-form-group">
                                        <label htmlFor="nome">
                                            <strong>Nome</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="nome"
                                            placeholder="enter name"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.nome && <span className="text-danger">{errors.nome}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="cognome">
                                            <strong>Cognome</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="cognome"
                                            placeholder="enter surname"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.cognome && <span className="text-danger">{errors.cognome}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="cognome">
                                            <strong>Numero telefonico</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="numero_cell"
                                            placeholder="enter tel."
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.numero_cell && <span className="text-danger">{errors.numero_cell}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="email">
                                            <strong>Email</strong>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="enter email"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                    <button type="submit" className="login-btn btn btn-success"> Aggiungi </button>
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

export default CreatePropierario;
