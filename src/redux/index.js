import { createFirestoreItem, updateFirestoreItem } from './db';
export const initialState = 
{
    number: 0,
    toggleState: false,
    BeverageName: '',
    BeveragePrice: 0,
    BeverageType: '',
    beverages: [],
    editingBeverage: null
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
                number: state.number -1
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
            createFirestoreItem('beverageList', action.payload);
            return {
                ...state,
                BeverageName: '',
                BeveragePrice: 0,
                BeverageType: ''
            }
        case 'UPDATE_BEVERAGE':
            updateFirestoreItem('beverageList', action.payload);
            return {
                ...state,
                beverages: [
                    action.payload,
                    ...state.beverages.filter(b => b.id != action.payload.id),
                ]
            }
        case 'SET_BEVERAGE_LIST':
            return {
                ...state,
                beverages: [...action.payload]
            }
        case 'TOGGLE_STATE':
            return {
                ...state,
                toggleState: action.payload
            }
        case 'EDIT_BEVERAGE':
            return {
                ...state,
                editingBeverage: action.payload
            }
        case 'CANCEL_EDIT_BEVERAGE':
            return {
                ...state,
                editingBeverage: undefined
            }
        default:
            return state
    }
}