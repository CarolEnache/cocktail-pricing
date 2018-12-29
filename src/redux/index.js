export const initialState = {
    number: 0,
    BeverageName: '',
    BeveragePrice: 0,
    BeverageType: ''
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
        case 'BEVERAGE_FORM_SUBMIT':
            return {
                ...state,
                BeverageName: '',
                BeveragePrice: 0,
                BeverageType: ''
            }
        default:
            return state
    }
}