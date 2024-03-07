import React, { Component } from 'react';
import '../RealHome.css';
import ClientBar from './components/ClientBar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';
import "./HomeClient.css";
import UserProfile from '../UserProfile';
import villa1 from "../ville/avi.jpg";
import villa2 from "../ville/dinuka.jpg";
import villa3 from "../ville/fern.jpg";
import villa4 from "../ville/frames.jpg";
import villa5 from "../ville/gonzalez.jpg";
import villa6 from "../ville/james.jpg";

class HomeClient extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ]
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if (!userName || userName.trim() === "generic") {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
    }
    
    render() {
        // Se l'utente è già reindirizzato, non renderizzare nulla
        if (UserProfile.getName() ==="generic" || UserProfile.getName()==="logout") {
            return null;
        }

        return (
            <>
                <ClientBar />
                <br />
                <center><img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" /></center>  
                <br />        
                {/* QUI CODICE per pagina specifica  */}
                
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Benvenuti all'Agenzia Immobiliare Real-Home</center></h1>
                    </header>
                    <br />
                    <main>
                        <section>
                            <h2>Ultime Proprietà Vendute... </h2>
                            <div className="property-gallery">
                                <div className="property">
                                    <img src={villa1} alt="Property 1" />
                                    <h3>Villa marea</h3>
                                    <p>grande dimora, di proprietà del signor berlusconi</p>
                                    <p><b>Prezzo</b> : &euro; 5.500.000</p>
                                </div>
                                <div className="property">
                                    <img src={villa2} alt="Property 2" />
                                    <h3>Villa arcore</h3>
                                    <p>Descrizione della proprietà</p>
                                    <p><b>Prezzo</b> : &euro; 5.500.000</p>
                                </div>
                                <div className="property">
                                    <img src={villa3} alt="Property 3" />
                                    <h3>Villetta schiera New York</h3>
                                    <p>Descrizione della proprietà</p>
                                    <p><b>Prezzo</b> : &euro; 10.500.000</p>
                                </div>
                                <div className="property">
                                    <img src={villa5} alt="Property 5" />
                                    <h3>Villa Santorini</h3>
                                    <p>Descrizione della proprietà</p>
                                    <p><b>Prezzo</b> : &euro; 3.500.000</p>
                                </div>
                                <div className="property">
                                    <img src={villa6} alt="Property 6" />
                                    <h3>Villa Toscana Serenità</h3>
                                    <p>Descrizione della proprietà</p>
                                    <p><b>Prezzo</b> : &euro; 9.567.000</p>
                                </div>
                                <div className="property">
                                    <img src={villa4} alt="Property 7" />
                                    <h3>Casa Maya Sol</h3>
                                    <p>Descrizione della proprietà</p>
                                    <p><b>Prezzo</b> : prezzo riservato </p>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default HomeClient;
