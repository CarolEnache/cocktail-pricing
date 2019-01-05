import React, {
    createContext, 
    useReducer,
    useEffect
    } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initialState, reducer } from './redux';
import { fetchFromFirestore } from './redux/db';
import Create from './component/create';
import Edit from './component/edit';
import Show from './component/show';
import Play from './component/playground';


const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(async () => {
        const beverageList = await fetchFromFirestore('beverageList');
        dispatch({ type: 'SET_BEVERAGE_LIST', payload: beverageList });
    }, { state });

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <Router>
                    <div>
                        <Route path='/create' component={Create} />
                        <Route path='/edit/' component={Edit} />
                        <Route path='/show/:id' component={Show} />
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
