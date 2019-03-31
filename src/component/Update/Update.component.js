import React,{ useContext, useState } from 'react';
import { StateContext, DispatchContext } from '../../App';

import Button from '../element/Button.component';//TODO: Fix the File Indexing

const Update = () => {

    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const item = state.ingredients.ingredientsList.filter(bev => bev.id === state.updateIngredient)

    const [formValues, setFormValues] = useState(item[0])

    const updateIngredient = (e) => {
        e.preventDefault();
        dispatch({
            type: 'UPDATE_BEVERAGE',
            payload: formValues
        })
        dispatch({
            type: 'CANCEL_Update_BEVERAGE'
        })
    }

    return (
        <div>
            <h1>Update your item here:</h1>
            <form onSubmit={(e) => updateIngredient(e)}>
                <label htmlFor="ingredientName">
                    Name
                </label>
                <input
                    type="text"
                    name="ingredientName"
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientName: e.target.value,
                    })}
                    value={formValues.ingredientName}
                />
                <label htmlFor="ingredientPrice">Price</label>
                <input
                    type="number"
                    name="ingredientPrice"
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientPrice: e.target.value
                    })}
                    value={formValues.ingredientPrice}
                />
                <label htmlFor="ingredientPackSize">Pack ize</label>
                <input
                    type="number"
                    name="ingredientPackSize"
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientPackSize: e.target.value
                    })}
                    value={formValues.ingredientPackSize}
                />
                <Button >SUBMIT</Button>
            </form>
        </div>
    )
}

export default Update;