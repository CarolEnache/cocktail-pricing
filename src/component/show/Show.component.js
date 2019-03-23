import React, {  useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { StateContext, DispatchContext } from '../../App';
import Modal from '../element';


const Show = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    let editing = !!state.updateIngredient;

    const deleteItem = (id) => {
        dispatch({ type: 'DELETE_BEVERAGE', payload: id })
    }

    const editItem = (id) => {
        dispatch({ type: 'EDIT_BEVERAGE', payload: id });
    }
    const handleToggle = ( ) => {
        dispatch({ type: 'CANCEL_EDIT_BEVERAGE' });
    }
    return (
        <Container>
            <h1>Hello from the Show Component</h1>
            <h4><Link to='/create'>Add More Items</Link></h4>
            {editing && (<Modal onClose={handleToggle} ></Modal>)}
            <ul>
            { state.ingredients.ingredientsList && state.ingredients.ingredientsList.map(beverageItem => {
                return (
                    <li key={beverageItem.id} id={beverageItem.id}>
                        <p>{beverageItem.ingredientName} {beverageItem.ingredientPackSize} £ {beverageItem.ingredientPrice}</p>
                        <button onClick={() => deleteItem(beverageItem.id)}>Delete</button>
                        <button onClick={() => editItem(beverageItem.id)}>Edit</button>
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

export default Show;
