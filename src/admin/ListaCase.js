import React, { Component } from 'react';
import AdBar from './AdBar';
import Footer from '../components/Footer';
import UserProfile from '../UserProfile';
import "./Admin.css";

class ListaCase extends Component {
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
                <AdBar />
                <br />     
                {/* QUI CODICE per pagina specifica  */}
                
                <div>
                    <header>
                        <h1 className='titolo-1'><center>Benvenuti in listaCase</center></h1>
                    </header>
                    <br />
                    <main>
                        cose da mettere qui!
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

export default ListaCase;