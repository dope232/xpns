

import {doc, deleteDoc, collection, query, where, getDocs,} from 'firebase/firestore';
  import { db } from '../config/firebase-config';
  import { useGetUserInfo } from './useGetUserInfo';
  
 export  const useDeleteTrans = () => {
    const { userID } = useGetUserInfo();
  
    
    const transcollectionRef = collection(db, 'trans');
  
    const deleteTrans = async ({ description, amount, type }, callback) => {
      try {
        const queryTrans = query(
          transcollectionRef, where('userID', '==', userID), where('description', '==', description), where('amount', '==', amount), where('type', '==', type)
        );
  
        const querySnapshot = await getDocs(queryTrans);
  
        if (querySnapshot.empty) {
          console.log('No matching documents');
          return;
        }
  
        const docToDelete = querySnapshot.docs[0];
        // Use doc reference directly from the snapshot
        await deleteDoc(docToDelete.ref);
     
        if (callback) {
          callback();
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return { deleteTrans };
  };
  
  export default useDeleteTrans;
  