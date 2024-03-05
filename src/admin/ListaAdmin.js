import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import "./StileTabella.css";
import axios from 'axios';

class ListaAdmin extends Component {
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
    
    render() {
        return (
            <>
                <AdBar />
                <br />     
                {/* QUI CODICE per pagina specifica  */}
                
                <div>
                    <header>
                        <h2 className='titolo-1'><center>Benvenuti nel centro di controllo degli amministratori</center></h2>
                    </header>
                    <br />
                    <main>
                        <h3>Vuoi inserire un nuovo amministratore ? <Link to="/admin/crudAdmin/CreateAdmin" > Clicca qui </Link></h3>
                        <br />
                        <h3><strong>Tabella Amministratori</strong></h3>
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
                                        <td><button>modifica</button></td>
                                        <td><button>elimina</button></td>
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

export default ListaAdmin;