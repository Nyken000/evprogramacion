// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrEb4RYGwqzJGEk7WYyoXAJtvEZfRg-sE",
    authDomain: "evaprogram-2f9c0.firebaseapp.com",
    projectId: "evaprogram-2f9c0",
    storageBucket: "evaprogram-2f9c0.appspot.com",
    messagingSenderId: "288698245885",
    appId: "1:288698245885:web:cbbe2120fb5d2beece9494"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (ganador) => {
    addDoc(collection(db, 'ganadores'), ganador)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'ganadores'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'ganadores', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'ganadores', id))

export const update = (id,gan) =>{
    updateDoc(doc(db,'ganadores',id),gan)
}