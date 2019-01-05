import firebase from '../firebase';
const db = firebase.firestore();

export const sendToFirestore = (collection, object) => {
    try {
        db.collection(collection).add(object);
    }
    catch(e) {
        console.error(e);
    }
};

export const fetchFromFirestore = async (collection) => {
    let output = [];
    const result = await db.collection(collection).get();
    result.forEach(doc => {
        output.push(Object.assign({ id: doc.id, ...doc.data() }))
    })

    console.log(output);

    return output;
}
