import React, {
    createContext, 
    useReducer,
    } from 'react';
import { Link } from 'react-router-dom';
import { initialState, reducer } from './redux';
import NumberStepper from './component/counter';
import Show from './component/show';
export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <div>
                    <p>You clicked {state.number} times </p>
                    <NumberStepper />
                </div>
                <h4><Link to='/create'>Add New Item</Link></h4>
                <Show />
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export default App;
