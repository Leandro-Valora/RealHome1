import React, { useState, useEffect } from 'react';
import AgenteBar from './AgenteBar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';
import "../Client/HomeClient.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

function InfoAgente() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                
                if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
                    // Reindirizza l'utente alla pagina principale se il nome è vuoto
                    window.location.href = "/";
                } else {
                    // Effettua la chiamata al backend per ottenere le informazioni dell'utente
                    const valoreId = localStorage.getItem('aId');
                    const response = await axios.get('http://localhost:8081/Client/listaAgente', {
                        params: {
                            Id_agente: valoreId
                        }
                    });

                    if (response.data.status === "Success") {
                        setUserInfo(response.data.agente[0]);
                        //console.log(" --> " + JSON.stringify(response.data));
                    } else {
                        console.log("Failed to fetch user info");
                    }
                }
            } catch (error) {
                console.log("Error fetching user info:", error);
            }
        }

        fetchUserInfo();
    }, []);

    return (
        <>
            <AgenteBar />
            <br />
            <div>
                <div className="container-1">
                    <Link to="/Client/homeClient"><img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" /> </Link>
                    <h2 className='titolo-2'><center>Informazioni Personali</center></h2>
                </div>
                <br />
                <main className='main-content'>
                    {userInfo && (
                        <div className="user-info">
                            <p><strong>Nome:</strong> {userInfo.Nome.charAt(0).toUpperCase() + userInfo.Nome.slice(1)}</p>
                            <p><strong>Cognome:</strong> {userInfo.Cognome.charAt(0).toUpperCase() + userInfo.Cognome.slice(1)}</p>
                            <p><strong>Numero:</strong> {userInfo.Numero_cell}</p>
                            <p><strong>Email:</strong> {userInfo.Email}</p>
                            <p><strong>Password:</strong> {userInfo.Password.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('')}</p>
                        </div>
                    )}
                    <br />
                    <div className="button-container">
                        <Link to={`/agente/modificaAgent?agentId=${localStorage.getItem('aId')}`}><button>Aggiorna info</button></Link>
                    </div>
                </main>
            </div>
            <div>
                <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
            </div>
        </>
    );
}

export default InfoAgente;
