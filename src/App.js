import React, {
    createContext, 
    useReducer,
    useEffect
    } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { initialState, reducer } from './redux';
import { getFirestoreItems, listenToDB } from './redux/db';

import Create from './component/create';
import Edit from './component/edit';
import Show from './component/show';
import Play from './component/playground';



const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(async () => {
        const beverages = await getFirestoreItems('beverageList');
        const updated = await listenToDB('beverageList');
        console.log(updated, 'updated', beverages, 'beverages');
        dispatch({ type: 'SET_BEVERAGE_LIST', payload: beverages });
    }, { state });

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <Router>
                    <div>
                        <Route exact path='/' component={Show} />
                        <Route path='/create' component={Create} />
                        <Route path='/edit/' component={Edit} />
                        <Route path='/play/' component={Play} />
                    </div>
                </Router>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

export default App;
