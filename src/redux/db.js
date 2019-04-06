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

export const deleteFirestoreItem = (collection, item) => {
    try {
        db.collection(collection).doc(item).delete();
    }
    catch (e) {
        console.error(e);
    }
}

// export const getFirestoreItems = async (collection) => {
//     const response = await db.collection(collection).get();
//     let output = [];

//     response.forEach(doc => {
//         output = [...output, { id: doc.id, ...doc.data() }];
//     });
//     console.log(output, 'output')
//     return output;
// }

// export const listenToDB = (collection) => {
//     let bvList;
//     db.collection(collection).onSnapshot(snapshot => {
//         bvList = {
//             ingredientsList: snapshot.docs.map(doc => ({
//                 ...doc.data(),
//                 id: doc.id
//             }))
//         };
//         console.log(bvList, 'bvList')
//     });
//     console.log(bvList, 'bvList')
//     return bvList;
// }


// export const checkSnapchat = (collection, item) => {
//     try {
//         db.collection(collection).doc(item).onSnapshot((doc) => {
//             console.log('current data: ', doc.data());
//         })
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

// export const itemOnChange = (collection) => {
//     db.collection(collection).onSnapshot((snapshot) => {
//         snapshot.docChange().forEach((change) => {
//             console.log(change.doc.data(), change.type)
//         })
//     });
// }
