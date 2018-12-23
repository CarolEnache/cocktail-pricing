import React, { useContext} from 'react';
import { StateContext, DispatchContext } from '../../App';
import { initialState } from '../../redux';

const NumberStepper = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const plus = () => {
        dispatch({type: 'INCREMENT_NUMBER'});
    }

    const minus = () => {
        dispatch({type: 'DECREMENT_NUMBER'});
    }

    const reset = () => {
        dispatch({type: 'RESET_VALUE', payload: initialState.number});
    }

    return (
        <div>
            <button onClick={plus}>+</button>
            <button onClick={minus}>-</button>
            <button onClick={reset}>reset</button>
        </div>
    )
}

export default NumberStepper;