import React from 'react';
import AdBar from '../admin/AdBar.js';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import axios from 'axios';

class ListaContatti extends React.Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ]
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if (!userName || userName.trim() === "generic") {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/info/recive-email')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.messages)) {
                        this.setState({ messages: response.data.messages });
                      } else {
                        console.log("Contatti data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch contatti");
                }
            })
            .catch(error => {
                console.log("Error fetching contatti:", error);
            });
        }
    }

    render() {
        return (
            <>
                <AdBar />
                <br />
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Messaggi arrivati dal forum contatti </center></h1>
                    </header>
                    <br />
                    <main>
                        <h3><strong>Tabella Messaggi </strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">DATA INVIO</th>
                                <th scope="col">Messaggio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.messages) && this.state.messages.map(contatto => (
                                    <tr key={contatto.Id_contatto}>
                                        <th scope="row">{contatto.Id_contatto}</th>
                                        <td>{contatto.Nome.charAt(0).toUpperCase() + contatto.Nome.slice(1)}</td>
                                        <td>{contatto.Email}</td>
                                        <td>{new Date(contatto.Data_messaggio).toLocaleString('it-IT', {year:'numeric', month:'2-digit', day:'2-digit', 
                                        hour:'2-digit', minute:'2-digit', timeZone:'UTC'})}</td>
                                        <td>{contatto.Messaggio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
                {/* FINE */}
                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default ListaContatti;
