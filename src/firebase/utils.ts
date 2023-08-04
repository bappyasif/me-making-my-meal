import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import firebaseApp from "./init";
import { collection, doc, getDoc, getDocs, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore";
import { CategoryItemType } from "../features/categories/categoriesSlice";
import { CuisineNameType } from "../features/area/areaSlices";
import { IngredientsType } from "../features/ingredients/ingredientSlice";
import { ViewedMealType } from "../features/meals/mealsSlice";

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
    return signInAnonymously(auth).then((user) => {
        return user
        // if(user.user) {
        //     return user
        // } else {
        //     return false
        // }
    })
}

// type DataPropsType = {
//     ingredients?: PropsType[],
//     categories?: PropsType[],
//     cuisines?: PropsType[],
//     meals?: PropsType[],
// }

type DataPropsType = {
    ingredients?: IngredientsType[],
    categories?: CategoryItemType[],
    cuisines?: CuisineNameType[],
    meals?: ViewedMealType[],
}

// type PropsType = {
//     // [key: string]?: string[],
//     [key: string]: string,
// }

// add a new document into a collection
export const addDataIntoCollection = (collName: string, data: DataPropsType, pathName: string) => {
    setDoc(doc(db, collName, pathName), data).then(() => console.log("DATA SAVED!!"))
}
// export const addDataIntoCollection = (collName: string, data: DataPropsType) => {
//     addDoc(collection(db, collName), data).then(() => console.log("DATA SAVED!!"))
// }

export const addDataIntoDocumentSubCollection = async (docName: string, subCollectionName: string, subDocName: string, data: any) => {
    // let db = firebase.firestore();
    // DocumentReference categoryRef = db.collection
    const baseCollection = collection(db, "4M")
    // const BeefSubCollection = collection(categoryCollection, "Beef");
    // const BeefSubCollection = collection(baseCollection, "foodCategories", "Beef")

    // const BeefSubCollection = collection(baseCollection, "foodCategories", "category", "Beef")

    // const BeefSubCollection = collection(baseCollection, "foodCategories",  "category")

    const refSubCollection = collection(baseCollection, docName, subCollectionName)

    // await addDoc(BeefSubCollection, {tets: "test"})
    // await setDoc(doc(refSubCollection, "Beef"), {test: "test"})
    await setDoc(doc(refSubCollection, subDocName), data)
}

export const updateSinglePropertyInFirebaseSubCollectionDocument = async (docName: string, subCollectionName: string, subDocumentName: string) => {
    const baseCollection = collection(db, "4M");
    const refSubCollection = collection(baseCollection, docName, subCollectionName)
    const refSubDocument = doc(refSubCollection, subDocumentName)

    await updateDoc(refSubDocument, {
        count: increment(1)
    });
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

// reading data from firestore subcollection
export const readingDataFromFirestoreSubCollection = async (docName: string, subCollectionName: string) => {
    const baseCollection = collection(db, "4M");
    const refSubCollection = collection(baseCollection, docName, subCollectionName)
    const collectionSnapshot = await getDocs(refSubCollection);
    const testDocs = collectionSnapshot.docs.map(doc => doc.data())
    return testDocs
}

// reading data from firestore sub document
export const readingDataFromFirestoreSubDocument = async (docName: string, subCollectionName: string, subDocumentName: string) => {
    // sounds like its will take up a few seconds!! 
    // we could have kept it in our redux store but that will be fetching data once at page load time
    // which means we would have to keep updating data in two place in store
    // so going with look up in firebase instead before any write or update task

    const baseCollection = collection(db, "4M");
    const refSubCollection = collection(baseCollection, docName, subCollectionName)
    const refSubDocument = doc(refSubCollection, subDocumentName)
    const docSnap = await getDoc(refSubDocument);

    if(docSnap.exists()) {
        return docSnap.data()
    } else false
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