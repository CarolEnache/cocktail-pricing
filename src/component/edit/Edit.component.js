import React,{ useContext, useState } from 'react';
import { StateContext, DispatchContext } from '../../App';

const Edit = () => {

    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const item = state.BeverageList.find(bev => bev.id == state.selectedItemId);

    const [formValues, setFormValues] = useState(item);

    console.log(formValues);
    const editBeverage = (e) => {
        e.preventDefault();
        dispatch({ 
            type: 'UPDATE_BEVERAGE', 
            payload: {
                id: item.id,
                item: formValues
            } 
        });
        dispatch({ type: 'SELECTED_ITEM_ID', payload: null });
    }

    return (
        <div>
            <h1>Edit your item here:</h1>
            <form onSubmit={(e) => editBeverage(e)}>
                <label htmlFor="BeverageName">
                    Name
                </label>
                <input 
                    type="text" 
                    name="BeverageName"
                    onChange={(e) => setFormValues({ ...formValues, BeverageName: e.target.value })}
                    value={formValues.BeverageName}
                />
                <label htmlFor="BeveragePrice">Price</label>
                <input 
                    type="number" 
                    name="BeveragePrice" 
                    onChange={(e) => setFormValues({ ...formValues, BeveragePrice: e.target.value })}
                    value={formValues.BeveragePrice}
                />
                <label htmlFor="BeverageType">Type</label>
                <input 
                    type="text" 
                    name="BeverageType" 
                    onChange={(e) => setFormValues({ ...formValues, BeverageType: e.target.value })}
                    value={formValues.BeverageType}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default Edit;