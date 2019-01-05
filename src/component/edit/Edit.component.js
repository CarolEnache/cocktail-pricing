import React,{ useContext, useState } from 'react';
import { StateContext, DispatchContext } from '../../App';

const Edit = () => {

    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const item = state.beverages.find(bev => bev.id == state.editingBeverage);

    const [formValues, setFormValues] = useState(item);

    const editBeverage = (e) => {
        dispatch({ type: 'UPDATE_BEVERAGE', payload: formValues });
        dispatch({ type: 'CANCEL_EDIT_BEVERAGE' });
        e.preventDefault();
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