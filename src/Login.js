// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './LoginValidation';
// import axios from 'axios';
// import UserProfile from './UserProfile';
// import logoEsteso from './components/pic/logo.png';
// import './Login.css';

// function Login() {

//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});
//     const [loginError, setLoginError] = useState(false);

//     // Controllo se l'utente è già loggato
//     // Restituisco null per evitare renderizzazione
//     if (UserProfile.getName()) {
//         navigate("/"); 
//         return null;
//     }

//     const handleInput = (event) => {
//         setValues(prev => ({...prev, [event.target.name]: event.target.value}));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const validationErrors = Validation(values);
//         setErrors(validationErrors);
        
//        // Controllo solo se non ci sono errori di validazione
//         if (validationErrors.email === "" && validationErrors.password === "") {
//             axios.post("https://back-kings-home.onrender.com/login", values)
//             //axios.post("http://localhost:8081/login", values)
//                 .then(res => {
//                     //console.log("status --> " + res.data);
//                     if (res.data.status === "Success") {
//                         const nameUser = res.data.name; // res.data contiene la risposta JSON dal server
//                         UserProfile.setName(nameUser);
//                         navigate("/admin/Admin");
//                     } else {
//                         console.log("Riprova ancora dai...");
//                         setLoginError(true);
//                     }
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     return (
//         <>
//             <br />
//             <a href='/'><img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" /></a>  
//             <br />
//             <div className="login-form-container">
//                 <div className="login-form">
//                     <h2>Login</h2>
//                     <p>{loginError && <span className="text-danger">Errore credenziali, Riprova.</span>}</p>
//                     <form onSubmit={handleSubmit}>
//                         <div className="login-form-group">
//                             <label htmlFor="email">
//                                 <strong>Email</strong>
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="enter email"
//                                 onChange={handleInput}
//                                 className="form-control rounded-0"
//                             />
//                             {errors.email && <span className="text-danger">{errors.email}</span>}
//                         </div>
//                         <div className="login-form-group">
//                             <label htmlFor="password">
//                                 <strong>Password</strong>
//                             </label>
//                             <input
//                                 type="password"
//                                 placeholder="enter password"
//                                 id="password"
//                                 name="password"
//                                 onChange={handleInput}
//                                 className="form-control rounded-0"
//                             />
//                             {errors.password && <span className="text-danger">{errors.password}</span>}
//                         </div>
//                         <button type="submit" className="login-btn btn btn-success">
//                             Login
//                         </button>
//                         <p>You are agree with our policies</p>
//                         <Link to="/Signup" className="btn btn-default">
//                             Create account
//                         </Link>
//                     </form>
//                 </div>
//             </div>
//             <footer style={{ marginTop: '50px' }}>
//                 <small><center>&copy; {new Date().getFullYear()} Agenzia Immobiliare Real-Home. Tutti i diritti riservati.</center></small>
//             </footer>
//         </>
//     );
    
// }

// export default Login;

import React, { useState, useEffect, useLayoutEffect } from 'react';
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
            if (UserProfile.getName()) {
                navigate("/"); // Reindirizzo alla pagina principale se l'utente è già loggato
            }
        };

        checkLoggedIn(); // Controllo del login al primo render
    }, [navigate]); // useEffect si attiva solo al primo render, equivalente a componentDidMount

    useLayoutEffect(() => {
        const checkLoggedIn = () => {
            if (UserProfile.getName()) {
                navigate("/"); // Reindirizzo alla pagina principale se l'utente è già loggato
            }
        };

        checkLoggedIn(); // Controllo del login ad ogni aggiornamento del layout
    }, [navigate]); // Dipendenza solo da navigate

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
                    UserProfile.setName(nameUser);
                    navigate("/admin/Admin");
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
