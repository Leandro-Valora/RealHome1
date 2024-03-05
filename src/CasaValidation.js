function CasaValidation(values) {

    let error = {}
    
    if(values.proprietario === "") {
        error.proprietario = "campo proprietario vuoto";
    }
    
    if(values.agente === "") {
        error.agente = "campo agente vuoto";
    }

    if(values.paese === "") {
        error.paese = "campo paese vuoto";
    }

    if(values.citta === "") {
        error.citta = "campo citta vuoto";
    }

    if(values.via === "") {
        error.via = "campo via vuoto";
    }

    if(values.prezzo === "") {
        error.prezzo = "campo prezzo vuoto";
    }

    if(values.descrizione === "") {
        error.descrizione = "campo descrizione vuoto";
    }

    return error;
}

export default CasaValidation;