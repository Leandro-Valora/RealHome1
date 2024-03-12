import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import UserProfile from './UserProfile';
import logoEsteso from './components/pic/logo.png';
import './Login.css';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        const checkLoggedIn = () => {
            if (UserProfile.getName()==="generic" || UserProfile.getName()==="logout") {
                navigate("/Login"); // Reindirizzo alla pagina principale se l'utente è già loggato
            }
            else {
                if(UserProfile.getType() === "Admin") {
                    navigate("/admin/Admin");
                }
                else {
                    navigate("/Client/homeClient");
                }
            }
        };

        checkLoggedIn(); // Controllo del login al primo render
    }, [navigate]); // useEffect si attiva solo al primo render, equivalente a componentDidMount

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        
        if (validationErrors.email === "" && validationErrors.password === "") {
            axios.post("http://localhost:8081/login", values) //https://back-kings-home.onrender.com
            .then(res => {
                if (res.data.status === "Success") {
                    const nameUser = res.data.name;
                    const typeUser = res.data.type;
                    UserProfile.setName(nameUser);
                    UserProfile.setType(typeUser);
                    localStorage.removeItem('userName');    //svuoto contenuto
                    localStorage.setItem('userName', nameUser);
                    localStorage.setItem('userType', typeUser);

                    if(res.data.type === "Admin") {
                        navigate("/admin/Admin");
                    }
                    else if(res.data.type === "Signup") {
                        const idUser = res.data.Id_signup;
                        UserProfile.setId(idUser);
                        localStorage.setItem('userId', idUser);
                        //set email user
                        const emailUser = res.data.email;
                        localStorage.setItem('emailId', emailUser);
                        navigate("/Client/homeClient");
                    }
                    else {
                        const idAgente = res.data.Id_signup;
                        localStorage.setItem('aId', idAgente);
                        navigate("/agente/homeAgente");
                    }
                } else {
                    console.log("Riprova ancora dai...");
                    setLoginError(true);
                }
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <>
            <br />
            <a href='/'><img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" /></a>  
            <br />
            <div className="login-form-container">
                <div className="login-form">
                    <h2>Login</h2>
                    <p>{loginError && <span className="text-danger">Errore credenziali, Riprova.</span>}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form-group">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="enter email"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="enter password"
                                id="password"
                                name="password"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <button type="submit" className="login-btn btn btn-success">
                            Login
                        </button>
                        <p>You are agree with our policies</p>
                        <Link to="/Signup" className="btn btn-default">
                            Create account
                        </Link>
                    </form>
                </div>
            </div>
            <footer style={{ marginTop: '50px' }}>
                <small><center>&copy; {new Date().getFullYear()} Agenzia Immobiliare Real-Home. Tutti i diritti riservati.</center></small>
            </footer>
        </>
    );
}

export default Login;
