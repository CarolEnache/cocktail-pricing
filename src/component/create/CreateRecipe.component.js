import React, { useReducer } from 'react';
import styled from 'styled-components/macro';

import { initialState, reducer } from '../../redux';

import Form from '../element/Form.component';
import Input from '../element/Input.component';
import Button from '../element/Button.component';//TODO: Fix the File Indexing


const CreateRecipe = () => {
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
            type: 'ADD_RECIPE',
            payload: {
                recipeName: state.recipeName,
                numberOfIngredients: state.numberOfIngredients
            }
        });
    }

    return (
        <CreateRecipeComponentWrapper>
            <h4>Create recipe</h4>
            <Form onSubmit={(e) => addBeverage(e)}>
                <span>Recipe name</span>
                <Input
                    type='text'
                    name='recipeName'
                    placeholder='ex: Lasagna'
                    onChange={(e) => updateInput(e)}
                    value={state.recipeName}
                    required
                />
                <span>Serves:</span>
                <Input
                    type='number'
                    // step="any"
                    name='numberOfIngredients'
                    placeholder='ex: 4'
                    onChange={(e) => updateInput(e)}
                    required
                    value={state.numberOfIngredients}
                />
                <Button theme={theme} type="submit">Submit</Button>
            </Form>
        </CreateRecipeComponentWrapper>
    )
}

const CreateRecipeComponentWrapper = styled.div`
    // position: fixed;
    width: 100%;
    background-color: #FAFAFA;
    margin-bottom: 2em;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
            box-shadow: 0 10px 6px -6px #777;
`;

const theme = {
    main: 'mediumseagreen',
}

export default CreateRecipe;
