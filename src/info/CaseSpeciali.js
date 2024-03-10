import React, { Component } from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoEsteso from '../components/pic/logo.png';
import cartello from './img/cartelloSito.jpg';

class CaseSpeciali extends Component {
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
                    <h3>Affidati a noi per la tua casa di lusso</h3>
                </div>
                <div className='about-txt'>
                <img src={cartello} className="luxury-real-estate-img" alt="Ufficio" />
                    <div className='about-txt-right'>
                    Benvenuto a <i>Real Home</i> dedicata alla vendita di proprietà di lusso, dove il tuo sogno di vendere la tua casa lussuosa diventa realtà. 
                    Se stai cercando un partner affidabile e competente per aiutarti a mettere in vendita la tua villa esclusiva, un attico, o qualche importante propietà immobiliare sei nel posto giusto.
                    Qui da noi, comprendiamo l'importanza e il valore delle proprietà di lusso come la tua. La tua villa non è solo una casa, ma un'opera d'arte architettonica, un'oasi di comfort e stile che merita di essere presentata al mondo nel modo più magnifico possibile.
                    Il nostro team di esperti è dedicato a offrirti un servizio personalizzato e di alta qualità che si adatta alle tue esigenze uniche. Dalla valutazione accurata del valore della tua proprietà alla creazione di una strategia di marketing su misura, ci assicureremo che il processo di vendita della tua villa sia fluido e gratificante.
                    Con la nostra comprovata esperienza nel settore immobiliare di lusso, abbiamo costruito una rete globale di acquirenti qualificati e investitori interessati alle proprietà di prestigio come la tua. Approfittando delle ultime tecnologie, inclusa la nostra pagina web basata su React.js,
                    garantiamo una visibilità ottimale per la tua villa, raggiungendo potenziali acquirenti in tutto il mondo.
                    Affidati a noi per trasformare il tuo sogno di vendere la tua casa lussuosa in una realtà senza stress e con risultati straordinari.
                     Contattaci oggi stesso per una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi di vendita.    
                    <br />
                    Se sei interessato scrivi un email direttamente al proprietario di RealHome : <b>A.iccardo.R.leandro@gmail.com</b>.
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

export default CaseSpeciali;
