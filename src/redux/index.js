import { sendToFirestore } from "./db";

export const initialState = {
    number: 0,
    toggleState: false,
    beverageName: '',
    beveragePrice: 0,
    beverageType: '',
    BeverageList: []
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'BEVEREAGE_FORM_STATE':
            return {
                ...state,
                [action.name]: action.payload
            }
        case 'ADD_BEVERAGE':
            sendToFirestore('beverageList', action.payload);
            return {
                ...state,
                beverageName: '',
                beveragePrice: 0,
                beverageType: ''
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
        default:
            return state
    }
}