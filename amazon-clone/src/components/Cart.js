import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import "./Cart.css";
import Footer from "./Footer";

function Cart() {
  const count = useSelector((state) => state.product.count);
  const cartItems = useSelector((state) => state.product.cartItems);

  return (
    <>
      <Header />
      <div className="cart">
        {count === 0 ? (
          <div className="emptyCart">
            <div className="emptyCart__items">
              <img
                src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
                alt="empty"
              />
              <div className="emptyCart__itemsDeal">
                <h2>Your Amazon Cart is empty</h2>
                <p style={{ color: "#007185" }}>Shop today's deals</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart">
            <h1 onClick={() => console.log(cartItems)}>
              {cartItems.map((item) => {
                return <p key={item.id}>{item.desc}</p>;
              })}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
