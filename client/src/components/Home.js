import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home1.css";
import Carousel from "./carousel.js";
import category1 from "./Streetwear-2.png";
import category2 from "./jordan.jpg";
import category3 from "./tom.jpg";
import category4 from "./limited2.png";
import Footer from "./footer.js";


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
      <h1>Streetwear Fashion!</h1>
      <Carousel />
      <div className="categoriesRow">
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
        <div className="upFooter">
                <h1>GENUINE PRODUCTS</h1>
                <p>All our products are 100% authentic!</p>
                <h1>SECURE TRANSACTIONS</h1>
                <p>We provide you with absolute security for your transactions.</p>
                <h1>FAST DELIVERIES</h1>
                <p>Your products are shipped with the most trusted companies.</p>
                <h1>MONEY REFUND</h1>
                <p>Money back guarantee on your purchases.</p>
                </div>
        <Footer />
      </div>
            
    </div>
  );
}

export default Home;