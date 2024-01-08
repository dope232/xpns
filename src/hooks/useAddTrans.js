
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {db} from '../config/firebase-config' 
import {useGetUserInfo} from './useGetUserInfo'

export const useAddTrans = () => {

    let transcollectionRef = collection(db, "trans"); 
    const {userID} = useGetUserInfo();

    const addTrans = async ({
        description,
        amount,
        type,

    }) => {

        await addDoc(transcollectionRef, {
            userID, 
            description, 
            amount,
            type,
            createdAt: serverTimestamp()
        })


    }; 

  return {addTrans}; 
}

export default useAddTrans
