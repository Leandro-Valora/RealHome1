function Validation(values) {

    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if(values.email === "") {
        error.email = "il Nome è vuoto";
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "email errata !";
    }
    else {
        error.email = "";
    }

    if(values.password === "") {
        error.password = "Password è vuota";
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "password errata !";
    }
    else {
        error.password = "";
    }
    return error;
}

export default Validation;