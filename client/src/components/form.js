import { useState } from "react";
import axios from "axios";


function Form({ getAllProducts }) {
    let token = localStorage.getItem("token");
    const [product, setProduct] = useState({
        name: {
            type: String,
          },
          cost: {
            type: Number,
          },
          description: {
            type: String,
          }
    });

    function handleInputChange(e) {
        const value = e.target.value;
        setProduct({
            ...product, [e.target.name]: value,
        });
    }

    const addNewProduct = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/create", product, {headers:{Authorization:`Bearer ${token}`}})
        .then(() => { 
            getAllProducts();
        })
        .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="formContainer">
                <form onSubmit={(e) => {addNewProduct(e)}} className="form">
                    <label>Product Name</label><br/>
                    <input type="text" name="name" onChange={handleInputChange} value={product.name}/><br/>
                    <label>Price</label><br/>
                    <input type="date" name="expirationDate" onChange={handleInputChange} value={product.cost}/><br/>
                    <label>Description</label><br/>
                    <input type="text" name="category" onChange={handleInputChange} value={product.description}/><br/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Form;