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

    useEffect(() => {getData()}, { db });

    const showId = (id) => {
        ref.doc(id).delete().then(() => {
            console.log('Document succeffully deleted');
        }).catch((error) => {
            console.error('Error removing document: ', error)
        })
        getData();
    }

    return (
        <div>
            <h1>Hello from the Show Component</h1>
            {state.BeverageList.map(beverageItem => {
                return (
                    <div>
                        <li>{beverageItem.BeverageName} {beverageItem.BeverageType} £ {beverageItem.BeveragePrice}</li>
                        <button onClick={() => showId(beverageItem.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Show;