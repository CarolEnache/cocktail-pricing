import React,{ useContext, useState } from 'react';
import { StateContext, DispatchContext } from '../../App';

const Edit = () => {

    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const item = state.ingredients.ingredientsList.find(bev => bev.id === state.updateIngredient);

    const [formValues, setFormValues] = useState(item);

    const editBeverage = (e) => {
        dispatch({ type: 'UPDATE_BEVERAGE', payload: formValues });
        dispatch({ type: 'CANCEL_EDIT_BEVERAGE' });
        e.preventDefault();
    }

    return (
        <div>
            <h1>Edit your item here:</h1>
            <form onSubmit={(e) => editBeverage(e)}>
                <label htmlFor="ingredientName">
                    Name
                </label>
                <input
                    type="text"
                    name="ingredientName"
                    onChange={(e) => setFormValues({ ...formValues, ingredientName: e.target.value })}
                    value={formValues.ingredientName}
                />
                <label htmlFor="ingredientPrice">Price</label>
                <input
                    type="number"
                    name="ingredientPrice"
                    onChange={(e) => setFormValues({ ...formValues, ingredientPrice: e.target.value })}
                    value={formValues.ingredientPrice}
                />
                <label htmlFor="ingredientPackSize">Type</label>
                <input
                    type="text"
                    name="ingredientPackSize"
                    onChange={(e) => setFormValues({ ...formValues, ingredientPackSize: e.target.value })}
                    value={formValues.ingredientPackSize}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default Edit;