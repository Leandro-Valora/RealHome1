import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from "axios";
import './Signup.css'; // Aggiunto l'import per lo stile del signup
import logoEsteso from './components/pic/logo.png';

function Signup() {
    
    const[values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [validationPerformed, setValidationPerformed] = useState(false);

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    useEffect(() => {
        if (validationPerformed) {
            const handleValidation = () => {
                if (errors.name === "" && errors.email === "" && errors.password === "") {
                    axios.post("https://back-kings-home.onrender.com/signup", values).then(res => {
                    navigate("/");
                })
                    .catch(err => console.log(err));
                }
                else {
                    console.log("some type Error!");
                }
            };
            handleValidation();
        }
    }, [errors, navigate, validationPerformed, values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        setValidationPerformed(true);
    };

    return (
        <>
        <br />
        <a href='/'><img src={logoEsteso} className="logo-esteso" alt="Logo Esteso" /></a>  
        <br />
        <div className='signup-form-container'>
            <div className='signup-form'>
                <h2> Sign-up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='signup-form-group'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' placeholder='name' className='form-control rounded-0' 
                        name='name' onChange={handleInput} />
                        {errors.name && <span className='text-danger'> {errors.name} </span>}
                    </div>
                    <div className='signup-form-group'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='email@email.it' className='form-control rounded-0' 
                        name='email' onChange={handleInput}/>
                        {errors.email && <span className='text-danger'> {errors.email} </span>}
                    </div>
                    <div className='signup-form-group'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='enter password' className='form-control rounded-0' 
                        name='password' onChange={handleInput} />
                        {errors.password && <span className='text-danger'> {errors.password} </span>}
                    </div>
                    <button type='submit' className='signup-btn btn btn-success w-100 rounded-0'>Signup</button>
                    <p>You are agree with our policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
        <footer style={{ marginTop: '50px' }}>
                <small><center>&copy; {new Date().getFullYear()} Agenzia Immobiliare Real-Home. Tutti i diritti riservati. </center></small>
            </footer>
        </>
    )
}

export default Signup;
