import React, {  useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from '../../App';

import Update from '../Update';
import UpdateRecipe from '../Update/UpdateRecipe.component';

import {Create, CreateRecipe} from '../create';
import Modal from '../element';
import Button from '../element/Button.component'; //TODO: Fix the File Indexing


const Read = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [addIngredient, setAddIngredient] = useState(false)
    const [itemId, setItemId] = useState('')
    let updateingIngredient = !!state.updateIngredient;
    // let updateRecipe = !!state.updateRecipe;
    // const { ingredients, recipes} = state;
    // console.log(state)
    const deleteItem = (id) => {
        dispatch({ type: 'DELETE_BEVERAGE', payload: id })
    }

    const UpdateItem = (id) => {
        dispatch({ type: 'Update_BEVERAGE', payload: id });
    }
    const handleToggle = ( ) => {
        dispatch({ type: 'CANCEL_Update_BEVERAGE' });
    }

    return (
        <Container>
            <div>
                <CreateRecipe />
            </div>
            <div>
                <h4>this is the read recipes</h4>
                <ul>
                {state.recipes.recipesList && state.recipes.recipesList.map(recipe => {
                    return(
                        <li key={recipe.id} id={recipe.id}>
                            <p>{recipe.recipeName} Number of portions: {recipe.numberOfIngredients}</p>
                            <Button type="button" theme={{ main: 'red' }} onClick={() => deleteItem(recipe.id)}>Delete</Button>
                            <Button
                                theme={{ main: 'royalblue' }}
                                onClick={() =>{
                                    setItemId(recipe.id)
                                    UpdateItem(recipe.id)
                                }}
                                >Edit</Button>
                        </li>
                    )
                })}
                </ul>
            </div>
            {addIngredient ? <Create /> : <h4>Hello from the Read ingrediants list</h4>}
            <Button
                theme={theme}
                onClick={() => setAddIngredient(!addIngredient)}
                > {addIngredient ? 'Done' : 'Add ingredients' }
            </Button>
            {updateingIngredient && (<Modal onClose={handleToggle} ><Update id={itemId} /></Modal>)}
            {/* {updateRecipe && (<Modal onClose={handleToggle} ><UpdateRecipe id={itemId} /></Modal>)} */}
            <ul>
            { state.ingredients.ingredientsList && state.ingredients.ingredientsList.map(beverageItem => {
                return (
                    <li key={beverageItem.id} id={beverageItem.id}>
                        <p>{beverageItem.ingredientName} {beverageItem.ingredientPackSize} £ {beverageItem.ingredientPrice}</p>
                        <Button type="button" theme={{ main: 'red'}} onClick={() => deleteItem(beverageItem.id)}>Delete</Button>
                        <Button
                            theme={{ main: 'royalblue' }}
                            onClick={() => {
                                setItemId(beverageItem.id)
                                UpdateItem(beverageItem.id)
                            }}
                            >Edit</Button>
                    </li>
                )
            })}
            </ul>
        </Container>
    )
}

const Container = styled.div`
    h4 {
        text-align: center;
        padding: 0.7em;
    }

    ul {
        list-style: none;
    }
`
const theme = {
    main: 'mediumseagreen',
    position: 'fixed',
    top: '91%',
    left: '0'
}




export default Read;
