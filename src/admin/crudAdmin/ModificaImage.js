import React, { useState, useEffect } from 'react';
import AdBar from '../AdBar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ModificaImage = () => {
    const [Images, setImages] = useState([]);
    const [imageToDelete, setImageToDelete] = useState(null);

    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            if (location) {
                const searchParams = new URLSearchParams(location.search);
                const casaId = searchParams.get('casaId');

                axios.post('http://localhost:8081/admin/listImage', { casaId })
                .then(response => {
                    if(response.data.status === "Success") {
                        if (Array.isArray(response.data.listImage)) {
                            setImages(response.data.listImage);
                        } else {
                            console.log("Images data is not an array");
                        }
                    } else {
                        console.log("Failed to fetch Images");
                    }
                })
                .catch(error => {
                    console.log("Error fetching Images:", error);
                });
            }
        }
    }, [location]);


    const confirmDeleteCasa = () => {
        const imageId = imageToDelete.Id_immagine;
        if(imageId) {
            axios.post('http://localhost:8081/admin/ImageDelete', { Id_immagine: imageId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Rimuovi l'immagine eliminata dallo stato delle immagini
                    const updatedImages = Images.filter(img => img.Id_immagine !== imageToDelete.Id_immagine);
                    setImages(updatedImages);
                    // Resetta l'immagine da eliminare
                    setImageToDelete(null);
                } else {
                    console.log("Failed to delete case");
                }
            })
            .catch(error => {
                console.log("Error deleting case:", error);
            });
        } 
    }

    const handleDeleteImage = (img) => {
        setImageToDelete(img);
    }
    
    const cancelDelete = () => {
        setImageToDelete(null);
    }
    
    return (
        <>
            <AdBar />
            <br />
            <div>
                <header>
                    <h1 className='titolo-1'><center>Elimina immagini casa</center></h1>
                </header>
                <br />
                <main>
                    <br />
                    <h3 className='h3-tabella'><strong>Tabella Immagini casa</strong></h3>
                    <table className="table-lista">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col" className="stretta">IMMAGINE</th>
                            <th scope="col"><center>ELIMINA</center></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(Images) && Images.map(img => (
                            <tr key={img.Id_immagine}>
                                <th scope="row">{img.Id_immagine}</th>
                                <td className="stretta">
                                    <img src={img.Nome_file} style={{ maxWidth: '180px', maxHeight: '140px', height: 'auto' }} alt="Immagine" />
                                </td>
                                <td><center>
                                    <button onClick={() => handleDeleteImage(img)}>Elimina</button>
                                </center></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <h4><Link to="/admin/listaCase"> &nbsp; &#8612; Indietro</Link></h4>
                </main>
            </div>

            {imageToDelete && (
                <div className="popup">
                    <div className="popup-inner">
                        <p>Sei sicuro di voler eliminare l'immagine ?</p>
                        <button onClick={confirmDeleteCasa}>Conferma</button>
                        <button onClick={cancelDelete}>Annulla</button>

                    </div>
                </div>
            )}
            
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default ModificaImage;
