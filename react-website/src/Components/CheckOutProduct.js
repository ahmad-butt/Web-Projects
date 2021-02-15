import React from 'react'
import './CheckOutProduct.css'
import { useStateValue } from '../StateProvider';
function CheckOutProduct(props) {

    const [{ basket }, dispatch] = useStateValue();

    const arr = new Array(props.rating);
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: props.id,
        })
        console.log('Removed');
        // console.log(props.id);
    }
    return (
        <div className='checkOutProduct'>
            <div>
                <img className='checkOutProduct__image' src={props.imageURL} />
            </div>
            <div className='checkOutProduct__info'>
                <p>{props.info}</p>
                <p className='checkOutProduct__price'>
                    <small>$</small>
                    <strong>{props.price}</strong>
                    <div className='checkOutProduct__rating'>
                        {
                            arr.fill(<p>⭐</p>)
                        }
                    </div>
                </p>
                <button className='checkOutProduct__button' onClick={removeFromBasket} >Remove From Basket</button>
            </div>
        </div>
    )
}

export default CheckOutProduct
