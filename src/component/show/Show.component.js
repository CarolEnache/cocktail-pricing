import React, { useReducer, useEffect } from 'react';
import firebase from '../../firebase';
import { initialState, reducer } from '../../redux';

const Show = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    useEffect(() => {
        //Update the document title using the browser API
        // document.title = `You  clicked ${state.number} times`;

        db.collection('beverageList').get().then((querySnapshot) => {
            const beverageItems = []
            querySnapshot.forEach(doc => {
                beverageItems.push(Object.assign({ id: doc.id, ...doc.data() }))
            })
            dispatch({ type: 'BEVERAGE_LIST', payload: beverageItems })
        })
    }, { db });

    return (
        <div>
            <h1>Hello from the Show Component</h1>
            {console.log(state)}
            {console.log(state.BeverageList)}

            {state.BeverageList.map(beverageItem => {
                return (
                    <li>{beverageItem.BeverageName} {beverageItem.BeverageType} £ {beverageItem.BeveragePrice}</li>
                )
            })}
        </div>
    )
}

export default Show;