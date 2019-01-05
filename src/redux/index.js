import { sendToFirestore } from './db';
export const initialState = 
{
    number: 0,
    toggleState: false,
    BeverageName: '',
    BeveragePrice: 0,
    BeverageType: '',
    BeverageList: [],
    selecetedItemId: ''
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
            };
        case 'FETCH_BEVERAGE_LIST':
            
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
                selecetedItemId: action.payload
            }
        default:
            return state
    }
}