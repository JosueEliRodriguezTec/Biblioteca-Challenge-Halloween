import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// =========================================
// ELEMENTOS DEL LOGIN
// =========================================

const loginAdmin =
    document.getElementById("loginAdmin");

const panelAdmin =
    document.getElementById("panelAdmin");

const adminEmail =
    document.getElementById("adminEmail");

const adminPassword =
    document.getElementById("adminPassword");

const btnLoginAdmin =
    document.getElementById("btnLoginAdmin");

const formLoginAdmin =
    document.getElementById("formLoginAdmin");

const errorLogin =
    document.getElementById("errorLogin");


// =========================================
// ELEMENTOS DEL PANEL
// =========================================

const tabla =
    document.getElementById("tablaParticipantes");

const total =
    document.getElementById("totalParticipantes");

    const buscar =
    document.getElementById("buscar");

    let participantes = [];

    


// =========================================
// CARGAR PARTICIPANTES
// =========================================

async function cargarParticipantes(){

    tabla.innerHTML = "";

    try{

       const consulta =
    await getDocs(
        query(
            collection(db, "participantes"),
            orderBy("fecha", "desc")
        )
    );
        total.textContent = consulta.size;

participantes = [];

consulta.forEach((doc)=>{

            const datos = doc.data();

            participantes.push(datos);

            const fila =
                document.createElement("tr");

            fila.innerHTML = `

                <td>${datos.nombre}</td>

                <td>${datos.matricula}</td>

                <td>${datos.semestre}°</td>

                    <td>${formatearSatisfaccion(datos.satisfaccion)}</td>

                <td>${formatearFecha(datos.fecha)}</td>

                <td>${datos.temporada || "-"}</td>

                

            `;

            tabla.appendChild(fila);

        });

    }

    catch(error){

        console.error(
            "Error al cargar participantes:",
            error
        );

        alert(
            "No fue posible cargar los participantes."
        );

    }

}


// =========================================
// FORMATEAR FECHA
// =========================================

function formatearFecha(fecha){

    if(!fecha){

        return "-";

    }

    return fecha
        .toDate()
        .toLocaleString("es-MX");

}

function formatearSatisfaccion(satisfaccion){

    if(satisfaccion === "Feliz"){
        return "😊";
    }

    if(satisfaccion === "Regular"){
        return "😐";
    }

    if(satisfaccion === "Triste"){
        return "😞";
    }

    return "-";

}


// =========================================
// INICIAR SESIÓN
// =========================================

formLoginAdmin.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const correo =
            adminEmail.value.trim();

        const password =
            adminPassword.value;

        errorLogin.textContent = "";


        if(correo === "" || password === ""){

            errorLogin.textContent =
                "⚠️ Escribe tu correo y contraseña.";

            return;

        }


        btnLoginAdmin.disabled = true;

        btnLoginAdmin.textContent =
            "Verificando...";


        try{

            await signInWithEmailAndPassword(
                auth,
                correo,
                password
            );

        }

        catch(error){

            console.error(
                "Error de inicio de sesión:",
                error
            );

            errorLogin.textContent =
                "❌ Correo o contraseña incorrectos.";

            btnLoginAdmin.disabled = false;

            btnLoginAdmin.textContent =
                "🔐 Entrar";

        }

    }
);


// =========================================
// COMPROBAR SESIÓN
// =========================================

onAuthStateChanged(
    auth,
    async function(usuario){

        if(usuario){

            console.log(
                "✅ Administrador autenticado:",
                usuario.email
            );


            // Ocultar login
            loginAdmin.style.display = "none";


            // Mostrar panel
            panelAdmin.style.display = "block";


            // Cargar participantes
            await cargarParticipantes();

        }

        else{

            console.log(
                "🔒 No hay sesión administrativa."
            );


            // Mostrar login
            loginAdmin.style.display = "flex";


            // Ocultar panel
            panelAdmin.style.display = "none";

        }

    }
);


// =========================================
// EXPORTAR EXCEL
// =========================================

async function exportarExcel(){

    try{

        const consulta =
    await getDocs(
        query(
            collection(db, "participantes"),
            orderBy("fecha", "desc")
        )
    );

        const datos = [];

        consulta.forEach((doc) => {

            const participante =
                doc.data();

            let fecha = "";

            if(participante.fecha){

                fecha =
                    participante.fecha
                        .toDate()
                        .toLocaleString("es-MX");

            }

            datos.push({

                "Nombre":
                    participante.nombre,

                "Matrícula":
                    participante.matricula,

                "Semestre":
                    participante.semestre,

                    "Satisfacción":
        participante.satisfaccion || "-",

                "Temporada":
    participante.temporada || "-",

                "Fecha de registro":
                    fecha

            });

        });


        if(datos.length === 0){

            alert(
                "No hay participantes registrados para exportar."
            );

            return;

        }


        // Crear hoja de Excel
        const hoja =
            XLSX.utils.json_to_sheet(datos);


        // Crear libro
        const libro =
            XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            libro,
            hoja,
            "Participantes"
        );


        // Descargar archivo
        XLSX.writeFile(
            libro,
            "Biblioteca_Challenge.xlsx"
        );

    }

    catch(error){

        console.error(
            "Error al exportar:",
            error
        );

        alert(
            "Ocurrió un error al exportar los registros."
        );

    }

}


// =========================================
// BOTÓN EXPORTAR
// =========================================

document.getElementById("btnExportar")
    .addEventListener(
        "click",
        exportarExcel
    );


// =========================================
// BOTÓN ACTUALIZAR
// =========================================

document.getElementById("actualizar")
    .addEventListener(
        "click",
        async function(){

            const boton = this;

            boton.disabled = true;

            boton.textContent =
                "Actualizando...";

            await cargarParticipantes();

            boton.disabled = false;

            boton.textContent =
                "🔄 Actualizar";

        }
    );

    // =========================================
// BUSCAR POR MATRÍCULA
// =========================================

buscar.addEventListener("input", function(){

    const texto =
        this.value.trim().toLowerCase();

    tabla.innerHTML = "";

    const resultados =
        participantes.filter(function(participante){

            return participante.matricula
    .toLowerCase()
    .includes(texto) ||

    participante.nombre
    .toLowerCase()
    .includes(texto);

        });

    resultados.forEach(function(datos){

        const fila =
            document.createElement("tr");

        fila.innerHTML = `

            <td>${datos.nombre}</td>

            <td>${datos.matricula}</td>

            <td>${datos.semestre}°</td>

            <td>${formatearSatisfaccion(datos.satisfaccion)}</td>

             <td>${datos.temporada || "-"}</td>

            <td>${formatearFecha(datos.fecha)}</td>

        `;

        tabla.appendChild(fila);

    });

});
