import React from 'react';
import { useLocation } from 'react-router-dom';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import UserProfile from '../../UserProfile';
import axios from 'axios';
import "../StileTabella.css";

function ModificaCasa() {
    const location = useLocation();
    const [casaDet, setCase] = React.useState({
        PropietarioIm: '',
        AgenteImm: '',
        Nome: '',
        Paese: '',
        Citta: '',
        Via: '',
        Prezzo: '',
        ImageURL: '',
        Descrizione: ''
    });
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errors] = React.useState({
        proprietario: '',
        agente: '',
        nome: '',
        paese: '',
        citta: '',
        via: '',
        prezzo: '',
        immagine: '',
        descrizione: ''
    });

    // Definisci lo stato per proprietari e agenti
    const [proprietari, setProprietari] = React.useState([]);
    const [agenti, setAgenti] = React.useState([]);

    React.useEffect(() => {
        const userName = UserProfile.getName();
        if ((!userName || userName.trim() === "generic") && !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            //codice per recuperare le info delle ddl
            axios.post('http://localhost:8081/admin/listaPropietario')
            .then(response => {
                if(response.data.status === "Success") {
                    const proprietari = response.data.propietario;
                    // Aggiorna lo stato con i dati dei proprietari
                    if(Array.isArray(proprietari)) {
                        setProprietari(proprietari); // Modifica qui
                    } else {
                        console.log("Dati proprietario non validi:", proprietari);
                    }
                } else {
                    console.log("Failed to fetch proprietari");
                }
            })
            .catch(error => {
                console.log("Error fetching proprietari:", error);
            });

            //seconda drop down list
            axios.post('http://localhost:8081/admin/listaAgente')
            .then(resp => {
                if(resp.data.status === "Success") {
                    const agenti = resp.data.agente;
                    // Aggiorna lo stato con i dati dei agenti
                    if(Array.isArray(agenti)) {
                        setAgenti(agenti); // Modifica qui
                    } else {
                        console.log("Dati agente non validi:", agenti);
                    }
                } else {
                    console.log("Failed to fetch agenti");
                }
            })
            .catch(error => {
                console.log("Error fetching agenti:", error);
            });

            //set di codice utile alle funzioni di questa pagina
            const searchParams = new URLSearchParams(location.search);
            const casaId = searchParams.get('casaId');
            if (casaId) {
                //dettagli dell'utente utilizzando l'ID recuperato dall'URL
                axios.get('http://localhost:8081/admin/getCasaDetails', {
                    params: {
                        houseId: casaId
                    }
                }).then(response => {
                    if(response.data.status === "Success") {
                        setCase(response.data.casaDetails[0]);
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
        
        if (!Object.values(casaDet).some(value => value === "")) {
            axios.post('http://localhost:8081/admin/crudAdmin/modificaCasa', casaDet)
            .then(response => {
                if(response.data.status === "Success") {
                    setSuccessMessage("Casa modificato con successo!");
                } else {
                    console.log("Failed to update casa");
                }
            })
            .catch(error => {
                console.log("Error updating casa:", error);
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCase(prevHouseDet => ({
            ...prevHouseDet,
            [name]: value
        }));
    };
    

    return (
        <>
            <AdBar />
            <br />
            <div>
                <header>
                    <h1 className='titolo-1'><center>Modifica i campi dell'Immobile</center></h1>
                </header>
                <br />
                <main>
                    <div className="login-form-container">
                        <div className="login-form">
                            <p>{successMessage && <span className="text-success">{successMessage}</span>}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="login-form-group">
                                        <label htmlFor="PropietarioIm">
                                            <strong>Propietario</strong>
                                        </label>
                                        <select
                                            name="PropietarioIm"
                                            value={casaDet.PropietarioIm}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        >
                                            {proprietari.map(prop => (
                                                <option key={prop.Id_propietario} value={prop.Id_propietario}>
                                                    {prop.Nome.charAt(0).toUpperCase() + prop.Nome.slice(1)} {prop.Cognome.charAt(0).toUpperCase() + prop.Cognome.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.proprietario && <span className="text-danger">{errors.proprietario}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="AgenteImm">
                                            <strong>Agente</strong>
                                        </label>
                                        <select
                                            name="AgenteImm"
                                            value={casaDet.AgenteImm}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        >
                                            {agenti.map(agImm => (
                                                <option key={agImm.Id_agente} value={agImm.Id_agente}>
                                                    {agImm.Nome.charAt(0).toUpperCase() + agImm.Nome.slice(1)} {agImm.Cognome.charAt(0).toUpperCase() + agImm.Cognome.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.agente && <span className="text-danger">{errors.agente}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="nome">
                                            <strong>Nome casa</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="Nome"
                                            value={casaDet.Nome || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.nome && <span className="text-danger">{errors.nome}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="paese">
                                            <strong>Paese</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="Paese"
                                            value={casaDet.Paese || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.paese && <span className="text-danger">{errors.paese}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="citta">
                                            <strong>Città</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="Citta"
                                            value={casaDet.Citta || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.citta && <span className="text-danger">{errors.citta}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="via">
                                            <strong>Via</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="Via"
                                            value={casaDet.Via || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.via && <span className="text-danger">{errors.via}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="prezzo">
                                            <strong>Prezzo</strong>
                                        </label>
                                        <div className="price-input-container">
                                            <span className="currencyinput">€</span>
                                            <input
                                                type="text"
                                                name="Prezzo"
                                                value={casaDet.Prezzo || ''}
                                                onChange={handleChange}
                                                className="form-control rounded-0"
                                            />
                                        </div>
                                        {errors.prezzo && <span className="text-danger">{errors.prezzo}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="immagine">
                                            <strong>Immagine Copertina</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="ImageURL"
                                            value={casaDet.ImageURL || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        />
                                        {errors.immagine && <span className="text-danger">{errors.immagine}</span>}
                                    </div>
                                    <div className="login-form-group">
                                        <label htmlFor="descrizione">
                                            <strong>Descrizione</strong>
                                        </label>
                                        <textarea
                                            name="Descrizione"
                                            value={casaDet.Descrizione || ''}
                                            onChange={handleChange}
                                            className="form-control rounded-0"
                                        ></textarea>
                                        {errors.descrizione && <span className="text-danger">{errors.descrizione}</span>}
                                    </div>
                                    <button type="submit" className="login-btn btn btn-success"> Create </button>
                                </form>
                        </div>
                    </div>
                </main>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default ModificaCasa;
