// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc, 
    getDocs,
    query,
    where
} from "firebase/firestore/lite"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdV-n-4v2DvlxJAhETQziEc2y7NYVEYv4",
  authDomain: "vanlife-c6781.firebaseapp.com",
  projectId: "vanlife-c6781",
  storageBucket: "vanlife-c6781.appspot.com",
  messagingSenderId: "275060852827",
  appId: "1:275060852827:web:783fc73b1841968036177e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

// Refactoring the fetching functions
export async function getVans() {
    const vansSnap = await getDocs(vansCollectionRef)
    const dataArr = vansSnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const docSnap = await getDoc(docRef)
  
    return {
        ...docSnap.data(),
        id: docSnap.id
    }
}

export async function getHostVans(hostId) {
    const qry = query(vansCollectionRef, where("hostId", "==", hostId))
    const querySnap = await getDocs(qry)
    const dataArr = querySnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getHostVan(id, hostId) {
    vansCollectionRef
        .where("hostId", "==", hostId)
        .where("id", "==", id)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                console.log(doc.data());
            });
        })
    // console.log(hostId, id)
    // const qry = query(vansCollectionRef, where("hostId", "==", hostId))
    // const querySnap = await getDocs(qry)
    // console.log(querySnap)
    // const dataArr = querySnap.docs.map(doc => {
    //     if( doc.id = id) return {
    //         doc, id: doc.id
    //     }
        
    // })
    // return dataArr
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()
    
    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}