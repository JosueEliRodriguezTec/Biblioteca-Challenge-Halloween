/*document.addEventListener("gesturestart", function(e){

    e.preventDefault();

});

document.addEventListener("gesturechange", function(e){

    e.preventDefault();

});

document.addEventListener("gestureend", function(e){

    e.preventDefault();

});*/

// =========================================
// PROTECCIÓN DE ACCESO AL CHALLENGE
// =========================================

const autorizado =
    sessionStorage.getItem("challengeIniciado");

if(autorizado !== "true"){

    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Septiembre/index.html";

}

let monedas = 30;
let vidas = 3;
let tiempo = 60;

let juegoPausado = false;

const modal = document.getElementById("modalLibro");
const iframe = document.getElementById("iframeLibro");
let direccion = "derecha";
let cuadro = 0;
function continuarNivel3(){

    window.location.href = "transicion2.html";

}
const animaciones = {

    izquierda:["pacman1.png","pacman2.png","pacman3.png"],

    arriba:["pacman1.png","pacman4.png","pacman5.png"],

    derecha:["pacman1.png","pacman6.png","pacman7.png"],

    abajo:["pacman1.png","pacman8.png","pacman9.png"]

};

let pacmanFila = 5;
let pacmanColumna = 7;

let movimientoX = 0;
let movimientoY = 0;

// =====================
// FANTASMA DECORATIVO
// =====================

let fantasmaRuta = [

    // fila superior
    [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    [0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],

    // lado derecho
    [1,14],[2,14],[3,14],[4,14],[5,14],[6,14],[7,14],[8,14],[9,14],

    // fila inferior
    [9,13],[9,12],[9,11],[9,10],[9,9],[9,8],[9,7],
    [9,6],[9,5],[9,4],[9,3],[9,2],[9,1],[9,0],

    // lado izquierdo
    [8,0],[7,0],[6,0],[5,0],[4,0],[3,0],[2,0],[1,0]

];
let fantasmaPaso = 0;

let fantasmaFila = 0;
let fantasmaColumna = 0;

function abrirLibro(urlLibro){

    juegoPausado = true;

    iframe.src = urlLibro;

    modal.style.display = "flex";

    setTimeout(() => {

        cerrarLibro();

    }, 7000);

}

function cerrarLibro(){

    modal.style.display = "none";

    iframe.src = "";

    juegoPausado = false;

   

}

function actualizarHUD(){

    document.getElementById("monedas").textContent = monedas;

    document.getElementById("monedasMovil").textContent = monedas;

    const marcador = document.getElementById("monedas");

    if(marcador){
        marcador.textContent = monedas;
    }

}

function mostrarMonedas(){

    const mensaje = document.getElementById("mensajeMonedas");

    mensaje.innerHTML = "+10 🪙";

    mensaje.style.display = "block";

    mensaje.style.background = "red";

    mensaje.style.color = "yellow";

    mensaje.style.fontSize = "80px";

    console.log("MOSTRANDO MENSAJE");

    setTimeout(()=>{

        mensaje.style.display = "none";

    },3000);

}

function verificarVictoria(){

    for(let fila=0; fila<mapa.length; fila++){

        for(let columna=0; columna<mapa[fila].length; columna++){

            if(mapa[fila][columna]===5 || mapa[fila][columna]===3){
                return;
            }

        }

    }

    juegoPausado = true;

    mostrarVictoria();

}
function mostrarVictoria(){

    // Marcar que el Nivel 2 fue completado
    sessionStorage.setItem("nivel2Completado", "true");

    document.getElementById("medallaPlata").style.display = "flex";

    document.getElementById("totalMonedas").textContent = monedas;

    confetti({

        particleCount:250,

        spread:180,

        origin:{ y:0.6 }

    });

}



let libros = [
    {
        id: 1,
        url: "https://libbyapp.com/search/bibliotecatec/search/query-misterio/page-1/7616602",
        leido: false
    },
    {
        id: 2,
        url: "https://libbyapp.com/search/bibliotecatec/search/query-misterio/page-1/8804577",
        leido: false
    },
    {
        id: 3,
        url: "https://libbyapp.com/search/bibliotecatec/search/query-misterio/page-1/5054249",
        leido: false
    },
    {
        id: 4,
        url: "https://libbyapp.com/search/bibliotecatec/search/query-misterio/page-1/10480455",
        leido: false
    }
];

actualizarHUD();

const mapa = [

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

[1,3,5,5,5,5,5,5,5,5,5,5,5,3,1],

[1,5,1,1,1,5,1,1,1,5,1,1,1,5,1],

[1,5,5,5,1,5,5,5,5,5,1,5,5,5,1],

[1,1,1,5,1,1,1,5,1,1,1,5,1,1,1],

[1,5,5,5,5,5,5,2,5,5,5,5,5,5,1],

[1,1,1,5,1,1,1,5,1,1,1,5,1,1,1],

[1,5,5,5,1,5,5,5,5,5,1,5,5,5,1],

[1,3,5,5,5,5,1,1,1,5,5,5,5,3,1],

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];

function moverFantasmaDecorativo(){

    fantasmaPaso++;

    if(fantasmaPaso >= fantasmaRuta.length){
        fantasmaPaso = 0;
    }

    fantasmaFila = fantasmaRuta[fantasmaPaso][0];
    fantasmaColumna = fantasmaRuta[fantasmaPaso][1];

    dibujarMapa();

}
function dibujarMapa(){

    const laberinto = document.getElementById("laberinto");

    laberinto.innerHTML = "";

    laberinto.style.gridTemplateColumns = `repeat(${mapa[0].length}, 1fr)`;
    laberinto.style.gridTemplateRows = `repeat(${mapa.length}, 1fr)`;

  for(let fila = 0; fila < mapa.length; fila++){

    for(let columna = 0; columna < mapa[fila].length; columna++){

        const casilla = document.createElement("div");

        casilla.classList.add("casilla");

        const valor = mapa[fila][columna];

        const esFantasmaDecorativo =
    fila === fantasmaFila &&
    columna === fantasmaColumna;

        if(valor === 1){

            casilla.classList.add("muro");

        }
        else if(valor===2){

            casilla.classList.add("pacman");

            casilla.style.backgroundImage =
                `url("${animaciones[direccion][cuadro]}")`;

        }
        else if(valor===3){

        casilla.classList.add("libro");


        }
        else if(valor===4){

            casilla.classList.add("fantasma");

        }
       else if(valor===5){

    casilla.classList.add("puntito");

}
else{

    casilla.classList.add("camino");

}

// Fantasma decorativo encima de cualquier casilla
if(esFantasmaDecorativo){

    casilla.classList.add("fantasma");

}

        laberinto.appendChild(casilla);

    }

}
}

setInterval(()=>{

    cuadro++;

    if(cuadro>=3){
        cuadro=0;
    }

    const pacman = document.querySelector(".pacman");

    if(pacman){
        pacman.style.backgroundImage =
            `url("${animaciones[direccion][cuadro]}")`;
    }

},100);

setInterval(()=>{

    moverPacman(movimientoY,movimientoX);

},132);

setInterval(()=>{

    moverFantasmaDecorativo();

},500);

document.addEventListener("keydown", function(e){

 if(e.key=="ArrowRight"){

    direccion="derecha";

    movimientoX = 1;
    movimientoY = 0;

}

if(e.key=="ArrowLeft"){
    direccion="izquierda";
    movimientoX = -1;
    movimientoY = 0;
}

   if(e.key=="ArrowUp"){
    direccion="arriba";
    movimientoX = 0;
    movimientoY = -1;
}

  if(e.key=="ArrowDown"){
    direccion="abajo";
    movimientoX = 0;
    movimientoY = 1;
}

});

// Controles táctiles

document.getElementById("arriba").addEventListener("pointerdown", function(){

    direccion = "arriba";
    movimientoX = 0;
    movimientoY = -1;

});

document.getElementById("abajo").addEventListener("pointerdown", function(){

    direccion = "abajo";

    movimientoX = 0;
    movimientoY = 1;

});

document.getElementById("izquierda").addEventListener("pointerdown", function(){

    direccion = "izquierda";

    movimientoX = -1;
    movimientoY = 0;

});

document.getElementById("derecha").addEventListener("pointerdown", function(){

    direccion = "derecha";

    movimientoX = 1;
    movimientoY = 0;

});

dibujarMapa();
function moverPacman(df,dc){
    if(juegoPausado){
    return;
}

 let nuevaFila = pacmanFila + df;
let nuevaColumna = pacmanColumna + dc;

// ¿Es muro o está fuera del mapa?
if(
    nuevaFila < 0 ||
    nuevaFila >= mapa.length ||
    nuevaColumna < 0 ||
    nuevaColumna >= mapa[0].length ||
    mapa[nuevaFila][nuevaColumna] == 1
){
    return;
}

const valor = mapa[nuevaFila][nuevaColumna];

if(valor === 5){

    mapa[nuevaFila][nuevaColumna] = 0;

}

if(valor === 3){

    mapa[nuevaFila][nuevaColumna] = 0;

    monedas += 10;

    actualizarHUD();

    mostrarMonedas();

    const librosDisponibles =
        libros.filter(libro => !libro.leido);

    if(librosDisponibles.length > 0){

        const indiceAleatorio =
            Math.floor(Math.random() * librosDisponibles.length);

        const libroAleatorio =
            librosDisponibles[indiceAleatorio];

        libroAleatorio.leido = true;

        abrirLibro(libroAleatorio.url);

    }

}
    // borrar posición anterior
    mapa[pacmanFila][pacmanColumna] = 0;

    // guardar nueva posición
    pacmanFila = nuevaFila;
    pacmanColumna = nuevaColumna;

    // dibujar pacman
    mapa[pacmanFila][pacmanColumna] = 2;

    dibujarMapa();
verificarVictoria();
}


/*document.addEventListener("gesturestart", function(e){

    e.preventDefault();

});

document.addEventListener("dblclick", function(e){

    e.preventDefault();

});

let ultimoToque = 0;


document.addEventListener("touchend", function(e){

    let ahora = Date.now();

    if(ahora - ultimoToque <= 300){

        e.preventDefault();

    }

    ultimoToque = ahora;

}, { passive:false });
*/

let ultimoToque = 0;

document.addEventListener("touchend", function(e){

    const ahora = Date.now();

    if(ahora - ultimoToque <= 300){

        e.preventDefault();

    }

    ultimoToque = ahora;

}, { passive:false });

// =========================================
// PROTECCIÓN DEL BOTÓN ATRÁS
// =========================================

// =========================================
// PRUEBA DEL BOTÓN ATRÁS
// =========================================

history.pushState(null, "", location.href);

window.addEventListener("popstate", function () {

    alert("⚠️ Presionaste el botón Atrás");

    history.pushState(null, "", location.href);

});
