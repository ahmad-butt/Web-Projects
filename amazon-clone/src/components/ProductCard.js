import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/productActions";
import "./ProductCard.css";

function ProductCard(props) {
  
  const dispatch = useDispatch();

  const currentItem = {
    id: props.id,
    img: props.img,
    desc: props.desc,
    pricePrim: props.pricePrim,
    priceSec: props.priceSec
  }

  const handleAddToCart = (event)=>{
    event.preventDefault();
    dispatch(addToCart(currentItem))
  }

  return (
    <div className="productCard">
      <div className="productCard__items">
        <img
          src={props.image}
          alt="product"
        />
        <p>
          {props.desc}
        </p>
        <h4>Single Use · 48 Count</h4>
        <span className='productCard__itemsStars'>⭐⭐⭐⭐⭐</span>
        <div className='productCardItems__price'>
            <span className='productCardItems__priceSec'>$</span>
            <span className='productCardItems__pricePrim'>{props.pricePrim}</span>
            <span className='productCardItems__priceSec'>{props.priceSec}</span>
            <p>(Ships to Pakistan)</p>
        </div>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
