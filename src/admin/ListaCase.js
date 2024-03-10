import React, { Component } from 'react';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./StileTabella.css";

class ListaCase extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        houseToDelete: null
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if ((!userName || userName.trim() === "generic") && !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/admin/listaCase')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.case)) {
                        this.setState({ case: response.data.case });
                      } else {
                        console.log("case data is not an array");
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

    handleDeleteHouse = (casa) => {
        this.setState({ houseToDelete: casa });
    }

    confirmDeleteCasa = () => {
        const casaId = this.state.houseToDelete.Id_casa;
        axios.post('http://localhost:8081/admin/CasaDelete', { Id_casa: casaId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/admin/listaCase')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.case)) {
                                    this.setState({ case: response.data.case, houseToDelete: null });
                                } else {
                                    console.log("case data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch case");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching case:", error);
                        });
                } else {
                    console.log("Failed to delete case");
                }
            })
            .catch(error => {
                console.log("Error deleting case:", error);
            });
    }

    render() {
        return (
            <>
                <AdBar />
                <br />
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Benvenuti nel centro di controllo per le case</center></h1>
                    </header>
                    <br />
                    <main>
                        <h3>Vuoi inserire una nuova dimora ? <Link to="/admin/crudAdmin/CreateCasa" > Clicca qui </Link></h3>
                        <br />
                        <h3 className='h3-tabella'><strong>Tabella Case</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">PROPIETARIO</th>
                                <th scope="col">AGENTE</th>
                                <th scope="col">PAESE</th>
                                <th scope="col">CITTA'</th>
                                <th scope="col">VIA</th>
                                <th scope="col">PREZZO</th>
                                <th scope="col">DESCRIZIONE</th>
                                <th scope="col">MODIFICA</th>
                                <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.case) && this.state.case.map(casa => (
                                    <tr key={casa.Id_casa}>
                                        <th scope="row">{casa.Id_casa}</th>
                                        <td>{casa.Propietario.charAt(0).toUpperCase() + casa.Propietario.slice(1)}</td>
                                        <td>{casa.Agente.charAt(0).toUpperCase() + casa.Agente.slice(1)}</td>
                                        <td>{casa.Paese.charAt(0).toUpperCase() + casa.Paese.slice(1)}</td>
                                        <td>{casa.Citta.charAt(0).toUpperCase() + casa.Citta.slice(1)}</td>
                                        <td>{casa.Via}</td>
                                        <td>{casa.Prezzo}</td>
                                        <td>{casa.Descrizione}</td>
                                        <td> 
                                            <Link to={`/admin/crudAdmin/modificaCasa?casaId=${casa.Id_casa}`}><button>Modifica</button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => this.handleDeleteHouse(casa)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {this.state.houseToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare la casa ?</p>
                            <button onClick={this.confirmDeleteCasa}>Conferma</button>
                            <button onClick={() => this.setState({ houseToDelete: null })}>Annulla</button>
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

export default ListaCase;