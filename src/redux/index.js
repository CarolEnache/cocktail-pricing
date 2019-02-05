import { createFirestoreItem, updateFirestoreItem, deleteFirestoreItem} from './db';
export const initialState = {
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
                    ...state.beverages.filter(b => b.id !== action.payload.id),
                ]
            }
        case 'SET_BEVERAGE_LIST':
            return {
                ...state,
                beverages: action.payload
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
                editingBeverage: null
            }
        case 'DELETE_BEVERAGE':
            deleteFirestoreItem('beverageList', action.payload)
            return {
                ...state,
                beverages: [
                    ...state.beverages
                ]
            }
        default:
            return state
    }
}