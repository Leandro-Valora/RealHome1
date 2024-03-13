import React, { Component } from 'react';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./StileTabella.css";

class ListaAgente extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        agenteToDelete: null
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/admin/listaAgente')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.agente)) {
                        this.setState({ agente: response.data.agente });
                      } else {
                        console.log("agente data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch agente");
                }
            })
            .catch(error => {
                console.log("Error fetching agente:", error);
            });
        }
    }

    handleDeleteAgente = (agente) => {
        this.setState({ agenteToDelete: agente });
    }

    confirmDeleteAgente = () => {
        const agId = this.state.agenteToDelete.Id_agente;
        axios.post('http://localhost:8081/admin/AgenteDelete', { Id_agente: agId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/admin/listaAgente')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.agente)) {
                                    this.setState({ agente: response.data.agente, agenteToDelete: null });
                                } else {
                                    console.log("agente data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch agente");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching agente:", error);
                        });
                } else {
                    console.log("Failed to delete agente");
                }
            })
            .catch(error => {
                console.log("Error deleting agente:", error);
            });
    }

    render() {
        return (
            <>
                <AdBar />
                <br />                     
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Benvenuton nel centro di controllo degli agenti</center></h1>
                    </header>
                    <br />
                    <main>
                        <h3>Vuoi inserire un nuovo agente ? <Link to="/admin/crudAdmin/CreateAgente" > Clicca qui </Link></h3>
                        <br />
                        <h3 className='h3-tabella'><strong>Tabella Agenti Immobiliari</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">COGNOME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">PASSWORD</th>
                                <th scope="col">NUMERO TEL.</th>
                                <th scope="col">MODIFICA</th>
                                <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.agente) && this.state.agente.map(agent => (
                                    <tr key={agent.Id_agente}>
                                        <th scope="row">{agent.Id_agente}</th>
                                        <td>{agent.Nome.charAt(0).toUpperCase() + agent.Nome.slice(1)}</td>
                                        <td>{agent.Cognome.charAt(0).toUpperCase() + agent.Cognome.slice(1)}</td>
                                        <td>{agent.Email}</td>
                                        <td>{agent.Password}</td>
                                        <td>{agent.Numero_cell}</td>
                                        <td> 
                                            <Link to={`/admin/crudAdmin/modificaAgente?agenteId=${agent.Id_agente}`}><button>Modifica</button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => this.handleDeleteAgente(agent)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {this.state.agenteToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare l'Agente Imm.?</p>
                            <button onClick={this.confirmDeleteAgente}>Conferma</button>
                            <button onClick={() => this.setState({ agenteToDelete: null })}>Annulla</button>
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

export default ListaAgente;