import React, {  useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from '../../App';

import Update from '../Update';
import UpdateRecipe from '../Update/UpdateRecipe.component';

import {Create, CreateRecipe} from '../create';
import Modal from '../element';
import Button from '../element/Button.component'; //TODO: Fix the File Indexing
import SlideToggleContent from '../element/SlideToggleContent.component';

const Read = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [addIngredient, setAddIngredient] = useState(false)
    const [itemId, setItemId] = useState('')
    let updateingIngredient = !!state.updateIngredient;
    let updateRecipe = !!state.updateRecipe;
    const [isVisible, setIsVisible] = useState(false);

    const deleteItem = (id) => {
        dispatch({ type: 'DELETE_BEVERAGE', payload: id })
    }
    const deleteRecipe = (id) => {
        dispatch({ type: 'DELETE_RECIPE', payload: id })
    }

    const UpdateItem = (id) => {
        dispatch({ type: 'Update_BEVERAGE', payload: id });
    }

    const updateRecipeFromList = (id) => {
        dispatch({ type: 'UPDATE_RECIPE_FROM_LIST', payload: id });
    }

    const updateIngredientToRecipe = (id) => {
        console.log(id)
    }

    const handleToggle = ( ) => {
        dispatch({ type: 'CANCEL_Update_BEVERAGE' });
    }

    return (
        <Container>
            <SlideToggleContent isVisible={isVisible}>
                <CreateRecipe />
            </SlideToggleContent>
            <Button
                theme={{ main: 'green'}}
                onClick={() => setIsVisible(!isVisible)}
                >Create recipe</Button>
            <div>
                <h4>this is the read recipes</h4>
                <ul>
                {state.recipes.recipesList && state.recipes.recipesList.map(recipe => {
                    const { id, recipeName, numberOfIngredients } = recipe;
                    return(
                        <li key={id} id={id}>
                            <p>{recipeName} Serves: {numberOfIngredients}</p>
                            <Button
                                type="button"
                                theme={{ main: 'red' }}
                                onClick={() => deleteRecipe(id)}
                                >Delete</Button>
                            <Button
                                theme={{ main: 'royalblue' }}
                                onClick={() =>{
                                    setItemId(id)
                                    updateRecipeFromList(id)
                                }}
                                >Edit</Button>
                            <Button
                                theme={{ main: 'green'}}
                                onClick={() => updateIngredientToRecipe(id)}
                            > Add ingredient
                            </Button>
                        </li>
                    )
                })}
                </ul>
            </div>
            {/* {addIngredient ? <Create /> : <h4>Hello from the Read ingrediants list</h4>} */}
            {/* <Button
                theme={theme}
                onClick={() => setAddIngredient(!addIngredient)}
                > {addIngredient ? 'Done' : 'Add ingredients' }
            </Button>
            {updateingIngredient && (<Modal onClose={handleToggle} ><Update id={itemId} /></Modal>)}
            {updateRecipe && (<Modal onClose={handleToggle} ><UpdateRecipe id={itemId} /></Modal>)}
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
            </ul> */}
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
