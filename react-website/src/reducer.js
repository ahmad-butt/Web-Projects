export const initialState = {
    basket: [
        // {
        //     id: 102020,
        //     info: 'Sony Playstation 4 1TB Console - FIFA 20 Bundle',
        //     price: 400,
        //     imageURL: 'https://d11zer3aoz69xt.cloudfront.net/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/s/o/sony_playstation_4_1tb_console_-_fifa_20_bundle_1_1.jpg',
        //     rating: 5,
        // },{
        //     id: 102020,
        //     info: 'Sony Playstation 4 1TB Console - FIFA 20 Bundle',
        //     price: 400,
        //     imageURL: 'https://d11zer3aoz69xt.cloudfront.net/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/s/o/sony_playstation_4_1tb_console_-_fifa_20_bundle_1_1.jpg',
        //     rating: 5,
        // }
    ],
    totalPrice: 0,
    user: null,
};

function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
        case 'SET_USER': {
            return {
                ...state,
                user: action.user,
            }
        }
        case 'ADD_TO_BASKET': {
            //Logic
            return {
                ...state,
                basket: [...state.basket, action.item],
                totalPrice: state.totalPrice + action.item.price,
            };
        }
        case 'REMOVE_FROM_BASKET':
            //Logic
            let newBasket = [...state.basket];
            let newTotalPrice = state.totalPrice;
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            if (index >= 0) {
                const newO = newBasket.find((basketItem) => basketItem.id === action.id);
                newBasket.splice(index, 1);
                newTotalPrice = newTotalPrice - newO.price;
            } else {
                console.warn('No Such Item Found');
            }
            return {
                ...state, basket: newBasket,
                totalPrice: newTotalPrice,
            }
        default:
            return state;
    }
}
export default reducer;