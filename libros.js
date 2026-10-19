
 // =========================================
 // PROTECCIÓN DE ACCESO AL CHALLENGE
 // =========================================

const autorizado = sessionStorage.getItem("challengeIniciado");

if (autorizado !== "true") {
    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Halloween/";
}

let jugador = JSON.parse(localStorage.getItem("jugador"));

if (!jugador) {
    jugador = {
        puntos: 0,
        monedas: 0,
        nivel: 1,
        librosVisitados: 0,
        medalla: "Ninguna"
    };
}

let visitados = {
    libro1: false,
    libro2: false,
    libro3: false
};

let libroPendiente = null;

document.getElementById("coins").innerHTML = jugador.monedas;


// =========================================
// BOTONES DE LIBROS
// =========================================

function libro1() {
    if (visitados.libro1 || libroPendiente) return;

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/search/query-terror/page-1/3315911",
        "libro1"
    );
}

function libro2() {
    if (visitados.libro2 || libroPendiente) return;

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/search/query-misterio/page-1/2055685",
        "libro2"
    );
}

function libro3() {
    if (visitados.libro3 || libroPendiente) return;

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/search/query-misterio/page-1/5178480",
        "libro3"
    );
}


// =========================================
// ABRIR LIBRO Y CERRARLO AUTOMÁTICAMENTE
// =========================================

function abrirLibro(url, nombreLibro) {

    // Abrir directamente desde el clic del alumno
    const ventanaEbook = window.open(
        url,
        "bibliotecaEbook",
        "popup=yes,width=1000,height=750,resizable=yes,scrollbars=yes"
    );

    // Si el navegador bloquea la ventana
    if (!ventanaEbook) {
        alert(
            "No se pudo abrir el libro. " +
            "Permite las ventanas emergentes e inténtalo de nuevo."
        );
        return;
    }

    libroPendiente = nombreLibro;

    let finalizado = false;
    let temporizadorCierre;

    function finalizarVisita() {

        if (finalizado) return;

        finalizado = true;

        clearInterval(vigilarVentana);
        clearTimeout(temporizadorCierre);

        if (libroPendiente === nombreLibro) {
            sumarMonedas(nombreLibro);
            libroPendiente = null;
        }
    }

    // Detectar si el alumno cierra la ventana manualmente
    const vigilarVentana = setInterval(() => {
        if (ventanaEbook.closed) {
            finalizarVisita();
        }
    }, 500);

    // Intentar cerrar el libro después de 5 segundos
    temporizadorCierre = setTimeout(() => {

        if (!ventanaEbook.closed) {
            ventanaEbook.close();
        }

        setTimeout(() => {

            if (ventanaEbook.closed) {
                finalizarVisita();
            } else {

                const continuar = confirm(
                    "Si terminaste de consultar el libro, " +
                    "presiona Aceptar para continuar."
                );

                if (continuar) {
                    finalizarVisita();
                }
            }

        }, 300);

    }, 5000);
}


// =========================================
// SUMAR MONEDAS POR LIBRO VISITADO
// =========================================

function sumarMonedas(nombre) {

    if (visitados[nombre]) return;

    visitados[nombre] = true;

    jugador.monedas += 5;
    jugador.librosVisitados =
        (jugador.librosVisitados || 0) + 1;

    // Guardar el progreso
    localStorage.setItem("jugador", JSON.stringify(jugador));

    document.getElementById("coins").innerHTML =
        jugador.monedas;

    // Animación de monedas
    const anim = document.getElementById("coinAnimation");

    anim.classList.remove("show");
    void anim.offsetWidth;
    anim.classList.add("show");

    // Desactivar el botón del libro visitado
    const boton = document.getElementById(
        "btn" + nombre.charAt(0).toUpperCase() + nombre.slice(1)
    );

    if (boton) {
        boton.disabled = true;
        boton.innerHTML = "✅ Visitado";
    }

    // Si ya llegó a 30 monedas
    if (jugador.monedas >= 30) {

        confetti({
            particleCount: 250,
            spread: 180,
            origin: { y: 0.6 }
        });

        document.getElementById("medallaBronce").style.display =
            "flex";

        const botonContinuar =
            document.getElementById("continuar");

        botonContinuar.disabled = false;
        botonContinuar.innerHTML = "Continuar al Nivel 2";
    }
}


// =========================================
// CERRAR MEDALLA
// =========================================

function cerrarMedalla() {
    document.getElementById("medallaBronce").style.display =
        "none";
}


// =========================================
// CONTINUAR AL NIVEL 2
// =========================================

document.getElementById("continuar").addEventListener(
    "click",
    function() {
        window.location.href = "transicion.html";
    }
);
