import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

// import { initialState, reducer } from '../../redux';
import { StateContext, DispatchContext } from '../../App';

import Form from '../element/Form.component';
import Input from '../element/Input.component';
import Button from '../element/Button.component';//TODO: Fix the File Indexing

const defaultValues = {
    ingredientName: "",
    ingredientPackSize: "",
    ingredientPrice: "",
}

const Create = () => {
    const data = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [formValues, setFormValues] = useState(defaultValues)

    let items = data.ingredients.ingredientsList
    let sugestedList = items && items
        .filter(sugestedItem =>
            sugestedItem.ingredientName
                .includes(formValues.ingredientName))


    const createNewIngrediendItem = () =>
        dispatch({
            type: 'ADD_BEVERAGE',
            payload: formValues
        })
    const updateCurrentIngrediendItem = (id) =>
        dispatch({
            type: 'UPDATE_BEVERAGE',
            payload: {
                ...formValues,
                id
            }
        })
    const updateInput = e => {
        dispatch({
            type: 'BEVEREAGE_FORM_STATE',
            name: e.target.name,
            payload: e.target.value
        })
    }

    const Option = (props) =>
        <p
            id={props.id}
            onClick={(e) => selectValue(e)}>
                {props.ingredientName}
        </p>

    const addBeverage = (e) => {
        e.preventDefault()
        const currentIngredient = sugestedList && sugestedList
            .filter(sugestedItem =>
                sugestedItem.ingredientName
                    .includes(formValues.ingredientName))

        const createOrUpdate = currentIngredient.length === 1
        createOrUpdate ? updateCurrentIngrediendItem(currentIngredient[0].id) : createNewIngrediendItem()
    }

    const selectValue = (e) => {
        const selectedValue = e.target.id;
        const selectedValueObject = items.filter(f => f.id === selectedValue)
        const { ingredientName, ingredientPackSize, ingredientPrice } = selectedValueObject[0]
        dispatch({
            type: 'SELECTED_VALUE',
            name: ingredientName,
            payload: ingredientName,
        })
        setFormValues({
            ...formValues,
            ingredientName,
            ingredientPackSize,
            ingredientPrice
        })
        updateInput(e)
    }

    return (
        <CreateComponentWrapper>
            <h4>Add ingredients</h4>
            <Form onSubmit={(e) => addBeverage(e)} autocomplete="off">
                <span>Ingredient name</span>
                <Input
                    type='text'
                    name='ingredientName'
                    placeholder='ex: Onions'
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientName: e.target.value
                    })}
                    value={formValues.ingredientName}
                    required
                />
                {sugestedList && sugestedList.map(({ id, ingredientName }) => {
                    return (
                        <Option id={id} ingredientName={ingredientName}/>
                        )
                    })}
                <span>Ingredient Price per unit</span>
                <Input
                    type='number'
                    step="any"
                    name='ingredientPrice'
                    placeholder='ex: 10.35'
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientPrice: e.target.value
                    })}
                    required
                    value={formValues.ingredientPrice}
                />
                <span>Packege size per unit</span>
                <Input
                    type='number'
                    name='ingredientPackSize'
                    placeholder='ex: 1kg is 1000'
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientPackSize: e.target.value
                    })}
                    required
                    value={formValues.ingredientPackSize}
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
