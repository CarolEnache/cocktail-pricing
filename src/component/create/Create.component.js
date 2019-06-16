import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

// import { initialState, reducer } from '../../redux';
import { StateContext, DispatchContext } from '../../App';

import Form from '../element/Form.component';
import Input from '../element/Input.component';
import Button from '../element/Button.component';//TODO: Fix the File Indexing

const defaultValues = {
    // id: '',
    ingredientName: "",
    ingredientPackSize: "",
    ingredientPrice: "",
}

const Create = () => {
    const data = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [formValues, setFormValues] = useState(defaultValues)
    const [selected, setSelected] = useState(false)
    const [focus, setFocus] = useState(false)
    let items = data.ingredients.ingredientsList
    let sugestedList = items && items
        .filter(sugestedItem =>
            sugestedItem.ingredientName
                .includes(formValues.ingredientName))

    const createNewIngrediendItem = () =>
        dispatch({
            type: 'ADD_INGREDIENT',
            payload: formValues
        })

    const updateCurrentIngrediendItem = () =>
        dispatch({
            type: 'UPDATE_INGREDIENT',
            payload: formValues
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

        // const currentIngredient = sugestedList && sugestedList
        //     .filter(sugestedItem =>
        //         sugestedItem.ingredientName
        //             .includes(formValues.ingredientName))

        return createNewIngrediendItem()
    }

    const selectValue = (e) => {
        const selectedValue = e.target.id;
        const selectedValueObject = items.filter(f => f.id === selectedValue)
        const { ingredientName, ingredientPackSize, ingredientPrice} = selectedValueObject[0]

        setFormValues({
            ...formValues,
            // id: selectedValue,
            ingredientName: ingredientName,
            ingredientPackSize: ingredientPackSize,
            ingredientPrice: ingredientPrice,
        })

        dispatch({
            type: 'SELECTED_VALUE',
            name: ingredientName,
            payloadName: ingredientName,
            payloadPrice: ingredientPrice,
            payloadPack: ingredientPackSize,
        })

        updateInput(e)
        setSelected(true)
    }

    return (
        <CreateComponentWrapper>
            <h4>Add ingredients</h4>
            <Form onSubmit={(e) => addBeverage(e)} autoComplete="off">
                <span>Ingredient name</span>
                <Input
                    type='text'
                    name='ingredientName'
                    placeholder='ex: Onions'
                    autoComplete="off"
                    onChange={(e) => setFormValues({
                        ...formValues,
                        ingredientName: e.target.value
                    })}
                    onFocus={() => setFocus(true)}
                    // onBlur={() => setFocus(false)}
                    value={formValues.ingredientName}
                    required
                />
                {sugestedList && focus && !selected && sugestedList.map(({ id, ingredientName }) => {
                    return (
                        <Option id={id} ingredientName={ingredientName}/>
                        )
                    })}
                <span>Ingredient price per unit</span>
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
                <span>Packege size per unit in grams or milliliters</span>
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
