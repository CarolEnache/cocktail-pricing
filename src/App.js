import React, { createContext, useState, useEffect, useReducer } from 'react';
import { database } from './firebase';
import { initialState, reducer } from './redux';
import NumberStepper from './component/counter'
import './App.css';

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

const App = () => {
  //Declare a new state variable, which we'll call 'count'
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState(null)

  useEffect(() => {
    //console any changes in the database
    database.ref().on('value', () => {
      console.log('data changed')
    });
    //Update the document title using the browser API
    console.log('component did mount');
    document.title = `You  clicked ${state.number} times`;
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div>
          <p>You clicked {state.number} times </p>
          <NumberStepper />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
