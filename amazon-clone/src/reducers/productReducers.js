import { ADD_TO_CART } from "../actions/productActions";

const initialState = {
    count: 0,
    cartItems: [],
}

const productReducer = (state=initialState, action)=>{
    switch(action.type) {
        case ADD_TO_CART: {
            const newItem = action.newItem;
            return {
                ...state, count: state.count+1, cartItems: state.cartItems.concat(newItem)
            }
        }
        default: return state;
    }
}

export default productReducer;