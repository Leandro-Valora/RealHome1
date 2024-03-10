import React, { Component } from 'react';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import axios from 'axios'; // Importa Axios per le richieste HTTP
//import "./StileTabella.css";

class CreateAdmin extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ]
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if ((!userName || userName.trim() === "generic") && !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
        // Carica la lista degli amministratori al caricamento del componente
        this.caricaAdmin();
    }

    // Funzione per caricare la lista degli amministratori
    caricaAdmin = () => {
        axios.post('/api/admin') // Invia una richiesta GET al backend
            .then(response => {
                this.setState({ footers: response.data }); // Aggiorna lo stato con i dati ricevuti dal backend
            })
            .catch(error => {
                console.error('Errore durante il recupero degli amministratori:', error);
            });
    }

    // Funzione per creare un nuovo admin
    creaAdmin = () => {
        axios.post('/api/admin', this.state.nuovaAdmin) // Invia una richiesta POST al backend con i dati del nuovo admin
            .then(response => {
                console.log('Nuovo admin creato con successo:', response.data);
                this.caricaAdmin(); // Ricarica la lista degli amministratori dopo la creazione
            })
            .catch(error => {
                console.error('Errore durante la creazione del nuovo admin:', error);
            });
    }

    // Funzione per eliminare un admin
    eliminaAdmin = (id) => {
        axios.delete(`/api/admin/${id}`) // Invia una richiesta DELETE al backend per eliminare l'admin con l'ID specificato
            .then(response => {
                console.log('Admin eliminato con successo:', response.data);
                this.caricaAdmin(); // Ricarica la lista degli amministratori dopo l'eliminazione
            })
            .catch(error => {
                console.error('Errore durante l\'eliminazione dell\'admin:', error);
            });
    }

    // Funzione per aggiornare lo stato del nuovo admin
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            nuovaAdmin: {
                ...prevState.nuovaAdmin,
                [name]: value
            }
        }));
    }

    render() {
        return (
            <>
                <AdBar />
                <br />
                {/* Form per creare un nuovo admin */}
                <div>
                    <form onSubmit={this.creaAdmin}>
                        <input type="text" name="indirizzo" placeholder="Indirizzo" onChange={this.handleChange} />
                        <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                        <input type="text" name="telefono" placeholder="Telefono" onChange={this.handleChange} />
                        <input type="text" name="cellulare" placeholder="Cellulare" onChange={this.handleChange} />
                        <input type="text" name="brand" placeholder="Brand" onChange={this.handleChange} />
                        <button type="submit">Aggiungi Admin</button>
                    </form>
                </div>
                <div>
                    <header>
                        <h2 className='titolo-1'><center>Benvenuti nella lista degli amministratori</center></h2>
                    </header>
                    <br />
                    <main>
                        {/* Mostra la lista degli amministratori */}
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Indirizzo</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>Cellulare</th>
                                    <th>Brand</th>
                                    <th>Azione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.footers.map(footer => (
                                    <tr key={footer.id}>
                                        <td>{footer.id}</td>
                                        <td>{footer.indirizzo}</td>
                                        <td>{footer.email}</td>
                                        <td>{footer.telefono}</td>
                                        <td>{footer.cellulare}</td>
                                        <td>{footer.brand}</td>
                                        <td>
                                            <button onClick={() => this.eliminaAdmin(footer.id)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
