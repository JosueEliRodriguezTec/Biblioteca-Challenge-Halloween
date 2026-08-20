const preguntas = [

    {
        pregunta: "¿Cuál es el horario de la Biblioteca?",

        opciones: [
            "7:30 a.m. a 7:00 p.m.",
            "8:00 a.m. a 8:00 p.m.",
            "7:00 a.m. a 6:00 p.m.",
            "9:00 a.m. a 5:00 p.m."
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/5305833"
    },

    {
        pregunta: "¿En qué campus se encuentra esta Biblioteca?",

        opciones: [
            "Garza Lagüera",
            "Valle Alto",
            "Garza Sada",
            "Cumbres"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/3466096"
    },

    {
        pregunta: "¿Quiénes son colaboradores de la Biblioteca?",

        opciones: [
            "Adriana",
            "Alejandra",
            "Josue",
            "Todos los anteriores"
        ],

        correcta: 3,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/5485309"
    },

    {
        pregunta: "¿Qué servicios ofrece la Biblioteca?",

        opciones: [
            "Referencias",
            "Libros físicos",
            "Zona VR",
            "Todos los anteriores"
        ],

        correcta: 3,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/5807900"
    },

    {
        pregunta: "¿Está permitido consumir alimentos dentro de la Biblioteca?",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 1,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/5305833"
    },

    {
        pregunta: "¿En qué área de la Biblioteca puedes realizar actividades inmersivas?",

        opciones: [
            "Sala de estudio en silencio",
            "Zona VR",
            "Auditorio",
            "Módulo de préstamo"
        ],

        correcta: 1,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/3466096"
    }

];

// Mezclar las preguntas
let preguntasJuego = [...preguntas]
.sort(() => Math.random() - 0.5)
.slice(0,4);

let preguntaActual = 0;

const lblPregunta = document.getElementById("pregunta");

const lblNumero = document.getElementById("contadorPregunta");

const botones = [

    document.getElementById("r0"),
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3")

];  

   function mezclarOpciones(pregunta){

    let opciones = pregunta.opciones.map((texto, indice) => ({
        texto: texto,
        correcta: indice === pregunta.correcta
    }));

    opciones.sort(() => Math.random() - 0.5);

    pregunta.opciones = opciones.map(o => o.texto);

    pregunta.correcta = opciones.findIndex(o => o.correcta);

}

function mostrarPregunta(){

    let p = preguntasJuego[preguntaActual];
    mezclarOpciones(p);

    lblNumero.innerHTML =
        "Pregunta " + (preguntaActual+1) + " de 4";

    lblPregunta.innerHTML = p.pregunta;



    // Ajustar el tamaño según la longitud de la pregunta
    if(p.pregunta.length > 55){

        lblPregunta.style.fontSize = "18px";

    }else{

        lblPregunta.style.fontSize = "22px";

    }

    for(let i=0; i<4; i++){

        if(p.opciones[i]){

            botones[i].style.display = "block";

            botones[i].innerHTML =
                String.fromCharCode(65+i) + ") " + p.opciones[i];

        }else{

            botones[i].style.display = "none";

        }

    }

}

mostrarPregunta();

for(let i=0; i<botones.length; i++){

    botones[i].onclick = function(){

        revisarRespuesta(i);

    };

}

function revisarRespuesta(indice){

    let pregunta = preguntasJuego[preguntaActual];

    // Desactivar botones
    botones.forEach(b=>b.disabled=true);

    if(indice == pregunta.correcta){

    botones[indice].classList.add("correcta");

    botones.forEach(b => b.disabled = true);

    setTimeout(()=>{

        abrirLibro(pregunta.libro);

    },800);

}
    else{

    botones[indice].classList.add("incorrecta");

    setTimeout(()=>{

        botones[indice].classList.remove("incorrecta");

        mostrarIncorrecto();

    },700);

}

}

function mostrarIncorrecto(){

    document.getElementById("modalIncorrecto").style.display="flex";

}

function cerrarIncorrecto(){

    document.getElementById("modalIncorrecto").style.display = "none";

    botones.forEach(b => {

        b.disabled = false;
        b.classList.remove("incorrecta");

    });

}

function abrirLibro(url){

    document.getElementById("iframeLibro").src = url;

    document.getElementById("modalLibro").style.display = "flex";

}

function cerrarLibro(){

    document.getElementById("modalLibro").style.display = "none";

    document.getElementById("iframeLibro").src = "";

    preguntaActual++;

    if(preguntaActual >= preguntasJuego.length){

        terminarTrivia();

    }else{

        botones.forEach(b=>{

            b.disabled = false;

            b.classList.remove("correcta");

            b.classList.remove("incorrecta");

        });

     

        mostrarPregunta();

    }

}

function terminarTrivia(){

    // Marcar que el alumno completó los 3 niveles
    sessionStorage.setItem("challengeCompletado", "true");

    document.getElementById("medallaOro").style.display = "flex";

    lanzarFuegos();

}

function lanzarFuegos(){

    const duracion = 4000;

    const fin = Date.now() + duracion;

    (function frame(){

        confetti({

            particleCount:4,

            angle:60,

            spread:70,

            origin:{x:0}

        });

        confetti({

            particleCount:4,

            angle:120,

            spread:70,

            origin:{x:1}

        });

        if(Date.now() < fin){

            requestAnimationFrame(frame);

        }

    })();

}

function finalizarJuego(){

    window.location.href = "registro.html";

}

let ultimoToque = 0;

document.addEventListener("touchend", function(e){

    const ahora = Date.now();

    if(ahora - ultimoToque <= 300){

        e.preventDefault();

    }

    ultimoToque = ahora;

}, { passive:false });


// =========================================
// PRUEBA DEL BOTÓN ATRÁS
// =========================================

history.pushState(null, "", location.href);

window.addEventListener("popstate", function () {

    alert("⚠️ Presionaste el botón Atrás");

    history.pushState(null, "", location.href);

});
