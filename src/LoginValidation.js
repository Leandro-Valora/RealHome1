function Validation(values) {

    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    
    if(values.email === "") {
        error.email = "Email vuota";
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "email errata !";
    }
    else {
        error.email = "";
    }

    if(values.password === "") {
        error.password = "Password vuota";
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "password errata ! Deve essere min 8 e max 30 caratteri alfanumerici";
    }
    else {
        error.password = "";
    }
    return error;
}

export default Validation;