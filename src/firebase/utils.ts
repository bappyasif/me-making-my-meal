import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import firebaseApp from "./init";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// detect user auth state
export const checkUserAuthStatus = () => {
    onAuthStateChanged(auth, user => {
        if (user !== null) {
            console.log("user is logged in")
        } else {
            console.log("no user is found")
        }
    })
}

// authenticate annonymously
export const annoymousAuth = () => {
    signInAnonymously(auth).then((user) => {
        console.log("authenticated", user.user)
        readingFirestoreConnectivity().then(data => {
            console.log(data, "collection data!!")
        })
        addIntoDbCollection()
    })
}

// Add a new document in collection "test"
export const addIntoDbCollection = () => {
    const data = {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    }
    setDoc(doc(db, "test", "newEntry"), data)
        .then(() => console.log("data saved!!"))
}



// testing firestore
export const readingFirestoreConnectivity = async () => {
    const testCol = collection(db, "test");
    const testSnapshot = await getDocs(testCol);
    const testDocs = testSnapshot.docs.map(doc => doc.data())
    return testDocs
}