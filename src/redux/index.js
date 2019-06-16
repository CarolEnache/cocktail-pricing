import { createFirestoreItem, updateFirestoreItem, deleteFirestoreItem } from './db';
export const initialState = {
    toggleState: false,
    updateRecipe: null,
    recipeName: '',
    numberOfIngredients: 0,
    recipes: [],
    ingredients: [],
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'BEVEREAGE_FORM_STATE':
            return {
                ...state,
                [action.name]: action.payload
            }
        case 'SELECTED_VALUE':
            return {
                ...state,
                ingredientName: action.payloadName,
                ingredientPrice: action.payloadPrice,
                ingredientPackSize: action.payloadPack,
            }
        case 'SELECTED_VALUE_PRICE':
            return {
                ...state,
                ingredientPackSize: action.payload,
            }
        case 'ADD_INGREDIENT':
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
        case 'ADD_INGREDIENT_TO_RECIPE':
            const { id, ingredientName, quantityUsed, unitPrice, unitYield } = action.payload
            const items = { ingredient: { ingredientName, quantityUsed, unitPrice, unitYield } }
            console.log(state)
            state.ingredients.push(items)
            const ingredient = state.ingredients
            const item = { id, ingredient }
            updateFirestoreItem('recipesList', item);
            return {
                ...state,
                ...state.ingredients
            }
        case 'SET_RECIPES_LIST':
            return {
                ...state,
                recipes: action.payload
            }
        case 'TOGGLE_STATE':
            return {
                ...state,
                toggleState: action.payload
            }
        case 'DELETE_RECIPE':
            deleteFirestoreItem('recipesList', action.payload)
            return {
                ...state,
                recipes: [
                    state.recipes
                ]
            }
        default:
            return state
    }
}