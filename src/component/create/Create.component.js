import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { initialState, reducer } from '../../redux';

const Create = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const updateInput = e => {
        dispatch({
            type: 'BEVEREAGE_FORM_STATE',
            name: e.target.name,
            payload: e.target.value
        })
    }

    const addBeverage = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_BEVERAGE',
            payload: {
                ingredientName: state.ingredientName,
                ingredientPrice: state.ingredientPrice,
                ingredientPackSize: state.ingredientPackSize
            }
        });
    }

    console.log(state)
    return (
        <div>
            <h1>hello from the Create component</h1>
            <form onSubmit={(e) => addBeverage(e)}>
                <input
                    type='text'
                    name='ingredientName'
                    placeholder='Beverage Name'
                    onChange={(e) => updateInput(e)}
                    value={state.ingredientName}
                />
                <input
                    type='number'
                    name='ingredientPrice'
                    placeholder='Beverage Price'
                    onChange={(e) => updateInput(e)}
                    value={state.ingredientPrice}
                />
                <input
                    type='number'
                    name='ingredientPackSize'
                    placeholder='Beverage Type'
                    onChange={(e) => updateInput(e)}
                    value={state.ingredientPackSize}
                />
                <button type="submit">Submit</button>
            </form>
            <h4><Link to='/'>Done</Link></h4>
        </div>
    )
}

export default Create;
