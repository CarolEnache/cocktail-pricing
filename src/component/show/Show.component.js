import React, { useReducer, useEffect } from 'react';
import firebase from '../../firebase';
import { initialState, reducer } from '../../redux';

const Show = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    const ref = db.collection('beverageList');
    const getData = () => ref.get().then((querySnapshot) => {
        const beverageItems = []
        querySnapshot.forEach(doc => {
            beverageItems.push(Object.assign({ id: doc.id, ...doc.data() }))
        })
        dispatch({ type: 'BEVERAGE_LIST', payload: beverageItems })
    })
    const updateData = () => db.collection('beverageList').doc('c6nECOGgztATJXqc7STI').update({ BeverageName: 'gsgsgsggsggsgsgsgs' })

    useEffect(() => {getData()}, { db });
    useEffect(() => {updateData()}, { db });

    const deleteItem = (id) => {
        ref.doc(id).delete().then(() => {
            console.log('Document succeffully deleted');
        }).catch((error) => {
            console.error('Error removing document: ', error)
        })
        getData();
    }

    const editItem = (id) => {
        db.collection('beverageList').doc(id).update({ BeverageName: 'gsgsgsggsggsgsgsgs' })
        getData()
    }
    

    return (
        <div>
            <h1>Hello from the Show Component</h1>
            {state.BeverageList.map((beverageItem) => {
                return (
                    <div>
                        <li>{beverageItem.BeverageName} {beverageItem.BeverageType} £ {beverageItem.BeveragePrice}</li>
                        <button onClick={() => deleteItem(beverageItem.id)}>Delete</button>
                        <button onClick={() => editItem(beverageItem.id)}>Edit</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Show;
/**
 * TODOS:
 * 1 UPDATE EXISTANT DOCUMENTS IN THE DB =====DONE======
 * 2 CREATE THE TOGGLE COMPONENT 
 * 3 CREATE THE PORTAL =====DONE========
 * 4 CREATE THE MODAL 
 */
