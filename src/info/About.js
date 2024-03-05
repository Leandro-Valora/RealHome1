import React, { Component } from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';
import office from './office.png';

class About extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ]
    }
    render() {
        return (
            <>
                <Navbar />
                <div className="image-header-container">
                    <img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" />
                    <h3>Chi siamo ? </h3>
                </div>
                <div className='about-txt'>
                <img src={office} className="luxury-real-estate-img" alt="Ufficio" />
                    <div className='about-txt-right'>
                    Benvenuti a <i>Real-Home</i>, dove il lusso incontra l'eleganza senza compromessi nel mondo immobiliare. <br /> 
                    Siamo più di un semplice intermediario immobiliare; siamo custodi di storie straordinarie e custodi di visioni uniche. <br />
                    La nostra storia inizia con una passione condivisa per l'eccellenza e la bellezza senza tempo. <br />
                    Da quando abbiamo aperto le nostre porte, abbiamo costruito una reputazione impeccabile nel mercato del lusso, offrendo ai nostri clienti un servizio personalizzato e una selezione ineguagliabile di proprietà straordinarie in tutto il mondo. <br />
                    Ogni residenza che presentiamo rappresenta non solo un'opportunità di investimento, ma anche un'esperienza di vita senza pari. Dalle ville 
                    Dalle ville private nascoste tra le colline alla magnificenza delle dimore urbane, ogni proprietà riflette il nostro impegno per l'eccellenza e la nostra dedizione a superare le aspettative dei nostri clienti più esigenti. <br />
                    Ma più di ogni singola proprietà, siamo fieri della nostra capacità di capire e realizzare i sogni dei nostri clienti. <br />
                    Ogni transazione è intrisa di cura, attenzione ai dettagli e un impegno incondizionato per la soddisfazione del cliente. Siamo qui per guidarvi attraverso ogni passo del processo, fornendo consulenza esperta e risorse senza pari per garantire un'esperienza senza precedenti nel mondo del lusso immobiliare. <br />
                    Unisciti a noi mentre trasformiamo i tuoi sogni in realtà e ti guidiamo attraverso il mondo affascinante delle proprietà di lusso. Siamo pronti ad accogliervi nel nostro mondo di eleganza, raffinatezza e stile senza tempo.
                    Benvenuti a <i>Real-Home</i>, dove il lusso è una forma d'arte e ogni residenza è una testimonianza della bellezza eterna.    
                    </div>
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

export default About;
