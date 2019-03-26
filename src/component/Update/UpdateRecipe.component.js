import React, { useContext, useState } from 'react';
import { StateContext, DispatchContext } from '../../App';

import Button from '../element/Button.component';//TODO: Fix the File Indexing

const UpdateRecipe = () => {

    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const item = state.recipes.recipesList.find(recipe => recipe.id === state.updateRecipe);

    const [formValues, setFormValues] = useState(item);

    const updateRecipe = (e) => {
        dispatch({ type: 'UPDATE_RECIPE', payload: formValues });
        dispatch({ type: 'CANCEL_UPDATE_RECIPE' });
        e.preventDefault();
    }

    return (
        <div>
            <h1>Update your item here:</h1>
            <form onSubmit={(e) => updateRecipe(e)}>
                <label htmlFor="recipeName">
                    Name
                </label>
                <input
                    type="text"
                    name="recipeName"
                    onChange={(e) => setFormValues({ ...formValues, recipeName: e.target.value })}
                    value={formValues.recipeName}
                />
                <label htmlFor="numberOfIngredients">Price</label>
                <input
                    type="number"
                    name="numberOfIngredients"
                    onChange={(e) => setFormValues({ ...formValues, numberOfIngredients: e.target.value })}
                    value={formValues.numberOfIngredients}
                />
                <Button >SUBMIT</Button>
            </form>
        </div>
    )
}

const theme = {
    main: 'mediumseagreen',
    position: 'fixed',
    top: '91%',
    left: '0'
}


export default UpdateRecipe;