
import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const autorizado =
    sessionStorage.getItem("challengeCompletado");

if (autorizado !== "true") {

    alert(
        "⚠️ Debes completar los tres niveles de Biblioteca Challenge para acceder al registro."
    );

    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Septiembre/index.html";
}


const formulario =
    document.getElementById("formRegistro");

const mensajeFinal =
    document.getElementById("mensajeFinal");

const btnBiblioteca =
    document.getElementById("btnBiblioteca");


const TEMPORADA_ACTUAL = "Septiembre";

let satisfaccion = "";


const opcionesSatisfaccion =
    document.querySelectorAll(".opcionSatisfaccion");


opcionesSatisfaccion.forEach(function (opcion) {

    opcion.addEventListener("click", function () {

        satisfaccion =
            this.dataset.satisfaccion;

        opcionesSatisfaccion.forEach(function (item) {

            item.classList.remove("seleccionada");

        });

        this.classList.add("seleccionada");

    });

});


/* =========================================
   BOTÓN IR A BIBLIOTECA
========================================= */

btnBiblioteca.addEventListener("click", function () {

    window.location.href =
        "https://biblioteca.tec.mx/prepatec";

});


/* =========================================
   FORMULARIO
========================================= */

formulario.addEventListener("submit", async function (e) {

    e.preventDefault();


    const nombre =
        document.getElementById("nombre").value.trim();


    const numeroMatricula =
        document.getElementById("matricula").value.trim();


    const matricula =
        "A" + numeroMatricula;


    const semestre =
        document.getElementById("semestre").value;


    const boton =
        formulario.querySelector("button");


    /* =========================================
       VALIDAR MATRÍCULA
    ========================================= */

    if (!/^\d{8}$/.test(numeroMatricula)) {

        alert(
            "⚠️ La matrícula debe contener exactamente 8 números."
        );

        return;

    }


    /* =========================================
       VALIDAR NOMBRE
    ========================================= */

    if (nombre === "") {

        alert(
            "⚠️ Escribe tu nombre completo."
        );

        return;

    }


    /* =========================================
       VALIDAR SATISFACCIÓN
    ========================================= */

    if (satisfaccion === "") {

        alert(
            "⚠️ Selecciona cómo fue tu experiencia."
        );

        return;

    }


    /* =========================================
       CAMBIAR BOTÓN
    ========================================= */

    boton.disabled = true;

    boton.textContent =
        "Guardando...";


    try {

        /* =========================================
           CREAR ID ÚNICO
           
           Matrícula + temporada
           
           Ejemplo:
           A12345678_Septiembre
        ========================================= */

        const idParticipante =
            `${matricula}_${TEMPORADA_ACTUAL}`;


        /* =========================================
           GUARDAR EN FIREBASE
        ========================================= */

        await setDoc(
            doc(db, "participantes", idParticipante),
            {
                nombre: nombre,
                matricula: matricula,
                semestre: semestre,
                satisfaccion: satisfaccion,
                temporada: TEMPORADA_ACTUAL,
                fecha: serverTimestamp()
            }
        );


        sessionStorage.removeItem(
            "challengeCompletado"
        );


        console.log(
            "✅ Registro guardado correctamente"
        );


        /* =========================================
           OCULTAR FORMULARIO
        ========================================= */

        formulario.style.display =
            "none";


        /* Ocultar texto superior */

        const mensaje =
            document.querySelector(".mensaje");


        if (mensaje) {

            mensaje.style.display =
                "none";

        }


        const titulo =
            document.querySelector(".card > h1");


        if (titulo) {

            titulo.style.display =
                "none";

        }


        const subtitulo =
            document.querySelector(".card > h2");


        if (subtitulo) {

            subtitulo.style.display =
                "none";

        }


        /* =========================================
           MOSTRAR MENSAJE FINAL
        ========================================= */

        mensajeFinal.style.display =
            "block";


    }

    catch (error) {

        console.error(
            "Error Firebase:",
            error
        );


        alert(
            "Ocurrió un error al guardar el registro.\n\n" +
            "Inténtalo nuevamente."
        );


        boton.disabled =
            false;


        boton.textContent =
            "Finalizar registro";

    }

});


/* =========================================
   PRUEBA DEL BOTÓN ATRÁS
========================================= */

history.pushState(
    null,
    "",
    location.href
);


window.addEventListener(
    "popstate",
    function () {

        alert(
            "⚠️ Presionaste el botón Atrás"
        );

        history.pushState(
            null,
            "",
            location.href
        );

    }
);
