import React, { useState, useEffect } from 'react';
import ClientBar from './components/ClientBar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';
import "./HomeClient.css";
import UserProfile from '../UserProfile';
import axios from 'axios';
import { Link } from 'react-router-dom';

function InfoClient() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userName = UserProfile.getName();
                if ((!userName || userName.trim() === "generic") && !localStorage.getItem('userName')) {
                    // Reindirizza l'utente alla pagina principale se il nome è vuoto
                    window.location.href = "/";
                } else {
                    // Effettua la chiamata al backend per ottenere le informazioni dell'utente
                    const valoreId = localStorage.getItem('userId');
                    const response = await axios.get('http://localhost:8081/Client/InfoClient', {
                        params: {
                            Id_signup: valoreId
                        }
                    });
                    if (response.data.status === "Success") {
                        // Aggiorna lo stato con le informazioni dell'utente ottenute dal backend
                        setUserInfo(response.data.uData[0]);
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
            <ClientBar />
            <br />
            <div>
                <div className="container-1">
                    <Link to="/Client/homeClient"><img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" /> </Link>
                    <h2 className='titolo-2'><center>Info Personali</center></h2>
                </div>
                <br />
                <main className='main-content'>
                    {userInfo && (
                        <div className="user-info">
                            <p><strong>Nome:</strong> {userInfo.Name.charAt(0).toUpperCase() + userInfo.Name.slice(1)}</p>
                            <p><strong>Email:</strong> {userInfo.Email}</p>
                            <p><strong>Password:</strong> {userInfo.Password.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('')}</p>
                        </div>
                    )}
                    <br />
                    <div className="button-container">
                        <Link to={`/Client/modificaClient?userId=${UserProfile.getId()}`}><button>Aggiorna info</button></Link>
                    </div>
                </main>
            </div>
            <div>
                <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
            </div>
        </>
    );
}

export default InfoClient;
