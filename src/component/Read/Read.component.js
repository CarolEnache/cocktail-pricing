import React, {  useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { StateContext, DispatchContext } from '../../App';

import Create from '../create';
import Modal from '../element';
import Button from '../element/Button.component'; //TODO: Fix the File Indexing


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
    return (
        <Container>
            <h4>Hello from the Read ingrediants list</h4>
            {addIngredient && (
                <Create />
            )}
            <Button
                theme={theme}
                onClick={() => setAddIngredient(!addIngredient)}
                >Add ingredients
            </Button>
            {Updateing && (<Modal onClose={handleToggle} ></Modal>)}
            <ul>
            { state.ingredients.ingredientsList && state.ingredients.ingredientsList.map(beverageItem => {
                return (
                    <li key={beverageItem.id} id={beverageItem.id}>
                        <p>{beverageItem.ingredientName} {beverageItem.ingredientPackSize} £ {beverageItem.ingredientPrice}</p>
                        <Button theme={{ main: 'red'}} onClick={() => deleteItem(beverageItem.id)}>Delete</Button>
                        <Button theme={{ main: 'royalblue' }} onClick={() => UpdateItem(beverageItem.id)}>Edit</Button>
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
const theme = {
    main: 'mediumseagreen'
}




export default Read;
