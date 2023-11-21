import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import category1 from "./Streetwear-2.png";
import category2 from "./shoes.png";
import category3 from "./accesories.jpg";
import category4 from "./limited.jpg";
import "./carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

//   const imageStyle = {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//   };

  return (
    <Slider {...settings}>
      <div id="carouselDiv">
        <img src={category1} alt="Category 1" />
      </div>
      <div>
        <img src={category2} alt="Category 2"  />
      </div>
      <div>
        <img src={category3} alt="Category 3"  />
      </div>
      <div>
        <img src={category4} alt="Category 4"  />
      </div>
    </Slider>
  );
};

export default Carousel;