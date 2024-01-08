import React from 'react'
import { collection, deleteDoc, onSnapshot, orderBy, query, where, getDocs, doc } from 'firebase/firestore'
import {db} from '../config/firebase-config'
import {useGetUserInfo} from './useGetUserInfo'

export const useGetTrans = () => {

    const [trans, setTrans] = React.useState([]);
    let [totals, setTotals] = React.useState({income: 0, expense: 0, balance: 0});
    const transcollectionRef = collection(db, "trans"); 
    const {userID} = useGetUserInfo();

    const getTrans  = async() => {
        let unsub;
        try {
           
            const querytrans = query(transcollectionRef, where("userID", "==", userID), orderBy("createdAt", "desc"));
            unsub = onSnapshot(querytrans, (snapshot) => {
                let docs =  []; 
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({id, ...data});
                    if (data.type.toLowerCase() === "income") {
                        totalIncome += Number(data.amount);
                    } else {
                        totalExpense += Number(data.amount);
                    }

                    


                }
                    );
                    setTrans(docs);

                    let balance = totalIncome - totalExpense;
                    setTotals({income: totalIncome, expense: totalExpense, balance: balance});

            })

        }
        catch(err) {
            console.log(err);
        }
        return () => unsub();




    }

  
    

    React.useEffect(() => {
        getTrans(); 
        
    }, [])
  

    return {trans, totals, getTrans}; 
}

export default useGetTrans
