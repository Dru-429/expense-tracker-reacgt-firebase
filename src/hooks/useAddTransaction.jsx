import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"
import useGetUserInfo from "./useGetUserInfo"

const useAddTransaction = () => {

    const {userID }= useGetUserInfo()
    const transactionColleection = collection(db, "transactions")
    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType
    }) => {
        await addDoc(transactionColleection, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAT: serverTimestamp() //Timestamp given by firebase  
        })
    }
    return{ addTransaction }
}
export default useAddTransaction