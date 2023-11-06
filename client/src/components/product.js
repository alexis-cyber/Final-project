import axios from "axios";
import { useState } from "react";


function Product({ getAllProducts, products }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    expirationDate: "",
    category: ""
  });

  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    expirationDate: "",
    category: ""
  });

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
    } catch (error) {
      console.log("Error deleting product:", error);
    }
    getAllProducts();
  }

  async function addProduct() {
    try {
      await axios.post("http://localhost:8000/products", newProduct);
      setNewProduct({
        name: "",
        expirationDate: "",
        category: ""
      });
      getAllProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  async function updateProduct() {
    try {
      await axios.put(`http://localhost:8000/products/${editProduct.id}`, {
        name: editProduct.name,
        cost: editProduct.cost,
        description: editProduct.description
      });
      setEditProduct({
        id: null,
        name: "",
        cost: "",
        description: ""
      });
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div>
      {/* Render Existing Products */}
      {products.map((product) => (
        <div key={product._id} className="productCard">
          <div className="product">
            <span>{product.name}</span>
            <span>{product.cost}</span>
            <span>{product.description}</span>
            <div className="buttonsContainer">
            <button onClick={() => deleteProduct(product._id)} className="deleteButton">
              <i className="material-icons">Delete</i>
            </button>
            <button
              onClick={() => {
                setEditProduct({
                  id: product._id,
                  name: product.name,
                  cost: product.cost,
                  description: product.description
                });
              }} className="editButton"
            >
              <i className="material-icons">Edit</i>
            </button>
            </div>
          </div>

          {/* Render the text as editable input if currently being edited */}
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
                    cost: e.target.value
                  })
                }
              />
              <input
                type="text"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, description: e.target.value })
                }
              />
              <button onClick={updateProduct}>Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Product;