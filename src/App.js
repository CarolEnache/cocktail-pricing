import React, {
   createContext, 
   useState, 
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
  // console.log(state)
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const updateInput = e => {
    dispatch({
      type: 'BEVEREAGE_FORM_STATE', 
      name: e.target.name, 
      payload: e.target.value
    })
  }

  const addBeverage = (e) => {
    e.preventDefault()
    db.collection('beverageList').add({
      BeverageName: state.BeverageName,
      BeveragePrice: state.BeveragePrice,
      BeverageType: state.BeverageType
    })
    dispatch({type: 'BEVERAGE_FORM_SUBMIT'});
  }

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
        <form onSubmit={(e) => addBeverage(e)}>
          <input 
            type='text'
            name='BeverageName'
            placeholder='Beverage Name'
            onChange={(e) => updateInput(e)}
            value={state.BeverageName}
            />
          <input 
            type='number'
            name='BeveragePrice'
            placeholder='Beverage Price'
            onChange={(e) => updateInput(e)}
            value={state.BeveragePrice}
            />
          <input 
            type='text'
            name='BeverageType'
            placeholder='Beverage Type'
            onChange={(e) => updateInput(e)}
            value={state.BeverageType}
            />
          <button type="submit">Submit</button>
        </form>
        <div>
          <p>You clicked {state.number} times </p>
          <NumberStepper />
        </div>
        {console.log(state.BeverageList)}
        {state.BeverageList.map(beverageItem => {
          return(
            <li>{beverageItem.BeverageName} {beverageItem.BeverageType}  £ {beverageItem.BeveragePrice}</li>
          )
        })}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
