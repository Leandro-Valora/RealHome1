import logo from '../../components/pic/logo-sm.png';
import LatClientWindow from './LatClientWindow';
import { Link } from 'react-router-dom';
import './ClientBar.css';

function ClientBar() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const paese = event.target.paese.value;
        const citta = event.target.citta.value;
        const rangePrezzo = event.target.rangePrezzo.value;

        if (paese || citta || rangePrezzo) {
            window.location.href = `/Client/homesearch?paese=${paese}&citta=${citta}&rangePrezzo=${rangePrezzo}`;
        }
    };

    return (
        <>
            <nav className="clientBar">
                <div className="row-no-gutters">
                    <a className="clientBar-brand" href="https://realhome1.netlify.app/">
                        <img src={logo} alt="Logo" width="40" height="40" />
                    </a>
                    <div className="header-1">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link to="/Client/homeClient" className="btn btn-outline-primary"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/info/about" className="btn btn-outline-primary"> About </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/info/contatti" className="btn btn-outline-primary"> Contatti </Link>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div className="header-2">
                        <form onSubmit={handleSubmit}>
                            <div className="search-inputs"> 
                                <input className="form-control me-2" type="search" name="paese" placeholder="Paese" aria-label="Search" />
                                <input className="form-control me-2" type="search" name="citta" placeholder="Citta'" aria-label="Search" />
                                <input className="form-control me-2" type="search" name="rangePrezzo" placeholder="Range Prezzo da 0 a" aria-label="Search" />
                            </div>
                            <button className="btn btn-outline-success" type="submit" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>      
                </div>
            </nav>
            <LatClientWindow />
        </>
    );
}

export default ClientBar;
