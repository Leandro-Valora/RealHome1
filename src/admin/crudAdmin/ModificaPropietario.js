import React from 'react';
import { useLocation } from 'react-router-dom';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import "../StileTabella.css";

function ModificaPropietario() {
    const location = useLocation();
    const [propDet, setOwners] = React.useState({
        Nome: '',
        Cognome: '',
        Email: '',
        Numero_cell: '',
        Id_propietario:''
    });
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errors, setErrors] = React.useState({
        nome: '',
        email: '',
        cognome: '',
        numero_cell: ''
    });

    React.useEffect(() => {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            const searchParams = new URLSearchParams(location.search);
            const ownerId = searchParams.get('userProp');
            if (ownerId) {
                //dettagli dell'utente utilizzando l'ID recuperato dall'URL
                axios.get('http://localhost:8081/admin/getPropDetails', {
                    params: {
                        ownerId: ownerId
                    }
                }).then(response => {
                    if(response.data.status === "Success") {
                        setOwners(response.data.propDetails[0]);
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
        let hasErrors = false;
    
        // Controllo se ci sono campi vuoti
        for (const key in propDet) {
            if (propDet[key] === "") {
                errorsCopy[key.toLowerCase()] = "Questo campo non può essere vuoto";
                hasErrors = true;
            }
        }
    
        // Controllo lunghezza numero telefonico
        if (propDet.Numero_cell.length < 6 || propDet.Numero_cell.length > 12) {
            errorsCopy.numero_cell = "Il numero telefonico deve essere lungo tra 6 e 12 caratteri";
            hasErrors = true;
        }
    
        if (!hasErrors) {
            axios.post('http://localhost:8081/admin/crudAdmin/modificaProp', propDet)
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
        } else {
            setErrors(errorsCopy);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const errorsCopy = { ...errors };
    
        // Reset degli errori quando il campo viene modificato
        errorsCopy[name.toLowerCase()] = "";
        setErrors(errorsCopy);
    
        setOwners(prevUserDet => ({
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
                    <h1 className='titolo-1'><center>Modifica i campi del Propietario degli Immobili</center></h1>
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
                                        value={propDet.Nome || ''}
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
                                        value={propDet.Cognome || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.cognome && <span className="text-danger">{errors.cognome}</span>}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="cognome">
                                        <strong>Numero telefonico</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="Numero_cell"
                                        value={propDet.Numero_cell || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.numero_cell && <span className="text-danger">{errors.numero_cell}</span>}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="email">
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={propDet.Email || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <button type="submit" className="login-btn btn btn-success"> Aggiungi </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default ModificaPropietario;
