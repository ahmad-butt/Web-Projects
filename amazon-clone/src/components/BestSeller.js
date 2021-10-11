import React from "react";
import "./BestSeller.css";

function BestSeller(props) {
  return (
    <div className="bestSeller">
      <div className="bestSeller__items">
        <div className="bestSeller__header">
          <h3>Best Sellers in Kitchen</h3>
          <p>Shop now</p>
        </div>
        <div className="bestSeller__productContainer">
          {props?.products.map((product) => {
            return (
              <img
                key={product.id}
                className="bestSeller__product"
                src={product.img}
                alt="bestSellerProduct"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
