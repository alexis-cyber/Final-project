import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./list.css"
import Footer from "./footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    cost: "",
    description: "",
    image: "",
  });
  const { category } = useParams();

  const ADMIN = "alex@gmail.com";
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/category/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [category]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:8000/${editProduct.id}`, {
        name: editProduct.name,
        cost: editProduct.cost,
        description: editProduct.description,
      });
      setEditProduct({
        id: null,
        name: "",
        cost: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div>
    <div classname="productListCat">
        {products.map((product) => (
          <div className="productDiv" key={product._id}>
            <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.cost}$</p>
            </Link>
            
            {token && decoded.email === ADMIN && (
              <div>
                <div className="buttonsContainer">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="deleteButton"
                  >
                    <i className="material-icons">Delete</i>
                  </button>
                  <button
                    onClick={() => {
                      setEditProduct({
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        cost: product.cost,
                        image: product.image,
                      });
                    }}
                    className="editButton"
                  >
                    <i className="material-icons">Edit</i>
                  </button>
                </div>
                {editProduct.id === product._id && (
                  <div className="editForm">
                    <input
                      type="text"
                      value={editProduct.name}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editProduct.cost}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          cost: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editProduct.description}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <button onClick={updateProduct}>Save</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
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
export default ProductList;
