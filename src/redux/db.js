import firebase from '../firebase';

const db = firebase.firestore();

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

export const deleteFirestoreItem = (collection, id) => {
    try {
        db.collection(collection).doc(id).delete();
    }
    catch (e) {
        console.error(e);
    }
}
