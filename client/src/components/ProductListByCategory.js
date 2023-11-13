import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductListByCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    cost: "",
    description: "",
  });
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/category/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
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
      <h1>Products in {category}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
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
                      cost: product.cost,
                      description: product.description,
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
                      setEditProduct({ ...editProduct, name: e.target.value })
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

              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.cost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ProductListByCategory;