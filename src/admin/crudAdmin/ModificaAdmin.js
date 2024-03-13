import React from 'react';
import { useLocation } from 'react-router-dom';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import "../StileTabella.css";

function ModificaAdmin() {
    const location = useLocation();
    const [adminDet, setAdmin] = React.useState({
        Nome: '',
        Cognome: '',
        dataNascita: '',
        Citta: '',
        Email: '',
        Password: '',
        Id_admin:''
    });
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errors, setErrors] = React.useState({
        nome: '',
        email: '',
        cognome: '',
        dataNascita: '',
        citta: '',
        password: ''
    });

    React.useEffect(() => {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            const searchParams = new URLSearchParams(location.search);
            const adminId = searchParams.get('adminId');
            if (adminId) {
                //dettagli dell'utente utilizzando l'ID recuperato dall'URL
                axios.get('http://localhost:8081/admin/getAdminDetails', {
                    params: {
                        adminId: adminId
                    }
                }).then(response => {
                    if(response.data.status === "Success") {
                        setAdmin(response.data.adminDetails[0]);
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
    
        const errorsCopy = { ...errors };
    
        // Controllo campi vuoti
        Object.keys(adminDet).forEach(key => {
            if (!adminDet[key]) {
                errorsCopy[key.toLowerCase()] = `${key} è richiesto`;
            } else {
                errorsCopy[key.toLowerCase()] = '';
            }
        });
    
        // Controllo password alfanumerica e lunghezza
        if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,30}$/.test(adminDet.Password)) {
            errorsCopy.password = 'La password deve contenere almeno una lettera e un numero, e essere lunga da 8 a 30 caratteri';
        }
    
        // Aggiornamento dello stato degli errori
        setErrors(errorsCopy);
    
        // Se non ci sono errori, procedi con la richiesta di modifica
        if (!Object.values(errorsCopy).some(error => error)) {
            axios.post('http://localhost:8081/admin/crudAdmin/modificaAdmin', adminDet)
                .then(response => {
                    if (response.data.status === "Success") {
                        setSuccessMessage("Admin modificato con successo!");
                    } else {
                        console.log("Failed to update admin");
                    }
                })
                .catch(error => {
                    console.log("Error updating admin:", error);
                });
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevUserDet => ({
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
                    <h1 className='titolo-1'><center>Modifica i campi degli Admin</center></h1>
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
                                            name="Nome"
                                            value={adminDet.Nome || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.nome && <span className="text-danger">{errors.nome}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="cognome">
                                            <strong>Cognome</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="Cognome"
                                            value={adminDet.Cognome || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.cognome && <span className="text-danger">{errors.cognome}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="dataNascita">
                                            <strong>Data di Nascita</strong>
                                        </label>
                                        <input
                                            type="date"
                                            name="DataNascita"
                                            id='dataNascita'
                                            value={(adminDet.DataNascita ? new Date(adminDet.DataNascita).toISOString().split('T')[0] : '-') || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                            min="1920-01-01"
                                            max="2024-01-02"
                                        />
                                        {errors.dataNascita && <span className="text-danger">{errors.dataNascita}</span>}
                                    </div>

                                    <div className="login-form-group">
                                        <label htmlFor="citta">
                                            <strong>Citta'</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="Citta"
                                            value={adminDet.Citta || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.citta && <span className="text-danger">{errors.citta}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="email">
                                            <strong>Email</strong>
                                        </label>
                                        <input
                                            type="email"
                                            name="Email"
                                            value={adminDet.Email || ''}
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
                                            id="password"
                                            name="Password"
                                            value={adminDet.Password || ''}
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

export default ModificaAdmin;
