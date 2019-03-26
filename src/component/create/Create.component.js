import React, { useReducer } from 'react';
import styled from 'styled-components/macro';

import { initialState, reducer } from '../../redux';

import Form from '../element/Form.component';
import Input from '../element/Input.component';
import Button from '../element/Button.component';//TODO: Fix the File Indexing


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

    return (
        <CreateComponentWrapper>
            <h4>Create component</h4>
            <Form onSubmit={(e) => addBeverage(e)}>
                <span>Ingredient name</span>
                <Input
                    type='text'
                    name='ingredientName'
                    placeholder='ex: Onions'
                    onChange={(e) => updateInput(e)}
                    value={state.ingredientName}
                    required
                />
                <span>Ingredient Price per unit</span>
                <Input
                    type='number'
                    step="any"
                    name='ingredientPrice'
                    placeholder='ex: 10.35'
                    onChange={(e) => updateInput(e)}
                    required
                    value={state.ingredientPrice}
                />
                <span>Packege size per unit</span>
                <Input
                    type='number'
                    name='ingredientPackSize'
                    placeholder='ex: 1kg is 1000'
                    onChange={(e) => updateInput(e)}
                    required
                    value={state.ingredientPackSize}
                />
                <Button theme={theme} type="submit">Submit</Button>
            </Form>
        </CreateComponentWrapper>
    )
}

const CreateComponentWrapper = styled.div`
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

export default Create;
