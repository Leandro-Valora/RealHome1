import React from 'react';
import AgenteBar from './AgenteBar';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import axios from 'axios';

class Messaggi extends React.Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        msnToDelete: null
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if ((!userName || userName.trim() === "generic") && !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            const valueAgentId = localStorage.getItem('aId');
            axios.post('http://localhost:8081/agente/listaMessaggi', {Id_agente: valueAgentId})
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.Messaggi)) {
                        this.setState({ messages: response.data.Messaggi});
                      } else {
                        console.log("Messaggi data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch Messaggi");
                }
            })
            .catch(error => {
                console.log("Error fetching Messaggi:", error);
            });
        }
    }

    handleDeleteMsn = (msg) => {
        this.setState({ msnToDelete: msg });
    }

    confirmDeleteMsg = () => {
        const msgId = this.state.msnToDelete.Id_msg;

        axios.post('http://localhost:8081/agente/MsgDelete', { Id_msg: msgId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/agente/listaMessaggi')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.Messaggi)) {
                                    this.setState({ messages: response.data.Messaggi, msnToDelete: null });
                                } else {
                                    console.log("Messaggi data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch Messaggi");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching Messaggi:", error);
                        });
                } else {
                    console.log("Failed to delete Messaggi");
                }
            })
            .catch(error => {
                console.log("Error deleting Messaggi:", error);
            });
    }

    render() {
        return (
            <>
                <AgenteBar />
                <br />
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Messaggi arrivati dai clienti registrati </center></h1>
                    </header>
                    <br />
                    <main>
                        <h3><strong>Tabella Messaggi </strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">DATA</th>
                                <th scope="col">TITOLO</th>
                                <th scope="col">Messaggio</th>
                                <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.messages) && this.state.messages.map(contatto => (
                                    <tr key={contatto.Id_msg}>
                                        <th scope="row">{contatto.Id_msg}</th>
                                        <td>{contatto.Email_richiedente}</td>
                                        <td>{new Date(contatto.Data_messaggio).toLocaleString('it-IT', {year:'numeric', month:'2-digit', day:'2-digit', 
                                        hour:'2-digit', minute:'2-digit', timeZone:'UTC'})}</td>
                                        <td>{contatto.Titolo}</td>
                                        <td>{contatto.Descrizione_msg}</td>
                                        <td>
                                            <button onClick={() => this.handleDeleteMsn(contatto)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
                
                {this.state.msnToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare il messaggio ?</p>
                            <button onClick={this.confirmDeleteMsg}>Conferma</button>
                            <button onClick={() => this.setState({ msnToDelete: null })}>Annulla</button>
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

export default Messaggi;
