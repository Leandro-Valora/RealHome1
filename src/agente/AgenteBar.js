import logo from '../components/pic/logo-sm.png';
import LatAgentWindow from './LatAgentWindow';
import { Link } from 'react-router-dom';
import '../Client/components/ClientBar.css';

function AgenteBar() {
    return (
        <>
            <nav className="clientBar">
                <div className="row-no-gutters">
                    <a className="clientBar-brand" href="/">
                        <img src={logo} alt="Logo" width="40" height="40" />
                    </a>
                    <div className="header-1">
                        <ul className="nav nav-tabs">
                        <li className="nav-item">
                                <Link to="/agente/homeAgente" className="btn btn-outline-primary"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/agente/infoAgente" className="btn btn-outline-primary"> Info personali </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/agente/case" className="btn btn-outline-primary"> Lista Case </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/agente/messaggi" className="btn btn-outline-primary"> Messaggi Ricevuti </Link>
                            </li>
                        </ul>
                    </div>
                    <br />
                </div>
            </nav>
            <LatAgentWindow />
        </>
    );
}

export default AgenteBar;
