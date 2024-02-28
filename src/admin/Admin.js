import React from 'react';
import AdBar from '../admin/AdBar.js';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
//import "./Admin.css";
import villa1 from "../ville/avi.jpg";
import villa2 from "../ville/dinuka.jpg";
import villa3 from "../ville/fern.jpg";

class Admin extends React.Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ]
    }

    componentDidMount() {
        const userName = UserProfile.getName();
        if (!userName || userName.trim() === "") {
            // Reindirizza l'utente alla pagina principale se il nome è vuoto
            window.location.href = "/";
        }
    }

    render() {
        return (
            <>
            <p>Prova1</p>
                <AdBar />
                <br />
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Benvenuti all'Agenzia Immobiliare Real-Home</center></h1>
                    </header>
                    <br />
                    <main>
                        <section>
                            <h2>Ultime Proprietà Vendute </h2>
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
                            </div>
                        </section>
                    </main>
                </div>
                {/* FINE */}
                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default Admin;
