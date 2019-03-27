import React, { useReducer, useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { initialState, reducer } from '../../redux';
import { StateContext, DispatchContext } from '../../App';

import Form from '../element/Form.component';
import Input from '../element/Input.component';
import Button from '../element/Button.component';//TODO: Fix the File Indexing


const Create = () => {
    const data = useContext(StateContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [filter, setFilter] = useState('')

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

    const handleChange = (e) => setFilter(e.target.value)

    let items = data.ingredients.ingredientsList
    let ceva =  items.filter(f => f.ingredientName.includes(filter))
    const Option = (props) => <p id={props.item.id} onClick={(e) => selectValue(e)}>{props.item.ingredientName}</p>

    const selectValue = (e) => {
        const selectedValue = e.target.id;
        const selectedValueObject = items.filter(f => f.id === selectedValue)
        console.log(selectedValueObject);
    }



    return (
        <CreateComponentWrapper>
            <h4>Create component</h4>
            <Form onSubmit={(e) => addBeverage(e)} autocomplete="on">
                <span>Ingredient name</span>
                <Input
                    // type='text'
                    // name='ingredientName'
                    placeholder='ex: Onions'
                    // onChange={(e) => updateInput(e)}
                    onChange={(e) => handleChange(e)}
                    // value={state.ingredientName}
                    required
                />
                {ceva.map((name) => {
                    return (
                        <Option key={name.id} item={name}/>
                        )
                    })}
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
