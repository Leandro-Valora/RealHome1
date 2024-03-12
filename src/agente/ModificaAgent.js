import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import axios from 'axios';
import AgenteBar from './AgenteBar';

function ModificaAgent() {
    const location = useLocation();
    const [agentDet, setAgent] = React.useState({
        Nome: '',
        Email: '',
        Cognome: '',
        Password: '',
        Numero_cell: '',
        Id_agente:''
    });
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errors] = React.useState({
        nome: '',
        cognome: '',
        email: '',
        Numero_cell: '',
        password: ''
    });

    React.useEffect(() => {
        const userName = UserProfile.getName();
        if ((!userName || userName.trim() === "generic") && !(localStorage.getItem('userName'))) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            const searchParams = new URLSearchParams(location.search);
            const userId = searchParams.get('agentId');
            if (userId) {
                //dettagli dell'agente utilizzando l'ID recuperato dall'URL
                axios.get('http://localhost:8081/agente/getAgentDetails', {
                    params: {
                        agenteId: userId
                    }
                }).then(response => {
                    if(response.data.status === "Success") {
                        setAgent(response.data.agentDetails[0]);
                    } else {
                        console.log("Failed to fetch agent details");
                    }
                })
                .catch(error => {
                    console.log("Error fetching agent details:", error);
                });
            } else {
                console.log("agent ID not found in URL");
            }
        }
    }, [location]);
    
    

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!Object.values(agentDet).some(value => value === "")) {
            console.log("agentdet: " + JSON.stringify(agentDet));
            axios.post('http://localhost:8081/agente/modificaAgente', agentDet)
            .then(response => {
                if(response.data.status === "Success") {
                    UserProfile.setName(agentDet.Name);
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
        setAgent(prevAgentDet => ({
            ...prevAgentDet,
            [name]: value
        }));
    };
    
    return (
        <>
            <AgenteBar />
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
                                        name="Nome"
                                        value={agentDet.Nome || ''}
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
                                        value={agentDet.Cognome || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.cognome && <span className="text-danger">{errors.cognome}</span>}
                                </div>
                                <div className="login-form-group">
                                    <label htmlFor="numero_cell">
                                        <strong>Numero</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="Numero_cell"
                                        value={agentDet.Numero_cell || ''}
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
                                        value={agentDet.Email || ''}
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
                                        value={agentDet.Password || ''}
                                        onChange={handleChange}
                                        className="form-control rounded-0"
                                    />
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                                <button type="submit" className="login-btn btn btn-success"> Modifica </button> 
                                <Link to="/agente/infoAgente"><button className="login-btn btn"> Indietro </button></Link>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default ModificaAgent;
