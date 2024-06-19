// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = (ganador) => {
    return addDoc(collection(db, 'ganadores'), ganador);
}

export const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'ganadores'));
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
    });
    return data;
}

export const remove = (id) => {
    return deleteDoc(doc(db, 'ganadores', id));
}

export const getDocumento = (id) => {
    return getDoc(doc(db, 'ganadores', id));
}

export const update = (id, gan) => {
    return updateDoc(doc(db, 'ganadores', id), gan);
}