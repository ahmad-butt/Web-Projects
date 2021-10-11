import React from "react";
import "./CategoryCard.css";

function CategoryCard(props) {
  return (
    <div className="categoryCard">
      <div className="categoryCard__items">
        <h3>{props.categoryName}</h3>
        <img
          src={props.imageLink}
          alt="category"
        />
        <p>See more</p>
      </div>
    </div>
  );
}

export default CategoryCard;
