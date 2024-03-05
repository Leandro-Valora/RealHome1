// import React, { Component } from 'react';
// import AdBar from '../AdBar';
// import Footer from '../../components/Footer';
// import UserProfile from '../../UserProfile';
// import Validation from '../../LoginValidation';
// import axios from 'axios';
// import "../StileTabella.css";

// class ModificaUser extends Component {
//     state = {
//         footers: [
//             { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
//         ],
//         errors: {
//             nome: '',
//             email: '',
//             password: ''
//         },
//         successMessage: '',
//         users: {} // Aggiungi uno stato per memorizzare i dati dell'utente
//     }

//     componentDidMount() {
//         const userName = UserProfile.getName();
//         if (!userName || userName.trim() === "generic") {
//             // Reindirizza l'utente alla pagina principale se il nome è vuoto
//             window.location.href = "/";
//         }
//         else {
//             const { location } = this.props;
//             console.log("location : " + location);
//             if (location && location.state && location.state.users) {
//                 const users = location.state.users;
//                 this.setState({ users });
//             } else {
//                 // Gestione del caso in cui non ci siano dati dell'utente disponibili
//                 console.log("Dati dell'utente non disponibili.");
//             }
//         }
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const validationErrors = Validation(this.state.users);
//         this.setState({ errors: validationErrors });
        
//         if (!Object.values(validationErrors).some(error => error !== "") && !Object.values(this.state.users).some(value => value === "")) {
//             axios.post('http://localhost:8081/admin/crudAdmin/ModificaUser', this.state.users)
//             .then(response => {
//                 if(response.data.status === "Success") {
//                     this.setState({ 
//                         successMessage: "Utente modificato con successo!"
//                     });
//                 } else {
//                     console.log("Failed to fetch utenti");
//                 }
//             })
//             .catch(error => {
//                 console.log("Error fetching utenti:", error);
//             });
//         }
//     };
    

//     handleChange = (e) => {
//         const { name, value } = e.target;
//         this.setState(prevState => ({
//             users: {
//                 ...prevState.users,
//                 [name]: value
//             }
//         }));
//     }
    
//     render() {
//         const { successMessage, errors } = this.state;
//         const { handleSubmit } = this;
//         const { users } = this.state; // Otteni i dati dell'utente dallo stato
//         return (
//             <>
//                 <AdBar />
//                 <br />
//                 <div>
//                     <header>
//                         <h1 className='titolo-1'><center>Modifica i campi dell'utente</center></h1>
//                     </header>
//                     <br />
//                     <main>
//                         <div className="login-form-container">
//                             <div className="login-form">
//                                 <p>{successMessage && <span className="text-success">{successMessage}</span>}</p>
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="login-form-group">
//                                         <label htmlFor="nome">
//                                             <strong>Nome</strong>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="nome"
//                                             value={users.nome || ''}
//                                             onChange={this.handleChange}
//                                             className="form-control rounded-0"
//                                         />
//                                         {errors.nome && <span className="text-danger">{errors.nome}</span>}
//                                     </div>
//                                     <div className="login-form-group">
//                                         <label htmlFor="email">
//                                             <strong>Email</strong>
//                                         </label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={users.email || ''}
//                                             onChange={this.handleChange}
//                                             className="form-control rounded-0"
//                                         />
//                                         {errors.email && <span className="text-danger">{errors.email}</span>}
//                                     </div>
//                                     <div className="login-form-group">
//                                         <label htmlFor="password">
//                                             <strong>Password</strong>
//                                         </label>
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             id="password"
//                                             value={users.password || ''}
//                                             onChange={this.handleChange}
//                                             className="form-control rounded-0"
//                                         />
//                                         {errors.password && <span className="text-danger">{errors.password}</span>}
//                                     </div>
//                                     <button type="submit" className="login-btn btn btn-success"> Modifica </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </main>
//                 </div>

//                 {this.state.footers.map(footer => (
//                     <Footer
//                         key={footer.id}
//                         footer={footer} />
//                 ))}
//             </>
//         );
//     }
// }

// export default ModificaUser;

import React, { Component } from 'react';
import AdBar from '../AdBar';
//import Footer from '../../components/Footer';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

class ModificaUser extends Component {
    state = {
        userId: '',
        userName: '',
        userEmail: '',
        userPassword: ''
    }

    componentDidMount() {
        const { location } = this.props;
        if (location.state && location.state.user) {
            const { Id_signup, Name, Email, Password } = location.state.user;
            this.setState({
                userId: Id_signup,
                userName: Name,
                userEmail: Email,
                userPassword: Password
            });
        } else {
            console.log("Location or state is undefined");
        }
    }

    render() {
        const { userId, userName, userEmail, userPassword } = this.state;
        return (
            <>
                <AdBar />
                <div>
                    <header>
                        <h1><center>Modifica Utente</center></h1>
                    </header>
                    <main>
                        <form>
                            <div>
                                <label>ID: </label>
                                <span>{userId}</span>
                            </div>
                            <div>
                                <label>Nome: </label>
                                <input type="text" value={userName} />
                            </div>
                            <div>
                                <label>Email: </label>
                                <input type="text" value={userEmail} />
                            </div>
                            <div>
                                <label>Password: </label>
                                <input type="password" value={userPassword} />
                            </div>
                            <button type="submit">Salva</button>
                        </form>
                    </main>
                </div>
            </>
        );
    }
}

export default ModificaUser;
