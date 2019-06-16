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
        const { id, ...ingredient } = item;
        db.collection(collection).doc(id).update(ingredient);
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
