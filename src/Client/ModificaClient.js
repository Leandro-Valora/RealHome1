import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import axios from 'axios';
import ClientBar from './components/ClientBar';

function ModificaClient() {
    const location = useLocation();
    const [userDet, setUsers] = React.useState({
        Name: '',
        Email: '',
        Password: '',
        Id_signup:''
    });
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errors] = React.useState({
        nome: '',
        email: '',
        password: ''
    });

    React.useEffect(() => {
        if (localStorage.getItem('userName')==="logout" || !(localStorage.getItem('userName'))) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            const searchParams = new URLSearchParams(location.search);
            const userId = searchParams.get('userId');
            if (userId) {
                //dettagli dell'utente utilizzando l'ID recuperato dall'URL
                axios.get('http://localhost:8081/admin/getUserDetails', {
                    params: {
                        userId: userId
                    }
                }).then(response => {
                    if(response.data.status === "Success") {
                        setUsers(response.data.userDetails[0]);
                    } else {
                        console.log("Failed to fetch user details");
                    }
                })
                .catch(error => {
                    console.log("Error fetching user details:", error);
                });
            } else {
                console.log("User ID not found in URL");
            }
        }
    }, [location]);
    
    

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!Object.values(userDet).some(value => value === "")) {
            axios.post('http://localhost:8081/admin/crudAdmin/modificaUser', userDet)
            .then(response => {
                if(response.data.status === "Success") {
                    UserProfile.setName(userDet.Name);
                    localStorage.setItem('emailId', userDet.Email);
                    setSuccessMessage("Utente modificato con successo!");
                    
                } else {
                    console.log("Failed to update user");
                }
            })
            .catch(error => {
                console.log("Error updating user:", error);
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers(prevUserDet => ({
            ...prevUserDet,
            [name]: value
        }));
    };
    
    return (
        <>
            <ClientBar />
            <br />
            <div>
                <header>
                    <h1 className='titolo-1'><center>Modifica i tuoi campi</center></h1>
                </header>
                <br />
                <main>
                    <div className="login-form-container">
                        <div className="login-form">
                            <p>{successMessage && <span className="text-success">{successMessage}</span>}</p>
                            <form onSubmit={handleSubmit}>
                                <div className="login-form-group">
                                    <label htmlFor="nome">
                                        <strong>Nome</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={userDet.Name || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.nome && <span className="text-danger">{errors.nome}</span>}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="email">
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={userDet.Email || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="password">
                                        <strong>Password</strong>
                                    </label>
                                    <input
                                        type="password"
                                        name="Password"
                                        id="password"
                                        value={userDet.Password || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                                <button type="submit" className="login-btn btn btn-success"> Modifica </button> 
                                <Link to="/Client/infoClient"><button className="login-btn btn"> Indietro </button></Link>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default ModificaClient;
