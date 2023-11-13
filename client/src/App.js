// import React from "react"
// import Home from "./components/Home"

// function App() {

// return (
//     <div classname="AppDiv">
//         <Home/>
//     </div>
// );
// }

// export default App;

import Login from "./components/loginForm";
import Register from "./components/signUpForm";
import React from "react";
import axios from "axios";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/product";


function App() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      await axios
        .get("http://localhost:8000/products")
        .then((res) => setProducts(res.data));
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  }, [getAllProducts]);

  return (
    <div>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<ProductList/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

