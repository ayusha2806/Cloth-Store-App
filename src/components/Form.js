// Form.js
import React, { useState, useEffect } from "react";
import FormList from "./FormList";
import Cart from "./cart/Cart";
import { useCart } from "../CartContext";
import "../Styles.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: "",
    sizeL: "",
    sizeM: "",
    sizeS: ""
  });

  const [itemList, setItemList] = useState([]);
  const { addToCart } = useCart();
  const [inputValues, setInputValues] = useState({
    sizeL: 0,
    sizeM: 0,
    sizeS: 0
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedItemList = JSON.parse(localStorage.getItem("itemList")) || [];
    const storedInputValues = JSON.parse(localStorage.getItem("inputValues")) || { sizeL: 0, sizeM: 0, sizeS: 0 };
    setItemList(storedItemList);
    setInputValues(storedInputValues);
  }, []);

  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
    localStorage.setItem("inputValues", JSON.stringify(inputValues));
  }, [itemList, inputValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (["sizeL", "sizeM", "sizeS"].includes(name)) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: parseInt(value, 10) || 0,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.details || !formData.price) {
      alert("Please fill in all the details");
      return;
    }

    const newItem = { ...formData, quantity: 1 };
    setItemList([...itemList, newItem]);

    setFormData({
      name: "",
      details: "",
      price: "",
      sizeL: "",
      sizeM: "",
      sizeS: ""
    });
  };

  const handleAddToCart = (index, size) => {
    const selectedItem = itemList[index];

    if (inputValues[size] > 0) {
      const itemWithQuantity = {
        ...selectedItem,
        quantity: 1,
        size,
      };

      addToCart(itemWithQuantity);

      inputValues[size] = inputValues[size] - 1;

      setNotification("Item added to cart successfully!");

      setTimeout(() => {
        setNotification(null);
      }, 1000);

      // Update the input values in local storage after adding to cart
      localStorage.setItem("inputValues", JSON.stringify(inputValues));
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="T-shirt name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Details:</label>
          <input
            type="text"
            name="details"
            placeholder="Description"
            value={formData.details}
            onChange={handleChange}
          />

          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <label>Size L:</label>
          <input
            type="number"
            name="sizeL"
            value={formData.sizeL}
            onChange={handleChange}
          />

          <label>Size M:</label>
          <input
            type="number"
            name="sizeM"
            value={formData.sizeM}
            onChange={handleChange}
          />

          <label>Size S:</label>
          <input
            type="number"
            name="sizeS"
            value={formData.sizeS}
            onChange={handleChange} 
          />

          <button type="submit">Add List</button>
        </form>

        <button type="button" onClick={() => setShowCart(!showCart)}>
          View Cart
        </button>

        {showCart && <Cart />}
        <FormList itemList={itemList} inputValues={inputValues} handleAddToCart={handleAddToCart} />
      </div>
    </React.Fragment>
  );
}

export default Form;
