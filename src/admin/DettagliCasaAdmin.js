import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../Client/DettagliCasa.css';

function DettagliCasaAdmin() {
    const location = useLocation();
    const [casaDet, setCase] = useState({
        PropietarioIm: '',
        AgenteImm: '',
        Paese: '',
        Citta: '',
        Via: '',
        Prezzo: '',
        Descrizione: '',
        Immagini: []
    });
    const [agenti, setAgenti] = useState([]);
    const [interImage, setImage] = useState([]);
    const [enlargedImage, setEnlargedImage] = useState(null);

    React.useEffect(() => {
        if (localStorage.getItem('userName')==="logout" || !(localStorage.getItem('userName'))) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            //agente immobiliare
            const searchParams1 = new URLSearchParams(location.search);
            const agentId = searchParams1.get('agentId');
            axios.get('http://localhost:8081/Client/listaAgente', {
                params: {
                    Id_agente: agentId
                }
            }).then(resp => {
                if(resp.data.status === "Success") {
                    setAgenti(resp.data.agente[0]);
                    
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

                //query per immagini interni casa
                axios.get('http://localhost:8081/Client/getImage', {
                    params: {
                        singleHouseId: casaId
                    }
                }).then(response => {
                    if(response.data.status === "Success") {
                        setImage(response.data.moreImage);
                    } else {
                        console.log("Failed to fetch images details");
                    }
                })
                .catch(error => {
                    console.log("Error fetching imags details:", error);
                });

            } else {
                console.log("User ID not found in URL");
            }
        }
    }, [location]);

    // Funzione per gestire il click sull'immagine
    const handleImageClick = (imageSrc) => {
        setEnlargedImage(imageSrc);
    };

    // Funzione per chiudere l'immagine ingrandita
    const closeEnlargedImage = () => {
        setEnlargedImage(null);
    };

    return (
        <>
            <AdBar />
            <br />
            <div>
                {/* Il resto del tuo codice rimane invariato */}
                <div className="horizontal-layout">
                        <img
                            key="img"
                            src={casaDet.ImageURL}
                            alt={`Immagine 0`}
                            className="image"
                            onClick={() => handleImageClick(casaDet.ImageURL)}
                        />
                    {interImage.map((image, index) => (
                        <img
                            key={index}
                            src={image.Nome_file}
                            alt={`Immagine ${isNaN(index) ? "NaN" : index + 1}`}
                            className="image"
                            onClick={() => handleImageClick(image.Nome_file)}
                        />
                    ))}
                </div>
                {/* Codice per l'immagine ingrandita */}
                {enlargedImage && (
                    <div className="enlarged-image-container" onClick={closeEnlargedImage}>
                        <img src={enlargedImage} alt="Immagine ingrandita" className="enlarged-image" />
                    </div>
                )}
                <div className="house-info">
                    <h2 className='info-casa'>Informazioni della Casa:</h2>
                    <p><strong>Nome:</strong> {casaDet.Nome ? casaDet.Nome.charAt(0).toUpperCase() + casaDet.Nome.slice(1) : ''}</p>
                    <p><strong>Paese:</strong> {casaDet.Paese ? casaDet.Paese.charAt(0).toUpperCase() + casaDet.Paese.slice(1) : ''}</p>
                    <p><strong>Città:</strong> {casaDet.Citta ? casaDet.Citta.charAt(0).toUpperCase() + casaDet.Citta.slice(1) : ''}</p>
                    <p><strong>Via:</strong> {casaDet.Via ? casaDet.Via.charAt(0).toUpperCase() + casaDet.Via.slice(1) : ''}</p>
                    <p><strong>Prezzo:</strong> € {parseFloat(casaDet.Prezzo).toFixed(2)}</p>
                    <p><strong>Descrizione:</strong></p><p>{casaDet.Descrizione}</p>
                    <br />
                    <h2 className='info-casa'>Agente Immobiliare</h2>
                    <p><strong>Nome:</strong> {agenti.Nome ? agenti.Nome.charAt(0).toUpperCase() + agenti.Nome.slice(1) : ''}</p>
                    <p><strong>Cognome:</strong> {agenti.Cognome ? agenti.Cognome.charAt(0).toUpperCase() + agenti.Cognome.slice(1) : ''}</p>
                    <p><strong>Email:</strong> {agenti.Email}</p>
                    <p><strong>Numero:</strong> {agenti.Numero_cell}</p>
                    <br />                    
                </div>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default DettagliCasaAdmin;
