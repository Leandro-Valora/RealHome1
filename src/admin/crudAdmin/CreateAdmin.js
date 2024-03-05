import React, { Component } from 'react';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import UserProfile from '../../UserProfile';
import Validation from '../../LoginValidation';
import axios from 'axios';

class CreateAdmin extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        values: {
            nome: '',
            cognome: '',
            dataNascita: '',
            citta: '',
            email: '',
            password: ''
        },
        errors: {
            nome: '',
            cognome: '',
            dataNascita: '',
            citta: '',
            email: '',
            password: ''
        },
        successMessage: '',
        showMessage: false
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if (!userName || userName.trim() === "generic") {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(this.state.values);
        this.setState({ errors: validationErrors });
        
        if (!Object.values(validationErrors).some(error => error !== "") && !Object.values(this.state.values).some(value => value === "")) {
            axios.post('http://localhost:8081/admin/crudAdmin/createAdmin', this.state.values)
                .then(response => {
                    if(response.data.status === "Success") {
                        this.setState({ 
                            successMessage: "Amministratore creato con successo!",
                            showMessage: true
                        });
                    } else {
                        console.log("Failed to fetch admins");
                    }
                })
                .catch(error => {
                    console.log("Error fetching admins:", error);
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
                        <h2 className='titolo-1'><center>Crea un nuovo amministratore</center></h2>
                    </header>
                    <br />
                    <main>
                        <div className="login-form-container">
                            <div className="login-form">
                                <p>{showMessage && <span className="text-success">{successMessage}</span>}</p>
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
                                        <label htmlFor="dataNascita">
                                            <strong>Data di Nascita</strong>
                                        </label>
                                        <input
                                            type="date"
                                            name="dataNascita"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.dataNascita && <span className="text-danger">{errors.dataNascita}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="citta">
                                            <strong>Citta'</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="citta"
                                            placeholder="enter city"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.citta && <span className="text-danger">{errors.citta}</span>}
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
                                    <div className="login-form-group">
                                        <label htmlFor="password">
                                            <strong>Password</strong>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="enter password"
                                            id="password"
                                            name="password"
                                            onChange={handleInput}
                                            className="form-control rounded-0"
                                        />
                                        {errors.password && <span className="text-danger">{errors.password}</span>}
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

export default CreateAdmin;
