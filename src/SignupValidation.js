function Validation(values) {

    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(values.name === "") {
        error.name = "Nome vuoto";
    } else {
        error.name = "";
    }

    if(values.email === "") {
        error.email = "Email vuoto";
    } else if(! email_pattern.test(values.email)) {
        error.email = "email errata !";
    } else {
        error.email = "";
    }

    if(values.password === "") {
        error.password = "Password vuota";
    } else if(! password_pattern.test(values.password)) {
        error.password = "password errata !";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;