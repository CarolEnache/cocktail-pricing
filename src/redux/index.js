import { createFirestoreItem, updateFirestoreItem, deleteFirestoreItem } from './db';
export const initialState = {
    toggleState: false,
    ingredientForm: {
        ingredientName: '',
        ingredientPrice: 'ex: 10.35',
        ingredientPackSize: 'ex: 1kg is 1000',
    },
    ingredientName: '',
    ingredientPrice: 'ex: 10',
    ingredientPackSize: 'ex: 1kg is 1000',
    ingredients: [],
    updateIngredient: null,
    updateRecipe: null,
    recipeName: '',
    numberOfIngredients: 0,
    recipes: [],
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
        case 'UPDATE_INGREDIENT':
            updateFirestoreItem('ingredientsList', action.payload);
            return {
                ...state,
                ingredients: [
                    action.payload,
                    ...state.ingredients.ingredientsList.filter(b => b.id !== action.payload.id),
                ]
            }
        case 'UPDATE_RECIPE':
            updateFirestoreItem('recipesList', action.payload);
            return {
                ...state,
                ingredients: [
                    action.payload,
                    ...state.recipes.recipesList.filter(b => b.id !== action.payload.id),
                ]
            }
        case 'SET_INGREDIENTS_LIST':
            return {
                ...state,
                ingredients: action.payload
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
        case 'Update_BEVERAGE':
            return {
                ...state,
                updateIngredient: action.payload
            }
        case 'UPDATE_RECIPE_FROM_LIST':
            return {
                ...state,
                updateRecipe: action.payload
            }
        case 'CANCEL_Update_BEVERAGE':
            return {
                ...state,
                updateIngredient: null,
                updateRecipe: null
            }
        case 'DELETE_BEVERAGE':
            deleteFirestoreItem('ingredientsList', action.payload)
            return {
                ...state,
                ingredients: [
                    state.ingredients
                ]
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