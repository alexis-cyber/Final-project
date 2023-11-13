import { useState, useEffect } from "react";
import axios from "axios";
// import react from "react";
import { Link } from "react-router-dom";
import "./Home.css"

function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("error from Home categories", error);
      });
  }, []);

  // const handleCategoryClick = (category) => {
  //   console.log(`Clicked category: ${category}`);
  // };

  return (
    <div className="giannis">
      <h1>Categories</h1>
      {categories.map((category) => (
        // Generate dynamic paths based on category
        <Link
          to={`/category/${encodeURIComponent(category)}`} 
          key={category}
          style={{ textDecoration: "underline", color: "black" }}
        >
          <div className="categoriesDiv">
            {category}
          </div>
        </Link>
      ))}
    </div>
  );
}


export default Home;