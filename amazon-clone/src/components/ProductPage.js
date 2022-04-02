import React from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./ProductPage.css";

function ProductPage(props) {
  return (
    <>
      <Header />
      <div className="productPage">
        <div className="productPage__items">
          <p>
            Price and other details may vary based on product size and color.
          </p>
          <div className="productPage__productContainer">
            {props.products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.img}
                  desc={product.description}
                  pricePrim={product.price.prim}
                  priceSec={product.price.sec}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
