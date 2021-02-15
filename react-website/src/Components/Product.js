import React from 'react'
import './Product.css'
import { useStateValue } from '../StateProvider';
function Product(props) {
    const arr = new Array(props.rating);
    const [{basket},dispatch] = useStateValue();
    const addToBasket = ()=>{
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id: props.id,
                info: props.info,
                price: props.price,
                imageURL: props.imageURL,
                rating: props.rating
            }
        });
    }
    return (
        <div className='product'>
            <div className='product__info'>
                <p>{props.info}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{props.price}</strong>
                    <div className='product__rating'>
                        {
                            arr.fill(<p>⭐</p>)
                        }
                    </div>
                    {/* <p>⭐</p>
                    <p>⭐</p> */}
                </p>
            </div>
            <img src={props.imageURL} alt='' />
            <button className='product__button' onClick={addToBasket}>Add to cart</button>
        </div>
    )
}
export default Product
