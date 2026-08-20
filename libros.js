    let jugador = JSON.parse(localStorage.getItem("jugador"));

    if(!jugador){

        jugador = {

            puntos:0,

            monedas:0,

            nivel:1,

            librosVisitados:0,

            medalla:"Ninguna"

        };

    }

    let visitados = {

        libro1: false,

        libro2: false,

        libro3: false

    };

    let libroPendiente = null;

    document.getElementById("coins").innerHTML = jugador.monedas;

  function libro1(){

    if(visitados.libro1) return;

    libroPendiente = "libro1";

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/570224",
        "_blank"
    );

}   
function libro2(){

    if(visitados.libro2) return;

    libroPendiente = "libro2";

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/1330376",
        "_blank"
    );

}

function libro3(){

    if(visitados.libro3) return;

    libroPendiente = "libro3";

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/spotlight-books/page-1/37561",
        "_blank"
    );

}

function abrirLibro(url){

    document.getElementById("iframeLibro").src = url;

    document.getElementById("modalLibro").style.display = "flex";

}

function cerrarLibro(){

    document.getElementById("modalLibro").style.display = "none";

    document.getElementById("iframeLibro").src = "";

    if(libroPendiente){

        sumarMonedas(libroPendiente);

        libroPendiente = null;

    }

}

    function sumarMonedas(nombre){
        console.log("Entró a sumarMonedas:", nombre);

        if(visitados[nombre]){

            return;

        }

        visitados[nombre] = true;

        jugador.monedas += 5;

        document.getElementById("coins").innerHTML = jugador.monedas;

        //document.getElementById("progreso").innerHTML =
        //    jugador.monedas + " / 30 🪙";

            const anim = document.getElementById("coinAnimation");

anim.classList.remove("show");

void anim.offsetWidth;

anim.classList.add("show");

// Si ya llegó a 30 monedas
if(jugador.monedas >= 30){

    confetti({

        particleCount:250,

        spread:180,

        origin:{ y:0.6 }

    });

    document.getElementById("medallaBronce").style.display = "flex";

    const botonContinuar = document.getElementById("continuar");

    botonContinuar.disabled = false;

    botonContinuar.innerHTML = "Continuar al Nivel 2";

}
//   localStorage.setItem(
//     "jugador",
//     JSON.stringify(jugador)
// );

console.log("Va a cambiar el botón");

let boton = document.getElementById("btn" + nombre.charAt(0).toUpperCase() + nombre.slice(1));

console.log(boton);

boton.disabled = true;

boton.innerHTML = "✅ Visitado";

}

function cerrarMedalla(){

    document.getElementById("medallaBronce").style.display = "none";

}





//document.addEventListener("visibilitychange", function(){

   

    //if(document.visibilityState === "visible"){

        //if(libroPendiente){

        

        //    sumarMonedas(libroPendiente);

      //      libroPendiente = null;

    //    }

  //  }

//});

document.getElementById("continuar").addEventListener("click", function() {
    window.location.href = "transicion.html";
});
