// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// Configuración de tu proyecto
const firebaseConfig = {

    apiKey: "AIzaSyD1k7JIayPXNQ6yVb3gSjy4vAvmeIXmrBs",

    authDomain: "biblioteca-challenge.firebaseapp.com",

    projectId: "biblioteca-challenge",

    storageBucket: "biblioteca-challenge.firebasestorage.app",

    messagingSenderId: "453337835857",

    appId: "1:453337835857:web:341a2f5885b35e698c4b70"

};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);


// Inicializar Firestore
const db = getFirestore(app);


// Inicializar Authentication
const auth = getAuth(app);


// Exportar
export {
    db,
    auth
};
