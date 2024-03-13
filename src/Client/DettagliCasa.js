import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClientBar from './components/ClientBar';
import Footer from '../components/Footer';
import axios from 'axios';
import './DettagliCasa.css';

function DettagliCasa() {
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
    const [showHouseForm, setShowHouseForm] = useState(false);
    const [formData, setFormData] = useState({
        titolo: '',
        descrizione: ''
    });

    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);

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

    // Funzione per mostrare/nascondere il form
    const toggleHouseForm = () => {
        setShowHouseForm(!showHouseForm);
    };

    // Funzione per gestire l'invio del modulo
    const handleSubmit = (event) => {
        event.preventDefault();
        const searchParams1 = new URLSearchParams(location.search);
        const agentId = searchParams1.get('agentId');
        const email = localStorage.getItem('emailId');
        const titoloCompleto = formData.titolo + " X " + casaDet.Nome;

        setShowError(false);
        setShowMessage(false);

        // Controllo se i campi del modulo non sono vuoti
        if (formData.titolo.trim() === '' || formData.descrizione.trim() === '') {
            setShowError(true);
            return; // Non inviare il modulo se i campi sono vuoti
        }
        
        axios.post('http://localhost:8081/Client/InviaMessaggio', {
            Email_richiedente: email,
            Id_agente: agentId,
            Titolo: titoloCompleto,
            Descrizione_msg: formData.descrizione
        })
        .then(response => {
            console.log('Email inviata con successo:');
            setShowMessage(true);
        })
        .catch(error => {
            console.error('Errore durante l\'invio dell\'email:', error);
            setShowError(true);
        });
    };

    // Funzione per aggiornare lo stato del modulo
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <ClientBar />
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
                    <h2 className='info-casa puntatore' onClick={toggleHouseForm}>Scrivimi per più info &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</h2>
                    <div className="house-form" style={{ display: showHouseForm ? 'block' : 'none' }}>
                    <p>{showMessage && <span className="text-success">{formData.titolo} : inviato con successo</span>}</p>
                    <p>{showError && <span className="text-danger">Errore invio messaggio</span>}</p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="titolo">Oggetto:</label><br />
                            <input type="text" id="titolo" placeholder='Richiesta info...' name="titolo" value={formData.titolo} onChange={handleChange} /><br />
                            <label htmlFor="descrizione">Messaggio:</label><br />
                            <textarea id="descrizione" placeholder='Vorrei fissare un appuntamento per...' name="descrizione" rows="4" cols="50" value={formData.descrizione} onChange={handleChange}></textarea><br />
                            <input type="submit" value="Invia" />
                        </form>
                    </div>
                    
                </div>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default DettagliCasa;
