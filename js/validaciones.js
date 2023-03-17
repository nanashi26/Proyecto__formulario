export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ("")
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing", 
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede quedar vacio.",
    },
    email: {
        valueMissing: "El campo correo no puede quedar vacio.",
        typeMismatch: "El correo no es válido.",
    },
    password: {
        valueMissing: "El campo contraseña no puede quedar vacio.",
        patternMismatch: "Debe tener al menos 6 carácteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número, y no puede contener carácteres especiales.",
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento no puede quedar vacia.",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede quedar vacio.",
        patternMismatch: "El número telefónico no puede ser menor ni mayor a 8 dígitos",
    },
    direccion:{
        valueMissing: "Este campo no puede quedar vacio.",
        patternMismatch: "La dirección debe contener entre 10 a 40 carácteres.",
    },
    ciudad:{
        valueMissing: "Este campo no puede quedar vacio.",
        patternMismatch: "La ciudad debe contener entre 4 a 20 carácteres.",
    },
    estado:{
        valueMissing: "Este campo no puede quedar vacio.",
        patternMismatch: "El estado debe contener entre 4 a 20 carácteres.",
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

/*const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento)=>{
    validarNacimiento(evento.target);
}); */

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje); //Es lo que me permite que el usuario de se registre y le muestre un mensaje de advertencia
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(),fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}