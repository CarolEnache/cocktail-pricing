import React, {  useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from '../../App';

import Create from '../create';
import Modal from '../element';


const Read = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [addIngredient, setAddIngredient] = useState(false)
    let Updateing = !!state.updateIngredient;

    const deleteItem = (id) => {
        dispatch({ type: 'DELETE_BEVERAGE', payload: id })
    }

    const UpdateItem = (id) => {
        dispatch({ type: 'Update_BEVERAGE', payload: id });
    }
    const handleToggle = ( ) => {
        dispatch({ type: 'CANCEL_Update_BEVERAGE' });
    }
    console.log(addIngredient)

    return (
        <Container>
            <h1>Hello from the Read Component</h1>
            {addIngredient && (
                <Create />
            )}
            <button onClick={(e) => setAddIngredient(!addIngredient)}>Add ingredients</button>
            {Updateing && (<Modal onClose={handleToggle} ></Modal>)}
            <ul>
            { state.ingredients.ingredientsList && state.ingredients.ingredientsList.map(beverageItem => {
                return (
                    <li key={beverageItem.id} id={beverageItem.id}>
                        <p>{beverageItem.ingredientName} {beverageItem.ingredientPackSize} £ {beverageItem.ingredientPrice}</p>
                        <button onClick={() => deleteItem(beverageItem.id)}>Delete</button>
                        <button onClick={() => UpdateItem(beverageItem.id)}>Edit</button>
                    </li>
                )
            })}
            </ul>
        </Container>
    )
}

const Container = styled.div`
    text-align: center;
`

export default Read;
