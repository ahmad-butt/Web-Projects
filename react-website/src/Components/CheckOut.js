import React from 'react';
import './CheckOut.css';
import CheckOutProduct from './CheckOutProduct';
import { useStateValue } from '../StateProvider';
import SubTotal from './SubTotal';
function CheckOut() {
    const [{ basket }] = useStateValue();
    return (
        <div className={basket?.length===0 ? 'checkout' : 'checkoutFlex'}>
            <div className='checkout__left'>
                <img className='checkout__image' src='https://images-eu.ssl-images-amazon.com/images/G/31/prime/onsite/Apr18/PeX_1500x200._CB1198675309_.jpg' alt='Ad' />
                <img className='checkout__image' src='https://www.congressionalaward.org/wp-content/uploads/2018/03/AmazonSmile_LandingPageBanner.png' alt='Ad' />
                {
                    basket?.length===0 ? (
                        <h1 className='checkout__title'>Your Shopping Bag is Empty</h1>
                    ):(
                        <>
                        <h1 className='checkout__title'>Here is your Shopping Bag</h1>
                        <div className='checkout__product'>
                        {
                            basket?.map(item=>(
                                <CheckOutProduct id={item.id} info={item.info} imageURL={item.imageURL}  price={item.price} rating={item.rating}/>
                            ))
                        }
                        </div>
                        </>
                    )
                }
            </div>
            {
                basket?.length !=0 ? (
                    <div className='checkout__right'>
                        <SubTotal />
                    </div>
                ) : (
                    <p></p>
                )
            }
        </div>
    )
}

export default CheckOut
