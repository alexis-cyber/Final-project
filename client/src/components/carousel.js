import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./carousel.css";

import category1 from "./jordan.jpg";
import category2 from "./limited2.png";
import category3 from "./Streetwear-2.png";
import category4 from "./tom.jpg";

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500, 
    fade: true,
  };

  const categories = [category1, category2, category3, category4];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div className="center-slide" key={index}>
            <img src={category} alt={`Category ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;