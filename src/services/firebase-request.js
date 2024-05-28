import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, query, where, limit } from 'firebase/firestore';

import firebaseConfig from '@/firebase/config';

const useFirebaseDataStore = () => {
    const firebaseApp = initializeApp(firebaseConfig);

    const firebaseDb = getFirestore(firebaseApp);

    const getFromFirebaseStore = async (collectionName = '') => {
        const firebaseCollection = collection(firebaseDb, collectionName);
        const firebaseDocs = await getDocs(firebaseCollection);
        const firebaseList = firebaseDocs.docs.map(doc => doc.data());
        return firebaseList;
    }
    const getSingleDetailFromFirebase = async (collectionName, filter) => {
        const q = query(collection(firebaseDb, collectionName), where('id', '==', filter), limit(1));
        const firebaseDocs = await getDocs(q);
        if (!firebaseDocs.empty) {
            const doc = firebaseDocs.docs[0];           
            return doc.data();
        } else {
            return {};
        }
    }
    const setToFirbaseStore = async (collectionName = '', params) => {
        const firebaseCollection = collection(firebaseDb, collectionName);
        await addDoc(firebaseCollection, params);
    }
    return {
        getFromFirebaseStore,
        getSingleDetailFromFirebase,
        setToFirbaseStore
    }
}

export default useFirebaseDataStore;


