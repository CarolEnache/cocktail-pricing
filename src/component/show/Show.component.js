import React, {  useContext } from 'react';
import { StateContext, DispatchContext } from '../../App';
import Modal from '../element';

const Show = () => {
    
    const state    = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const editing  = !!state.editingBeverage;

    const deleteItem = (id) => {
        
    }

    const editItem = (id) => {
        dispatch({ type: 'EDIT_BEVERAGE', payload: id });
    }
    
    const handleToggle = ( ) => {

    }

    return (
        <div>
            <h1>Hello from the Show Component</h1>
            {editing && (<Modal onClose={handleToggle} ></Modal>)}
            {state.beverages.map(beverageItem => {
                return (
                    <div key={beverageItem.id} id={beverageItem.id}>
                        <li>{beverageItem.BeverageName} {beverageItem.BeverageType} £ {beverageItem.BeveragePrice}</li>
                        <button onClick={() => deleteItem(beverageItem.id)}>Delete</button>
                        <button onClick={() => editItem(beverageItem.id)}>Edit</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Show;
/**
 * TODOS:
 * 1 UPDATE EXISTANT DOCUMENTS IN THE DB =====DONE======
 * 2 CREATE THE TOGGLE COMPONENT === NOT NEEDED
 * 3 CREATE THE PORTAL =====DONE========
 * 4 CREATE THE MODAL =====DONE=====
 */
