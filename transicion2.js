// =========================================
// PROTECCIÓN DE ACCESO
// =========================================

const autorizado =
    sessionStorage.getItem("nivel2Completado");

if(autorizado !== "true"){

    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Septiembre/index.html";

}


// =========================================
// ANIMACIÓN DE TRANSICIÓN
// =========================================

const barra = document.getElementById("progreso");

let porcentaje = 0;

const carga = setInterval(function(){

    porcentaje += 2;

    barra.style.width = porcentaje + "%";

    if(porcentaje >= 100){

        clearInterval(carga);

        window.location.href = "trivia.html";

    }

},100);
