import React from "react";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "./CategoryCard";
import BestSeller from "./BestSeller";
import {
  backgroundImages,
  bestSellerProducts1,
  categories,
} from "../data/data";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Header from "./Header";

function Home() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <Header />
    <div className="home">
      <Slider className="home__slider" {...settings}>
        {backgroundImages.map((backgroundImage) => {
          return (
            <div key={backgroundImage.id}>
              <img
                className="home__background"
                src={backgroundImage.img}
                alt="background"
              />
            </div>
          );
        })}
      </Slider>
      <div className="home__categoryContainer-1">
        {categories.map((category) => {
          return (
            <Link key={category.id} className='link' to={`/${category.categoryName}`}>
              <CategoryCard
                className="categoryCard"
                categoryName={category.categoryName}
                imageLink={category.img}
              />
            </Link>
          );
        })}
      </div>
      <BestSeller products={bestSellerProducts1} />
      <div className="home__signin">
        <div className="home__signinItems">
          <span>See personalized recommendations</span>
          <Link to='/login'><button>Sign in</button></Link>
          <span>New Customer? Start here</span>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default Home;
