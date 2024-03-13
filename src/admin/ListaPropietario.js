import React, { Component } from 'react';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./StileTabella.css";

class ListaPropietario extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        ownerToDelete: null
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/admin/listaPropietario')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.propietario)) {
                        this.setState({ propietario: response.data.propietario });
                      } else {
                        console.log("propietario data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch propietario");
                }
            })
            .catch(error => {
                console.log("Error fetching propietario:", error);
            });
        }
    }

    handleDeletePropietario = (owner) => {
        this.setState({ ownerToDelete: owner });
    }

    confirmDeletePropietario = () => {
        const ownerId = this.state.ownerToDelete.Id_propietario;
        axios.post('http://localhost:8081/admin/PropietarioDelete', { Id_propietario: ownerId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    //aggiorno elementi tabella
                    axios.post('http://localhost:8081/admin/listaPropietario')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.propietario)) {
                                    this.setState({ propietario: response.data.propietario, ownerToDelete: null });
                                } else {
                                    console.log("propietario data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch propietario");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching propietario:", error);
                        });
                } else {
                    console.log("Failed to delete propietario");
                }
            })
            .catch(error => {
                console.log("Error deleting propietario:", error);
            });
    }

    render() {
        return (
            <>
                <AdBar />
                <br />                   
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Benvenuton nel centro di controllo dei propietari di Immobili</center></h1>
                    </header>
                    <br />
                    <main>
                        <h3>Vuoi inserire una nuovo propietario ? <Link to="/admin/crudAdmin/CreatePropierario" > Clicca qui </Link></h3>
                        <br />
                        <h3 className='h3-tabella'><strong>Tabella Propietari Immobiliari</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">COGNOME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">NUMERO TEL.</th>
                                <th scope="col">MODIFICA</th>
                                <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.propietario) && this.state.propietario.map(prop => (
                                    <tr key={prop.Id_propietario}>
                                        <th scope="row">{prop.Id_propietario}</th>
                                        <td>{prop.Nome.charAt(0).toUpperCase() + prop.Nome.slice(1)}</td>
                                        <td>{prop.Cognome.charAt(0).toUpperCase() + prop.Cognome.slice(1)}</td>
                                        <td>{prop.Email}</td>
                                        <td>{prop.Numero_cell}</td>
                                        <td> 
                                            <Link to={`/admin/crudAdmin/modificaPropietario?userProp=${prop.Id_propietario}`}><button>Modifica Propietario</button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => this.handleDeletePropietario(prop)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {this.state.ownerToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare il propietario?</p>
                            <button onClick={this.confirmDeletePropietario}>Conferma</button>
                            <button onClick={() => this.setState({ ownerToDelete: null })}>Annulla</button>
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

export default ListaPropietario;