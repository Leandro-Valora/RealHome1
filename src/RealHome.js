import React, { Component } from 'react';
import './RealHome.css';
import Navbar from './components/Navbar';
import Offers from './components/Offers';
import Footer from './components/Footer';
import logoEsteso from './components/pic/logo.png';
import UserProfile from './UserProfile';

class RealHome extends Component {
    state = {
        footers: [
            { id: 0, indirizzo: 'Parma, PR 43122, IT', email: 'infoaboutRH@gmail.com', telefono: '+39 0375 833639', cellulare: '+39 345 6139884', brand: 'Real - Home'}        
        ]
    }
    
    componentDidMount() {
        if((UserProfile.getType() && !(localStorage.getItem('userType')==="logout"))) {
            if (localStorage.getItem('userType') === "Admin") {
                window.location.href = "/admin/admin";
            } else {
                if(localStorage.getItem('userType') === "Signup") {
                    window.location.href = "/Client/homeClient";
                }
                else {
                    window.location.href = "/agente/homeAgente";
                }
            }
        } else {
            return;
        }
    }
    render() {
        return (
            <>
                <Navbar />
                <div className="image-header-container">
                    <img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" />
                    <h3 className='subtitle'>Alcune case speciali ...</h3>
                </div>
                <Offers />
                {UserProfile.setName("generic")}
                {this.state.footers.map(footer => (
                    <Footer
                        key={footer.id}
                        footer={footer} />
                ))}
            </>
        );
    }
}

export default RealHome;
