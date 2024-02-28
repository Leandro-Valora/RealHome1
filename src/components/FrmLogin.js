import { Link } from 'react-router-dom';
function FrmLogin() {
    return (
        <>  
            <div className="offcanvas-login">
                <div className= "col">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </div>
                <div className="container" id= "Login">
                    <h3><strong>Dashboard</strong></h3>                        
                    <div className="form-outline form-white mb-4">
                    <Link to="/Login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </div>
                <br />
                        <div className="form-outline form-white mb-4">
                        <p className="mb-0">Don't have an account? <Link to="/Signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create account</Link></p>
                    </div>   
                </div>
            </div>
        </>
    );
}

export default FrmLogin;