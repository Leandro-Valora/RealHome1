import logo from '../components/pic/logo-sm.png';
import './AdBar.css';
import LatWindow from './LatWindow';
import { Link } from 'react-router-dom';

function AdBar() {
    return (
        <>
            <bar className="AdBar">
                <div className="row-no-gutters">
                    <a className="AdBar-brand" href="https://realhome1.netlify.app/">
                        <img src={logo} alt="Logo" width="40" height="40" />
                    </a>
                    <div className="header-1">
                        <ul className="bar bar-tabs">
                            <li className="bar-item">
                                <Link to="/admin/listaAdmin" className="btn btn-outline-primary"> Lista Admin </Link>
                            </li>
                            <li className="bar-item">
                            <Link to="/admin/listaUser" className="btn btn-outline-primary"> Lista User </Link>
                            </li>
                            <li className="bar-item">
                            <Link to="/admin/listaCase" className="btn btn-outline-primary"> Lista Case </Link>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div className="header-2">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Citta'" aria-label="Search" />
                            <p></p>
                            <input className="form-control me-2" type="search" placeholder="indirizzo" aria-label="Search" />
                            <p></p>
                            <input className="form-control me-2" type="search" placeholder="range di prezzo" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>      
                </div>
            </bar>
            <LatWindow />
        </>
    );
}

export default AdBar;
