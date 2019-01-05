import { sendToFirestore, updateFirestore } from './db';
export const initialState = 
{
    number: 0,
    toggleState: false,
    BeverageName: '',
    BeveragePrice: 0,
    BeverageType: '',
    BeverageList: [],
    selectedItemId: null
}


export const reducer = (state, action) => {

    switch(action.type) {
        case 'INCREMENT_NUMBER':
            return {
                ...state,
                number: state.number + 1
            }
        case 'DECREMENT_NUMBER':
            return {
                ...state,
                number:state.number -1
            }
        case 'RESET_VALUE':
            return {
                ...state,
                number: action.payload
            }
        case 'BEVEREAGE_FORM_STATE':
            return {
                ...state,
                [action.name]: action.payload
            }
        case 'ADD_BEVERAGE':
            sendToFirestore('beverageList', action.payload);
            return {
                ...state,
                BeverageName: '',
                BeveragePrice: 0,
                BeverageType: ''
            }
        case 'UPDATE_BEVERAGE':
            updateFirestore('beverageList', action.payload.id, action.payload, action.payload.item);
            return {
                ...state,
                BeverageList: [
                    action.payload.item,
                    ...state.BeverageList.filter(b => b.id != action.payload.id),
                ]
            }
        case 'SET_BEVERAGE_LIST':
            return {
                ...state,
                BeverageList: [...action.payload]
            }
        case 'BEVERAGE_LIST': 
            return {
                ...state,
                BeverageList: [...action.payload]
            }
        case 'TOGGLE_STATE':
            return {
                ...state,
                toggleState: action.payload
            }
        case 'SELECTED_ITEM_ID':
            return {
                ...state,
                selectedItemId: action.payload
            }
        default:
            return state
    }
}