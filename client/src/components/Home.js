import { useState, useEffect } from "react";
import axios from "axios"; 
import react from "react";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:8000/categories") 
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;