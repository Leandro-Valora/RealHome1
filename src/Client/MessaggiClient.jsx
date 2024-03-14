import React from 'react';
import ClientBar from './components/ClientBar';
import Footer from '../components/Footer';
import axios from 'axios';
import './components/StileMessaggi.css';

class MessaggiClient extends React.Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        contattoToDelete: ''
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/Client/recive-email', { Email_richiedente: localStorage.getItem('emailId') })
            .then(response => {
                if(response.data.status === "Success") {
                    if (Array.isArray(response.data.emails)) {
                        this.setState({ emails: response.data.emails });
                      } else {
                        console.log("email data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch email");
                }
            })
            .catch(error => {
                console.log("Error fetching email:", error);
            });
        }
    }

    handleDeleteContatto = (email) => {
        this.setState({ contattoToDelete: email });
    }

    confirmDeleteContatto = () => {
        const contattoId = this.state.contattoToDelete.Id_email;
        axios.post('http://localhost:8081/Client/DeleteEmail', { Id_email: contattoId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/Client/recive-email', { Email_richiedente: localStorage.getItem('emailId') })
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.emails)) {
                                    this.setState({ emails: response.data.emails, contattoToDelete: null });
                                } else {
                                    console.log("messages data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch messages");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching messages:", error);
                        });
                } else {
                    console.log("Failed to delete messages");
                }
            })
            .catch(error => {
                console.log("Error deleting messages:", error);
            });
    }

    render() {
        return (
            <>
                <ClientBar />
                <br />
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Messaggi da parte dell'Agente Immobiliare </center></h1>
                    </header>
                    <br />
                    <main>
                        <h3><strong>&nbsp; &nbsp; Lista Messaggi </strong></h3>
                        <div className="message-list">
                            {Array.isArray(this.state.emails) && this.state.emails.map(contatto => (
                                <div className="message" key={contatto.Id_email}>
                                    <div className="message-info">
                                        <div className="info-item"><strong>Agente Immobiliare: </strong> {contatto.Nome.charAt(0).toUpperCase() + contatto.Nome.slice(1) + " " 
                                        + contatto.Cognome.charAt(0).toUpperCase() + contatto.Cognome.slice(1)}</div>
                                        <div className="info-item"><strong>EMAIL:</strong> {contatto.Email}</div>
                                        <div className="info-item"><strong>DATA RICEVUTA:</strong> {new Date(new Date(contatto.Data_messaggio).getTime() + (60 * 60 * 1000)).toLocaleString('it-IT', {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', timeZone:'UTC'})}</div>
                                        <div className="info-item"><strong>TITOLO:</strong> {contatto.Titolo}</div>
                                    </div>
                                    <div className="message-content">
                                        <strong>MESSAGGIO</strong> <br />
                                        {contatto.Descrizione_email}
                                    </div>
                                    <br />
                                    <button className="delete-button" onClick={() => this.handleDeleteContatto(contatto)}>Elimina</button>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
                {this.state.contattoToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare il messaggio?</p>
                            <button onClick={this.confirmDeleteContatto}>Elimina</button>
                            <button onClick={() => this.setState({ contattoToDelete: null })}>Annulla</button>
                        </div>
                    </div>
                )}

                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default MessaggiClient;
