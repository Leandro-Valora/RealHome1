function ValidationEmail(values) {

    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cell_pattern = /^[0-9]+$/;
    
    if(values.email === "") {
        error.email = "campo email vuoto";
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "email errata !";
    }
    else {
        error.email = "";
    }

    if(values.numero_cell === "") {
        error.numero_cell = "campo tel vuoto";
    }
    else if(!cell_pattern.test(values.numero_cell)) {
        error.numero_cell = "tel errato !";
    }
    else {
        error.numero_cell = "";
    }

    if(values.nome === "") {
        error.nome = "campo nome vuoto";
    }

    if(values.cognome === "") {
        error.cognome = "campo cognome vuoto";
    }

    return error;
}

export default ValidationEmail;