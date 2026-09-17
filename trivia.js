// =========================================
// PROTECCIÓN DE ACCESO AL CHALLENGE
// =========================================

const autorizado =
    sessionStorage.getItem("challengeIniciado");

if(autorizado !== "true"){

    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Septiembre/index.html";

}

const preguntas = [

    {
        pregunta: "¿Cuáles son los colores de la bandera de México?",

        opciones: [
            "Verde, blanco y rojo",
            "Azul, blanco y rojo",
            "Verde, amarillo y rojo",
            "Rojo, blanco y azul"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-mexico/page-1/4838661"
    },

    {
        pregunta: "¿Qué animal aparece en el escudo de la bandera de México?",

        opciones: [
            "Un águila",
            "Un jaguar",
            "Un cóndor",
            "Un quetzal"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-mexico/page-1/9251106"
    },

    {
        pregunta: "¿Qué sostiene el águila en su pico?",

        opciones: [
            "Una serpiente",
            "Una rama",
            "Una flor",
            "Un pez"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-arte%20mexicana/page-1/6451593"
    },

    {
        pregunta: "¿Sobre qué planta está posada el águila del escudo?",

        opciones: [
            "Un nopal",
            "Un maguey",
            "Un árbol",
            "Una palma"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-arte%20mexicana/page-1/6197619"
    },

    {
        pregunta: "¿Qué día se celebra la Independencia de México?",

        opciones: [
            "16 de septiembre",
            "5 de mayo",
            "20 de noviembre",
            "15 de septiembre"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-mexicanos/page-1/7616447"
    },

    {
        pregunta: "¿En qué año inició la Independencia de México?",

        opciones: [
            "1810",
            "1821",
            "1910",
            "1800"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-mexicanos/page-1/4768361"
    },

    {
        pregunta: "¿Quién dio el famoso Grito de Dolores?",

        opciones: [
            "Miguel Hidalgo",
            "Benito Juárez",
            "José María Morelos",
            "Emiliano Zapata"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/5485309"
    },

    {
        pregunta: "¿En qué lugar se dio el llamado Grito de Dolores?",

        opciones: [
            "Dolores, Guanajuato",
            "Ciudad de México",
            "Puebla, Puebla",
            "Monterrey, Nuevo León"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-mexicanos/page-1/5224628"
    }

];

// Mezclar las preguntas
let preguntasJuego = [...preguntas]
.sort(() => Math.random() - 0.5)
.slice(0,5);

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
        "Pregunta " + (preguntaActual+1) + " de 5";

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
