export const initialState = {
    number: 0
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
        default:
            return state
    }
}