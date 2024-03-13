import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import "./StileTabella.css";

class ListaUser extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        users: [],
        userToDelete: null
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/admin/listaUser')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.users)) {
                        this.setState({ users: response.data.users });
                      } else {
                        console.log("users data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch users");
                }
            })
            .catch(error => {
                console.log("Error fetching users:", error);
            });
        }
    }

    handleEditUser = (user) => {
        this.props.history.push({
            pathname: '/admin/crudAdmin/modificaUser',
            state: { user: user }
        });
    }

    handleDeleteUser = (user) => {
        this.setState({ userToDelete: user });
    }

    confirmDeleteUser = () => {
        const userId = this.state.userToDelete.Id_signup;
        axios.post('http://localhost:8081/admin/UserDelete', { Id_signup: userId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/admin/listaUser')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.users)) {
                                    this.setState({ users: response.data.users, userToDelete: null });
                                } else {
                                    console.log("users data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch users");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching users:", error);
                        });
                } else {
                    console.log("Failed to delete user");
                }
            })
            .catch(error => {
                console.log("Error deleting user:", error);
            });
    }
    
    render() {
        return (
            <>
                <AdBar />
                <br />
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Modifica i campi dell'utente</center></h1>
                    </header>
                    <br />
                    <main>
                        <h3>Vuoi inserire un nuovo Utente ? <Link to="/admin/crudAdmin/CreateUser" > Clicca qui </Link></h3>
                        <br />
                        <h3><strong>Tabella Utenti</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NOME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">PASSWORD</th>
                                    <th scope="col">MODIFICA</th>
                                    <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(user => (
                                    <tr key={user.Id_signup}>
                                        <th scope="row">{user.Id_signup}</th>
                                        <td>{user.Name.charAt(0).toUpperCase() + user.Name.slice(1)}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Password.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('')}</td>
                                        <td> 
                                            <Link to={`/admin/crudAdmin/modificaUser?userId=${user.Id_signup}`}><button>Modifica Utente</button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => this.handleDeleteUser(user)}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
                
                {this.state.userToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare l'utente?</p>
                            <button onClick={this.confirmDeleteUser}>Conferma</button>
                            <button onClick={() => this.setState({ userToDelete: null })}>Annulla</button>
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

export default ListaUser;
