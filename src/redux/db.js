import firebase from '../firebase';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export const createFirestoreItem = (collection, item) => {
    try {
        db.collection(collection).add(item);
    }
    catch(e) {
        console.error(e);
    }
};

export const updateFirestoreItem = (collection, item) => {
    try {
        const { id, ...dbObj } = item;
        db.collection(collection).doc(id).update(dbObj);
    }
    catch (e) {
        console.error(e);
    }
};

export const getFirestoreItems = async (collection) => {
    
    const response = await db.collection(collection).get();
    let output = [];

    response.forEach(doc => {
        output = [...output, Object.assign({ id: doc.id, ...doc.data() }) ];
    });
    
    return output;
}
