import React, { useReducer, useEffect, useState } from 'react';
import firebase from '../../firebase';
import { initialState, reducer } from '../../redux';
import { fetchFromFirestore } from '../../redux/db';
import Modal from '../element';


const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
const ref = db.collection('beverageList');

const Show = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const [list, setList] = useState([]);


    useEffect(async () => {
        const cocktails = await fetchFromFirestore('beverageList');
        setList(cocktails);
    }, { list });

    
    const deleteItem = (id) => {
        ref.doc(id).delete().then(() => {
            console.log('Document succeffully deleted');
        }).catch((error) => {
            console.error('Error removing document: ', error)
        })
        //getData();
    }
    const editItem = (id) => {
        db.collection('beverageList').doc(id).update({ BeverageName: 'gsgsgsggsggsgsgsgs' })
        dispatch({ type: 'TOGGLE_STATE', payload: !state.toggleState });
        dispatch({ type: 'SELECTED_ITEM_ID', payload: id });
        //getData();
    }
    
    const handleToggle = ( ) => (
        dispatch({ type: 'TOGGLE_STATE', payload: !state.toggleState })
    )

    //useEffect(() => { getData() }, { db });
    //console.log(state.selecetedItemId)
    return (
        <div>
            <h1>Hello from the Show Component</h1>
            {state.toggleState && (
                <Modal onClose={handleToggle} ></Modal>
            )}
            {list.map(beverageItem => {
                return (
                    <div key={beverageItem.id} id={beverageItem.id}>
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
 * 2 CREATE THE TOGGLE COMPONENT === NOT NEEDED
 * 3 CREATE THE PORTAL =====DONE========
 * 4 CREATE THE MODAL =====DONE=====
 */
