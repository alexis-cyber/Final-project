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

import Form from "./components/Form";
import Login from "./components/LoginForm";
import Register from "./components/SignUpForm";
import { useEffect, useState } from "react";
import React from "react"
import Home from "./components/Home";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";

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
    getAllProducts();
  }, []);

  return (
    <BrowserRouter>
      <NavBar/> 
      <Routes>
        
        <Route
          path="/form"
          element={<Form getAllProducts={getAllProducts} />}
        />
        <Route
          path="/"
          element={
            <ProductList products={products} getAllProducts={getAllProducts} />
          }
        />
        <Route path="/login" element={<Login login={Login} />} />
        <Route path="/register" element={<Register register={Register} />} />
      </Routes>
      <Home />
    </BrowserRouter>
  );
}

export default App;
