export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (newItem)=>{
    return {
        type: ADD_TO_CART,
        newItem: newItem
    }
}