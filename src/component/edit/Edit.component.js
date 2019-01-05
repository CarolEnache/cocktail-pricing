import React,{ useReducer } from 'react';
import firebase from '../../firebase';
import { initialState, reducer } from '../../redux';

const Edit = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(props)
    const editBeverage = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <h1>Edit your item here:</h1>
            <form onSubmit={(e) => editBeverage(e)}>
                <label htmlFor="BeverageName">
                    some name
                </label>
                <input 
                    type="text" 
                    name="BeverageName" 
                    value='test value '
                />
                <label htmlFor="BeveragePrice">£100.00</label>
                <input 
                    type="number" 
                    name="BeveragePrice" 
                    value='test value '
                />
                <label htmlFor="BeverageType">Vodka</label>
                <input 
                    type="text" 
                    name="BeverageType" 
                    value='test value '
                />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default Edit;