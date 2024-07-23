import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore"
import { firestore } from "../firebase.config"

// Saving new Item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "mediList", `${Date.now()}`), data, {
        merge: true,
    })
}

// getall medi items
export const getAllmediList = async () => {
    const items = await getDocs(
        query(collection(firestore, "mediList"), orderBy("id", "desc"))
    )

    return items.docs.map((doc) => doc.data())
}