import React from 'react';
import { useLocation } from 'react-router-dom';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import "../StileTabella.css";

function ModificaUser() {
    const location = useLocation();
    const [userDet, setUserDet] = React.useState({
        Name: '',
        Email: '',
        Password: '',
        Id_signup: ''
    });
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errors, setErrors] = React.useState({
        nome: '',
        email: '',
        password: ''
    });

    React.useEffect(() => {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
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
                        setUserDet(response.data.userDetails[0]);
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

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!userDet.Name.trim()) {
            formIsValid = false;
            newErrors.nome = "Il campo Nome è vuoto";
        }

        if (!userDet.Email.trim()) {
            formIsValid = false;
            newErrors.email = "Il campo Email è vuoto";
        }

        if (!userDet.Password.trim()) {
            formIsValid = false;
            newErrors.password = "Il campo Password è vuoto";
        } else if (!/^[a-zA-Z0-9]{8,30}$/.test(userDet.Password)) {
            formIsValid = false;
            newErrors.password = "La password deve essere alfanumerica e avere lunghezza compresa tra 8 e 30 caratteri";
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            axios.post('http://localhost:8081/admin/crudAdmin/modificaUser', userDet)
                .then(response => {
                    if (response.data.status === "Success") {
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
        setUserDet(prevUserDet => ({
            ...prevUserDet,
            [name]: value
        }));
    };

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
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default ModificaUser;
