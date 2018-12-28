import React, {
   createContext, 
   useState, 
   useEffect, 
   useReducer,
   useRef 
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

  const ref = useRef(firebase.firestore().collection('boards'));
  const unsubscribe = useRef(null);
  const [boards, setBoards] = useState([]);
  
  const onCollectionUpdate = (querySnapshot) => {
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const { title, descritption, author } = doc.data();
      //need to refactor this push() method
      boards.push({
        key: doc.id,
        doc, //DocumentSnapshot
        title,
        descritption,
        author,
      });
    });
    setBoards(boards)
  }
  
  useEffect(() => {
    console.log( )
    unsubscribe.current = ref.current.onSnapshot(() => onCollectionUpdate)
    console.log(unsubscribe)
    //Update the document title using the browser API
    document.title = `You  clicked ${state.number} times`;
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className='container'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title'>
                BOARD LIST
              </h3>
            </div>
          </div> 
          <div className='panel-body'>
            <h4><Link to='/create'>Add Board</Link></h4>
            <table className='table table-stipe'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {boards.map(board =>
                    <tr>
                      <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                      <td>{board.description}</td>
                      <td>{board.author}</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
          <div>
            <p>You clicked {state.number} times </p>
            <NumberStepper />          
          </div>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App;
