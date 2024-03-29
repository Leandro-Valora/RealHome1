import logo from '../components/pic/logo-sm.png';
import './AdBar.css';
import LatWindow from './LatWindow';
import { Link } from 'react-router-dom';

function AdBar() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const paese = event.target.paese.value;
        const citta = event.target.citta.value;
        const rangePrezzo = event.target.rangePrezzo.value;

        if (paese || citta || rangePrezzo) {
            window.location.href = `/admin/homesearch?paese=${paese}&citta=${citta}&rangePrezzo=${rangePrezzo}`;
        }
    };


    return (
        <>
            <nav className="navbar">
                <div className="row-no-gutters">
                    <a className="AdBar-brand" href="/admin/admin">
                        <img src={logo} alt="Logo" width="40" height="40" />
                    </a>
                    <div className="header-1">
                        <ul className="nav nav-tabs">
                        <li className="nav-item">
                                <Link to="/admin/admin" className="btn btn-outline-primary"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/listaAdmin" className="btn btn-outline-primary"> Lista Admin </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/listaUser" className="btn btn-outline-primary"> Lista User </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/listaCase" className="btn btn-outline-primary"> Lista Case </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/listaAgente" className="btn btn-outline-primary"> Lista Agente </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/listaPropietario" className="btn btn-outline-primary"> Lista Proprietario Casa </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/caseVendute" className="btn btn-outline-primary"> Case Vendute </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/listaContatti" className="btn btn-outline-primary"> Tickets </Link>
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

                                <button className="btn btn-outline-success" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" style={{ color: 'white' }}>
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>      
                </div>
            </nav>
            <LatWindow />
        </>
    );
}

export default AdBar;
