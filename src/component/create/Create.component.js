import React, { useReducer } from 'react';
import firebase from '../../firebase';
import { initialState, reducer } from '../../redux';

const Create = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const db = firebase.firestore();

    const updateInput = e => {
        dispatch({
            type: 'BEVEREAGE_FORM_STATE',
            name: e.target.name,
            payload: e.target.value
        })
    }

    const addBeverage = (e) => {
        e.preventDefault()
        db.collection('beverageList').add({
            BeverageName: state.BeverageName,
            BeveragePrice: state.BeveragePrice,
            BeverageType: state.BeverageType
        })
        dispatch({ type: 'BEVERAGE_FORM_SUBMIT' });
    }

    return (
        <div>
            <h1>hello from the Create component</h1>
            <form onSubmit={(e) => addBeverage(e)}>
                <input
                    type='text'
                    name='BeverageName'
                    placeholder='Beverage Name'
                    onChange={(e) => updateInput(e)}
                    value={state.BeverageName}
                />
                <input
                    type='number'
                    name='BeveragePrice'
                    placeholder='Beverage Price'
                    onChange={(e) => updateInput(e)}
                    value={state.BeveragePrice}
                />
                <input
                    type='text'
                    name='BeverageType'
                    placeholder='Beverage Type'
                    onChange={(e) => updateInput(e)}
                    value={state.BeverageType}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Create;
