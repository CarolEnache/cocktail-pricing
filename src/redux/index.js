import { createFirestoreItem, updateFirestoreItem, deleteFirestoreItem} from './db';
export const initialState = {
    toggleState: false,
    ingredientName: '',
    ingredientPrice: 'ex: 10.35',
    ingredientPackSize: 'ex: 1kg is 1000',
    ingredients: [],
    updateIngredient: null,
    recipeName: '',
    numberOfIngredients: 0
}

export const reducer = (state, action) => {

    switch(action.type) {
        case 'BEVEREAGE_FORM_STATE':
            return {
                ...state,
                [action.name]: action.payload
            }
        case 'ADD_BEVERAGE':
            createFirestoreItem('ingredientsList', action.payload);
            return {
                ...state,
                ingredientName: '',
                ingredientPrice: 'ex: 10.35',
                ingredientPackSize: 'ex: 1kg is 1000',
            }
        case 'ADD_RECIPE':
            createFirestoreItem('recipesList', action.payload);
            return {
                ...state,
                recipeName:'ex: Lasagna',
                numberOfIngredients: 'ex: 4',
            }
        case 'UPDATE_BEVERAGE':
            updateFirestoreItem('ingredientsList', action.payload);
            return {
                ...state,
                ingredients: [
                    action.payload,
                    ...state.ingredients.ingredientsList.filter(b => b.id !== action.payload.id),
                ]
            }
        case 'SET_BEVERAGE_LIST':
            return {
                ...state,
                ingredients: action.payload
            }
        case 'TOGGLE_STATE':
            return {
                ...state,
                toggleState: action.payload
            }
        case 'Update_BEVERAGE':
            return {
                ...state,
                updateIngredient: action.payload
            }
        case 'CANCEL_Update_BEVERAGE':
            return {
                ...state,
                updateIngredient: null
            }
        case 'DELETE_BEVERAGE':
            deleteFirestoreItem('ingredientsList', action.payload)
            return {
                ...state,
                ingredients: [
                    state.ingredients
                ]
            }
        default:
            return state
    }
}