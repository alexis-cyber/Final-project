import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";


function AddProduct({ getAllProducts}) {
    let token = localStorage.getItem("token");
    // const navigate = useNavigate();
    const [product, setProduct] = useState({
      name: "",
      cost: "",
      description: "",
      category: "",
    });

    const handleInputChange = (e) => {
      const value = e.target.value;
      setProduct({
        ...product,
        [e.target.name]: value,
      });
    };
    

    
    const validForm = () => {
      return (
        product.name.trim() !== "" &&
        product.cost.trim() !== "" &&
        product.description.trim() !== ""
      );
    };
  
    function addNewProduct(e) {
      e.preventDefault();
      if (!validForm()) {
        alert("Please fill in all fields.");
        return;
      }
  
      axios
        .post("http://localhost:8000/create", product, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          getAllProducts();
        //   navigate("/");
        })
  
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <div>
      <div className="inputDiv">
        <form className="form1" onSubmit={addNewProduct}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name (required)"
            onChange={handleInputChange}
            value={product.name}
          /><br></br>
          <label>Price:</label>
          <input
            type="text"
            name="cost"
            placeholder="Price (required)"
            onChange={handleInputChange}
            value={product.cost}
          /><br></br>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description (required)"
            onChange={handleInputChange}
            value={product.description}
          /><br></br>
          <label>Category:</label>
          <input
            type="input"
            name="category"
            placeholder="Category (required)"
            onChange={handleInputChange}
            value={product.category}
          /><br></br>
          <button type="submit" className="addProductBtn">
            ADD
          </button>
        </form>
      </div>
    </div>
);
      
}
export default AddProduct;