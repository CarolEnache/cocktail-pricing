import React, {
    createContext,
    useReducer,
    useEffect
    } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from './firebase';
import { initialState, reducer } from './redux';
import Create from './component/create';
import Update from './component/Update';
import Read from './component/Read';
import Play from './component/playground';

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        db.collection('ingredientsList').onSnapshot(snapshot => {
            const bvList = {
                ingredientsList: snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
            };
            console.log(bvList)
            dispatch({ type: 'SET_BEVERAGE_LIST', payload: bvList });
        });
    }, { state });
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <Router>
                    <div>
                        <Route exact path='/' component={Read} />
                        {/* <Route path='/create' component={Create} /> */}
                        <Route path='/Update/' component={Update} />
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
