import React, { Component } from 'react';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import axios from 'axios';
import "./StileTabella.css";

class CaseVendute extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ],
        CasaSoldToDelete: null
    }

    componentDidMount() {
        if (localStorage.getItem('userName')==="logout" || !localStorage.getItem('userName')) {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        } else {
            // Effettua la chiamata al backend per ottenere gli amministratori
            axios.post('http://localhost:8081/admin/ListaCaseVendute')
            .then(response => {
                if(response.data.status === "Success") {
                    // Aggiorna lo stato con i dati degli amministratori ottenuti dal backend
                    if (Array.isArray(response.data.caseVendute)) {
                        this.setState({ casevendute: response.data.caseVendute });
                      } else {
                        console.log("caseVendute data is not an array");
                      }
                      
                } else {
                    console.log("Failed to fetch caseVendute");
                }
            })
            .catch(error => {
                console.log("Error fetching caseVendute:", error);
            });
        }
    }

    handleDeleteCasaVenduta = (caseVendute) => {
        this.setState({ CasaSoldToDelete: caseVendute });
    }

    confirmDeleteCasaVenduta = () => {
        const vendutaId = this.state.CasaSoldToDelete.Id_venduta;
        axios.post('http://localhost:8081/admin/DeleteCasaVenduta', { Id_venduta: vendutaId })
            .then(resp => {
                if (resp.data.status === "Success") {
                    // Richiama la funzione per ottenere la lista aggiornata degli utenti
                    axios.post('http://localhost:8081/admin/ListaCaseVendute')
                        .then(response => {
                            if(response.data.status === "Success") {
                                if (Array.isArray(response.data.caseVendute)) {
                                    this.setState({ casevendute: response.data.caseVendute, CasaSoldToDelete: null });
                                } else {
                                    console.log("casevendute data is not an array");
                                }
                            } else {
                                console.log("Failed to fetch casevendute");
                            }
                        })
                        .catch(error => {
                            console.log("Error fetching casevendute:", error);
                        });
                } else {
                    console.log("Failed to delete casevendute");
                }
            })
            .catch(error => {
                console.log("Error deleting casevendute:", error);
            });
    }

    render() {
        return (
            <>
                <AdBar />
                <br />                     
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Centro di controllo delle Case Vendute</center></h1>
                    </header>
                    <br />
                    <main>
                        <br />
                        <h3 className='h3-tabella'><strong>Tabella Case da Cancellare</strong></h3>
                        <table className="table-lista">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">VIA</th>
                                <th scope="col">ELIMINA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(this.state.casevendute) && this.state.casevendute.map(venduta => (
                                    <tr key={venduta.Id_venduta}>
                                        <th scope="row">{venduta.Id_venduta}</th>
                                        <td>{venduta.Nome.charAt(0).toUpperCase() + venduta.Nome.slice(1)}</td>
                                        <td>{venduta.Via} </td>
                                        <td>
                                            {/* <button onClick={() => this.handleDeleteCasaVenduta(venduta)}>Elimina</button> */}
                                            <button onClick={() => this.handleDeleteCasaVenduta(venduta)} className={this.state.CasaSoldToDelete ? "" : "opacizzato"}>Elimina</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                {this.state.CasaSoldToDelete && (
                    <div className="popup">
                        <div className="popup-inner">
                            <p>Sei sicuro di voler eliminare la voce ?</p>
                            <button onClick={this.confirmDeleteCasaVenduta}>Conferma</button>
                            <button onClick={() => this.setState({ CasaSoldToDelete: null })}>Annulla</button>
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
export default CaseVendute;