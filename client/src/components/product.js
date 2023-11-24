import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./categories.css"

function AddProduct({ getAllProducts }) {
  let token = localStorage.getItem("token");
  // const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    cost: "",
    description: "",
    category: "",
    image: "",
  });

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload)
      .then(() => getDownloadURL(imageRef))
      .then((url) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: url,
        }));
        alert("Upload Success");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  useEffect(() => {
    const imageListRef = ref(storage, "image/");  
    listAll(imageListRef)
      .then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        Promise.all(promises)
          .then((urls) => {
            setImageList(urls);
          })
          .catch((error) => {
            console.error("Error fetching images:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []); 

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
  }
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
          />
          <br></br>
          <label>Price:</label>
          <input
            type="text"
            name="cost"
            placeholder="Price (required)"
            onChange={handleInputChange}
            value={product.cost}
          />
          <br></br>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description (required)"
            onChange={handleInputChange}
            value={product.description}
          />
          <br></br>
          <label>Category:</label>
          <input
            type="input"
            name="category"
            placeholder="Category (required)"
            onChange={handleInputChange}
            value={product.category}
          />
          <br></br>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <br></br>
          <button onClick={uploadImage}>Upload</button>
          {imageList.map((url) => (
            <img key={url} src={url} alt="Product" id="imagess"/>
          ))}
          <button type="submit" className="addProductBtn">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProduct;
