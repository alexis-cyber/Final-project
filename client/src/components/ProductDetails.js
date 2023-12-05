import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./details.css"
import Footer from "./footer"

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  let token;
  let decoded;
  try {
    token = localStorage.getItem("token");

    if (token) {
      decoded = jwtDecode(token);
    }
    // console.log("Token:", token);
    // console.log("Decoded:", decoded);
  } catch (error) {
    console.log("Invalid token", error);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem(`cartItems_${decoded?.id}`)) || [];
    const updatedCartItems = [...existingCartItems, product];

    localStorage.setItem(
      `cartItems_${decoded?.id}`,
      JSON.stringify(updatedCartItems)
    );

    alert("Product added to cart!");
  };

  return (
    <div className="productDetailsContainer">
      <div className="productDetails">
        <p>{product.name}</p>
        <p>{product.cost}$</p>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
      </div>

      <button className="addToCartButton" onClick={addToCart}>
        Add to Cart
      </button>
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
      <Footer/>
    </div>
    
  );
  
};

export default ProductDetails;
