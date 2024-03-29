import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import "./StileTabella.css";
import axios from 'axios';
import Alert from '@mui/material/Alert';

class ListaAdmin extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        adminToDelete: null,
        errorMessage: ''
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/admin/listaAdmin')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.admins)) {
                        this.setState({ admins: response.data.admins });
                      } else {
                        console.log("Admins data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch admins");
                }
            })
            .catch(error => {
                console.log("Error fetching admins:", error);
            });
        }
    }

    handleDeleteAdmin = (admin) => {
        this.setState({ adminToDelete: admin });
    }

    resetErrorMessage = () => {
        this.setState({ errorMessage: '' });
    }

    confirmDeleteAdmin = () => {
        const adminId = parseInt(this.state.adminToDelete.Id_admin);
        const varId = parseInt(localStorage.getItem('adId'));

        if(varId !== adminId) {
            axios.post('http://localhost:8081/admin/AdminDelete', { Id_admin: adminId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/admin/listaAdmin')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.admins)) {
                                    this.setState({ admins: response.data.admins, adminToDelete: null });
                                } else {
                                    console.log("admins data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch admins");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching admins:", error);
                        });
                } else {
                    console.log("Failed to delete admins");
                }
            })
            .catch(error => {
                console.log("Error deleting admins:", error);
            });
        }
        else {
            this.setState({ errorMessage: "Non puoi cancellare il tuo account!" });
        }
    }
    
    render() {
        return (
            <>
                <AdBar />
                <br />
                <div>
                    <header>
                        <h2 className='titolo-1'><center>Benvenuti nel centro di controllo degli amministratori</center></h2>
                    </header>
                    <br />
                    <main>
                        <h3> &nbsp; &nbsp; Vuoi inserire un nuovo amministratore ? <Link to="/admin/crudAdmin/CreateAdmin" > Clicca qui </Link></h3>
                        <br />
                        <h3 className='h3-tabella'><strong>Tabella Amministratori</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">COGNOME</th>
                                <th scope="col">DATA NASCITA</th>
                                <th scope="col">CITTA'</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">PASSWORD</th>
                                <th scope="col">DATA ISCRIZIONE</th>
                                <th scope="col">MODIFICA</th>
                                <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.admins) && this.state.admins.map(admin => (
                                    <tr key={admin.Id_admin}>
                                        <th scope="row">{admin.Id_admin}</th>
                                        <td>{admin.Nome.charAt(0).toUpperCase() + admin.Nome.slice(1)}</td>
                                        <td>{admin.Cognome.charAt(0).toUpperCase() + admin.Cognome.slice(1)}</td>
                                        <td>{admin.DataNascita ? new Date(admin.DataNascita).toISOString().split('T')[0] : '-'}</td>
                                        <td>{admin.Citta.charAt(0).toUpperCase() + admin.Citta.slice(1)}</td>
                                        <td>{admin.Email}</td>
                                        {/* cifrario di cesare */}
                                        <td>{admin.Password.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('')}</td>
                                        <td>{admin.Data_inscrizione ? new Date(admin.Data_inscrizione).toISOString().split('T')[0] : '-'}</td>
                                        <td> 
                                            <Link to={`/admin/crudAdmin/modificaAdmin?adminId=${admin.Id_admin}`}><button>Modifica</button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => this.handleDeleteAdmin(admin)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {this.state.adminToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            {this.state.errorMessage && (
                                <Alert severity="warning">Non puoi cancellare il tuo account!</Alert>
                            )}
                            <p>Sei sicuro di voler eliminare l' amministratore ?</p>
                            <button onClick={this.confirmDeleteAdmin}>Conferma</button>
                            <button onClick={() => {
                                this.setState({ adminToDelete: null });
                                this.resetErrorMessage(); // Resetta l'errore
                            }}>Annulla</button>
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

export default ListaAdmin;