
   // Reiniciar juego (si en algún momento quieres volver a habilitarlo)
// document.getElementById("rel").addEventListener("click",()=>{
//     location.reload()
// })
let touchStartBox = null;
let touchStartX = 0;
let touchStartY = 0;
var a;
let gameStarted = false;
let jugador = {

    puntos: 0,

    monedas: 0,

    nivel: 1,

    librosVisitados: 0,

    medalla: "Ninguna"

};

var aud1 = document.getElementById("aud1");

document.addEventListener("DOMContentLoaded", function () {
    create1();
});

document.getElementById("mut").addEventListener("click", () => {
    const audios = document.querySelectorAll("audio");

    for (let i = 0; i < audios.length; i++) {
        audios[i].muted = true;
    }
});

function ply() {

    document.getElementById("introModal").style.display = "flex";

}

function startGame() {

    document.getElementById("introModal").style.display = "none";

    var aud = document.getElementById("aud");
    aud.play();

    document.getElementById("board1").style.display = "none";

    gameStarted = true;
}

var scr;
const PUNTOS_META = 300;
var rand;
const imagenes = [
    "Sonido.png",
    "Libro-verde.png",
    "Visor.png",
    "Silencio.png",
    "Separador.png",
    "Alimentos.png"
];


const width = 8;
var arr = [];
var element = null;

function create1() {

    scr = 0;

    

      document.getElementById("score").innerHTML = scr;
    document.getElementById("coins").innerHTML = jugador.monedas;

    var board = document.getElementById("board");

    for (let i = 0; i < width * width; i++) {

        var div = document.createElement("div");

        div.className = "box";

       rand = Math.floor(Math.random() * imagenes.length);

div.style.backgroundImage = `url("img/${imagenes[rand]}")`;

        arr.push(div);

        board.append(div);


       div.addEventListener("click", selectBox);
div.addEventListener("touchstart", touchStart);
div.addEventListener("touchend", touchEnd);
    }

   

    check();
}

function touchStart(e) {

    touchStartBox = e.target;

    touchStartX = e.touches[0].clientX;

    touchStartY = e.touches[0].clientY;

}

function touchEnd(e) {
  if (!touchStartBox) return;

    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let dx = endX - touchStartX;
    let dy = endY - touchStartY;

    // Si casi no se movió, no hacer nada.
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
        touchStartBox = null;
        return;
    }

    let index = arr.indexOf(touchStartBox);
    let target = null;

    // Movimiento horizontal
    if (Math.abs(dx) > Math.abs(dy)) {

        if (dx > 0) {

            // Derecha
            if (index % width != width - 1)
                target = arr[index + 1];

        } else {

            // Izquierda
            if (index % width != 0)
                target = arr[index - 1];

        }

    } else {

        if (dy > 0) {

            // Abajo
            if (index + width < arr.length)
                target = arr[index + width];

        } else {

            // Arriba
            if (index - width >= 0)
                target = arr[index - width];

        }

    }

    if (target) {
        swapBoxes(touchStartBox, target);
    }

    touchStartBox = null;
}

function dragStart(event) {

    element = event.target;

}



function dragOver(event) {
    event.preventDefault();
}

function drop(event) {

    event.preventDefault();

    var imgelemt = event.target;

    if (imgelemt && imgelemt.className === "box") {

        var dragimg = element.style.backgroundImage;

        element.style.backgroundImage = imgelemt.style.backgroundImage;

        imgelemt.style.backgroundImage = dragimg;

        check();
    }
}

function check() {

    var flg = false;

    // =========================================
    // HORIZONTAL
    // =========================================

    for (let i = 0; i < width * width; i++) {

        if (i % width < width - 2) {

            if (
                arr[i].style.backgroundImage === arr[i + 1].style.backgroundImage &&
                arr[i].style.backgroundImage === arr[i + 2].style.backgroundImage &&
                arr[i].style.backgroundImage !== "none"
            ) {

                arr[i].style.backgroundImage = "none";
                arr[i + 1].style.backgroundImage = "none";
                arr[i + 2].style.backgroundImage = "none";

                flg = true;

                if (gameStarted) {

                    scr += 10;

                    jugador.puntos = scr;

                    document.getElementById("score").innerHTML = scr;

                    if (scr >= PUNTOS_META) {
                        terminarNivel();
                        return;
                    }

                }

            }
        }
    }


    // =========================================
    // VERTICAL
    // =========================================

    for (let i = 0; i < width * (width - 2); i++) {

        if (
            arr[i].style.backgroundImage === arr[i + width].style.backgroundImage &&
            arr[i].style.backgroundImage === arr[i + 2 * width].style.backgroundImage &&
            arr[i].style.backgroundImage !== "none"
        ) {

            arr[i].style.backgroundImage = "none";
            arr[i + width].style.backgroundImage = "none";
            arr[i + 2 * width].style.backgroundImage = "none";

            flg = true;

            if (gameStarted) {

                scr += 10;

                jugador.puntos = scr;

                document.getElementById("score").innerHTML = scr;

                if (scr >= PUNTOS_META) {
                    terminarNivel();
                    return;
                }

            }

        }
    }


    // =========================================
    // RELLENAR CASILLAS
    // =========================================

    if (flg) {

        setTimeout(refill, 100);

    }

}

function refill() {

    for (let i = 0; i < width * width; i++) {

rand = Math.floor(Math.random() * imagenes.length);

        if (arr[i].style.backgroundImage === "none") {

            arr[i].classList.add("flow");

arr[i].style.backgroundImage = `url("img/${imagenes[rand]}")`;
            arr[i].addEventListener("animationend", () => {

                arr[i].classList.remove("flow");

            });

        }

    }

    setTimeout(check, 10);

}

let firstBox = null;

function swapBoxes(box1, box2) {

    let temp = box1.style.backgroundImage;
    box1.style.backgroundImage = box2.style.backgroundImage;
    box2.style.backgroundImage = temp;

    check();
}

function selectBox(e) {

    let box = e.target;

    if (!firstBox) {
        firstBox = box;
        box.style.outline = "3px solid white"; // solo visual
        return;
    }

    // evitar seleccionar el mismo
    if (firstBox === box) {
        firstBox.style.outline = "none";
        firstBox = null;
        return;
    }

    // intercambio
   swapBoxes(firstBox, box);

firstBox.style.outline = "none";
firstBox = null;
}
     
    
function irLibros() {

    window.location.href = "libros.html";

}

let ultimoToque = 0;

document.addEventListener("touchend", function(e){

    const ahora = Date.now();

    if(ahora - ultimoToque <= 300){

        e.preventDefault();

    }

    ultimoToque = ahora;

}, { passive:false });

/* =========================================
   LOGIN LIBBY / TEC
========================================= */

const btnLoginElibro =
    document.getElementById("btnLoginElibro");

const btnContinuarLogin =
    document.getElementById("btnContinuarLogin");

const btnIniciarJuego =
    document.getElementById("btnIniciarJuego");


/* =========================================
   USUARIO ABRE LIBBY EN NUEVA PESTAÑA
========================================= */

btnLoginElibro.addEventListener("click", function () {

    // Mostrar botón para continuar
    btnLoginElibro.style.display = "none";

    btnContinuarLogin.style.display = "block";

});


/* =========================================
   USUARIO REGRESA DESPUÉS DEL LOGIN
========================================= */

btnContinuarLogin.addEventListener("click", function () {

    // Ocultar botón de continuar
    btnContinuarLogin.style.display = "none";


    // Cambiar apariencia del botón de login
    btnLoginElibro.innerHTML =
        "🟢 Sesión iniciada";

    btnLoginElibro.style.display = "block";

    btnLoginElibro.style.opacity = "0.7";

    btnLoginElibro.style.pointerEvents = "none";


    // Desbloquear Biblioteca Challenge
    btnIniciarJuego.disabled = false;

    btnIniciarJuego.innerHTML =
        "🎮 Iniciar Juego";

});

function terminarNivel() {

    jugador.monedas = 15;

    document.getElementById("coins").innerHTML =
        jugador.monedas;

    localStorage.setItem(
        "jugador",
        JSON.stringify(jugador)
    );

    document.getElementById("board").style.display = "none";

    document.getElementById("board1").style.display = "flex";

    document.getElementById("inicio").style.display = "none";

    document.getElementById("final").style.display = "flex";

    document.getElementById("finalScore").innerHTML = scr;

    const anim = document.getElementById("coinAnimation");

    anim.classList.remove("show");

    void anim.offsetWidth;

    anim.classList.add("show");
}
