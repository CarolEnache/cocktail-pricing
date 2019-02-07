import React, {
    createContext, 
    useReducer,
    useEffect
    } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from './firebase';
import { initialState, reducer } from './redux';
import Create from './component/create';
import Edit from './component/edit';
import Show from './component/show';
import Play from './component/playground';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        db.collection('beverageList').onSnapshot(snapshot => {
            const bvList = {
                beverageList: snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
            };
            dispatch({ type: 'SET_BEVERAGE_LIST', payload: bvList });
        });
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
