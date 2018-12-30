import React, {
   createContext, 
   useEffect, 
   useReducer,
  } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';
import { initialState, reducer } from './redux';
import NumberStepper from './component/counter';

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

const App = () => {
  //Declare a new state variable, which we'll call 'count'
  const [state, dispatch] = useReducer(reducer, initialState);
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  useEffect(() => {
    //Update the document title using the browser API
    document.title = `You  clicked ${state.number} times`;

    db.collection('beverageList').get().then((querySnapshot) => {
      const beverageItems = []
      querySnapshot.forEach(doc => {
        beverageItems.push(Object.assign({ id: doc.id, ...doc.data()}))
      })
      dispatch({type: 'BEVERAGE_LIST', payload: beverageItems})
    })
  }, {db});

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div>
          <p>You clicked {state.number} times </p>
          <NumberStepper />
        </div>
        {console.log(state.BeverageList)}
        {state.BeverageList.map(beverageItem => {
          return(
            <li>{beverageItem.BeverageName} {beverageItem.BeverageType} £ {beverageItem.BeveragePrice}</li>
          )
        })}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
