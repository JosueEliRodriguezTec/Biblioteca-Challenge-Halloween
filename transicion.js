const barra = document.getElementById("progreso");

let porcentaje = 0;

const carga = setInterval(function(){

    porcentaje += 2;

    barra.style.width = porcentaje + "%";

    if(porcentaje >= 100){

        clearInterval(carga);

        window.location.href = "pac-man.html";

    }

},100);
