import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import './SubTotal.css'
function SubTotal() {
    const [{ basket, totalPrice }] = useStateValue();
    return (
        <div className='subtotal'>
            <div className='subtotal__info'>
                <p className='subtotal__info'>Subtotal ({`${basket?.length}`} items): <strong>${totalPrice}</strong></p>
                <p className='subtotal__info'><input type='checkbox'/> This order contains a gift</p>
            </div>
            <button className='subtotal__button'><span className='subtotal__buttonInfo'>Proceed to Checkout</span></button>
        </div>
    )
}

export default SubTotal