import React, { Component } from 'react';
import '../RealHome.css';
import './Contatti.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';

class Contatti extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        nome: '',
        email: '',
        messaggio: '',
        error: '',
        successMessage: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: '', // Reset error message when input changes
            successMessage: '' // Reset success message when input changes
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { nome, email, messaggio } = this.state;

        if (!nome || !email || !messaggio) {
            this.setState({ error: 'Tutti i campi sono obbligatori' });
            return;
        }

        fetch('http://localhost:8081/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                email,
                messaggio,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("status -> " + data.status);
            if (data.status === "Successo") {
                this.setState({
                    successMessage: 'Messaggio inviato con successo!',
                    nome: '',
                    email: '',
                    messaggio: ''
                });
            } else {
                this.setState({ error: 'Si è verificato un errore durante l\'invio del messaggio.' });
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            this.setState({ error: 'Si è verificato un errore durante grave.' });
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="image-header-container">
                    <img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" />
                    <h3>Per contattarci facilmente</h3>
                </div>
                {/* Form di contatto */}
                <center>{this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}</center>
                {this.state.error && <p className="error-message">{this.state.error}</p>}
                <br />
                <form className="contact-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" value={this.state.nome} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="messaggio">Messaggio:</label>
                        <textarea id="messaggio" name="messaggio" value={this.state.messaggio} onChange={this.handleChange} required />
                    </div>
                    <button type="submit">Invia</button>
                </form>

                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default Contatti;
