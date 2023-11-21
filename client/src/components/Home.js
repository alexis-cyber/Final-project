import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home1.css";
import Carousel from "./carousel.js";
import category1 from "./Streetwear-2.png";
import category2 from "./shoes.png";
import category3 from "./accesories.jpg";
import category4 from "./limited.jpg";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error from Home categories", error);
      });
  }, []);

  const categoryPhotos = {
    Clothing: category1,
    Shoes: category2,
    Accesories: category3,
    "Limited Edition": category4,
  };

  return (
    <div className="categoryDiv">
      <Carousel />
      {categories.map((category) => (
        <Link
          to={`/category/${encodeURIComponent(category)}`}
          key={category}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="categoriesContainerItem">
            <img
              src={categoryPhotos[category]}
              alt={`${category} thumbnail`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <p className="categoryText">{category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;