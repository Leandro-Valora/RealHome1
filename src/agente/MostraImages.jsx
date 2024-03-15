import React, { useState, useEffect } from 'react';
import AgenteBar from './AgenteBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const MostraImages = () => {
    const [Images, setImages] = useState([]);
    const [message, setmesage] = useState(false);
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
                            setmesage(false);
                        } else {
                            console.log("Images data is not an array");
                            setmesage(true);
                        }
                    } else {
                        console.log("Failed to fetch Images");
                        setmesage(true);
                    }
                })
                .catch(error => {
                    console.log("Error fetching Images:", error);
                    setmesage(true);
                });
            }
        }
    }, [location]);

    
    return (
        <>
            <AgenteBar />
            <br />
            <div>
                <header>
                    <h1 className='titolo-1'><center>Più mmagini casa</center></h1>
                </header>
                <br />
                <main>
                    <br />
                    <h3 className='h3-tabella'><strong>Tabella Immagini interni</strong></h3>
                    <table className="table-lista">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col" className="stretta">IMMAGINE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(Images) && Images.map((img, index) => (
                            <tr key={img.Id_immagine}>
                                <th scope="row">{index+1}</th>
                                <td className="stretta">
                                    <img src={img.Nome_file} style={{ maxWidth: '180px', maxHeight: '140px', height: 'auto' }} alt="Immagine" />
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    {message && <span className="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nessuna immagine trovata...</span>}
                    <br />
                    <h4>&nbsp;&nbsp;<Link to="/agente/case"> &#8612; Indietro</Link></h4>
                </main>
            </div>
            <Footer footer={{ id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}} />
        </>
    );
}

export default MostraImages;
