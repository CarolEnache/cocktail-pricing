import React, { createContext, useState, useEffect, useReducer } from 'react';
import { initialState, reducer } from './redux';
import NumberStepper from './component/counter'
import './App.css';

export const StateContext = createContext(initialState);
export const DispatchContext = createContext();

const App = () => {
  //Declare a new state variable, which we'll call 'count'
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //Update the document title using the browser API
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
