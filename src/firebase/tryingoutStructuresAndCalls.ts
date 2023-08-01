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
        // addDataIntoCollection("test2", {
        //     name: "Los Angeles",
        //     state: "CA",
        //     // state: ["CA"],
        //     country: "USA"
        // })

        // addDataIntoCollection("test2", {
        //     ingredients: [{name: "Los Angeles",
        //     state: "CA",
        //     // state: ["CA"],
        //     country: "USA"}]
        // })

        addDataIntoCollection("test2", {
            categories: [{name: "Los Angeles22",
            state: "CA22",
            // state: ["CA"],
            country: "USA"}]
        }, "categories")

        addDataIntoCollection("test2", {
            ingredients: [{name: "Los Angeles2222",
            state: "CA2222",
            // state: ["CA"],
            country: "USA"}]
        }, "ingredients")

        readingDataFromFirestore("test2").then(data => {
            const categories = data.filter(item => Object.keys(item)[0] === "categories")
            console.log(data, "DATA!!", categories)
        })
    })
}

type DataPropsType = {
    ingredients?: PropsType[],
    categories?: PropsType[],
    cuisines?: PropsType[],
    meals?: PropsType[],
}

type PropsType = {
    // [key: string]?: string[],
    [key: string]: string,
}

// add a new document into a collection
export const addDataIntoCollection = (collName: string, data: DataPropsType, pathName: string) => {
    setDoc(doc(db, collName, pathName), data).then(() => console.log("DATA SAVED!!"))
}
// export const addDataIntoCollection = (collName: string, data: DataPropsType) => {
//     addDoc(collection(db, collName), data).then(() => console.log("DATA SAVED!!"))
// }

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

// reading data from firestrore
export const readingDataFromFirestore = async (collName: string) => {
    const collectionName = collection(db, collName);
    const collectionSnapshot = await getDocs(collectionName);
    const testDocs = collectionSnapshot.docs.map(doc => doc.data())
    return testDocs
}

// testing firestore
export const readingFirestoreConnectivity = async () => {
    const testCol = collection(db, "test");
    const testSnapshot = await getDocs(testCol);
    const testDocs = testSnapshot.docs.map(doc => doc.data())
    return testDocs
}