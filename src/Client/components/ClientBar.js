import logo from '../../components/pic/logo-sm.png';
import LatClientWindow from './LatClientWindow';
import { Link } from 'react-router-dom';
import '../../admin/AdBar.css';

function ClientBar() {
    return (
        <>
            <nav className="navbar">
                <div className="row-no-gutters">
                    <a className="AdBar-brand" href="https://realhome1.netlify.app/">
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
                        <div className="search-inputs"> 
                            <input className="form-control me-2" type="search" placeholder="Citta'" aria-label="Search" />
                            <input className="form-control me-2" type="search" placeholder="indirizzo" aria-label="Search" />
                            <input className="form-control me-2" type="search" placeholder="range di prezzo" aria-label="Search" />
                        </div>
                        <button className="btn btn-outline-success" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>      
                </div>
            </nav>
            <LatClientWindow />
        </>
    );
}

export default ClientBar;