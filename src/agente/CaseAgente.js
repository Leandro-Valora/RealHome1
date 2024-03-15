import React, { Component } from 'react';
import AgenteBar from './AgenteBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../admin/StileTabella.css";

class CaseAgente extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        casaToSold: null,
        successMessage: ''
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            const aId = localStorage.getItem('aId');
            axios.post('http://localhost:8081/agente/listaCaseXAgente', {
                Id_agente: aId
            }).then(response => {
                if(response.data.status === "Success") {
                    if (Array.isArray(response.data.casexagente)) {
                        this.setState({ caseXAgente: response.data.casexagente });
                    } else {
                        console.log("casexagente data is not an array");
                    }
                } else {
                    console.log("Failed to fetch casexagente");
                }
            })
            .catch(error => {
                console.log("Error fetching casexagente:", error);
            });
        }
    }

    handleSaleHouse = (casa) => {
        this.setState({ casaToSold: casa });
    }

    confirmSaleHouse = () => {
        const houseId = this.state.casaToSold.Id_casa;
        axios.get('http://localhost:8081/agente/AddCasaVenduta', {
            params: {
                Id_casa: houseId
            }
        }).then(resp => {
                if (resp.data.status === "Success") {
                    this.setState({ successMessage: "Messaggio della casa inviato!", casaToSold: null });
                } else {
                    console.log("Failed to delete casexagente");
                }
            })
            .catch(error => {
                console.log("Error deleting casexagente:", error);
            });
    }

    render() {
        return (
            <>
                <AgenteBar />
                <br />                     
                <div>
                <header>
                        <h1 className='titolo-1'><center>Benvenuti nella gestione delle tue case</center></h1>
                    </header>
                    <br />
                    <main>
                        <center><p>{this.state.successMessage && <span className="text-success">{this.state.successMessage}</span>}</p></center>
                        <br />
                        <h3 className='h3-tabella'><strong>Tabella Case</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">VENDITORE</th>
                                <th scope="col">NOME</th>
                                <th scope="col">PAESE</th>
                                <th scope="col">CITTA'</th>
                                <th scope="col">VIA</th>
                                <th scope="col">PREZZO</th>
                                <th scope="col">IMMAGINE (clicca per eliminare)</th>
                                <th scope="col">DESCRIZIONE</th>
                                <th scope="col">VENDUTA?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.caseXAgente) && this.state.caseXAgente.map(casa => (
                                    <tr key={casa.Id_casa}>
                                        <th scope="row">{casa.Id_casa}</th>
                                        <td>{casa.Propietario.charAt(0).toUpperCase() + casa.Propietario.slice(1)}</td>
                                        <td>{casa.Nome.charAt(0).toUpperCase() + casa.Nome.slice(1)}</td>
                                        <td>{casa.Paese.charAt(0).toUpperCase() + casa.Paese.slice(1)}</td>
                                        <td>{casa.Citta.charAt(0).toUpperCase() + casa.Citta.slice(1)}</td>
                                        <td>{casa.Via}</td>
                                        <td>{casa.Prezzo}</td>
                                        <td>
                                            <Link to={`/agente/images?casaId=${casa.Id_casa}`}>
                                                <img src={casa.ImageURL} style={{ maxWidth: '150px' }} alt="Immagine" />
                                            </Link>
                                        </td>
                                        <td>{casa.Descrizione}</td>
                                        <td>
                                            <button onClick={() => this.handleSaleHouse(casa)}>Venduta</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {this.state.casaToSold && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di aver venduto la casa ?</p>
                            <button onClick={this.confirmSaleHouse}>Venduta</button>
                            <button onClick={() => this.setState({ casaToSold: null })}>Annulla</button>
                        </div>
                    </div>
                )}

                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default CaseAgente;