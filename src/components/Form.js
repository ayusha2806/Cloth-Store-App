import React, { useState } from "react";
import FormList from "./FormList";
import Cart from "./cart/Cart";
import { useCart } from "../CartContext";  // Import useCart from CartContext

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
  const { cartItems } = useCart();  // Use the cartItems state from CartContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItemList([...itemList, formData]);
    setFormData({
      name: "",
      details: "",
      price: "",
      sizeL: "",
      sizeM: "",
      sizeS: ""
    });
  };

  const [showCart, setShowCart] = useState(false);  // State to manage cart visibility

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        Name:-
        <input
          type="text"
          name="name"
          placeholder="T-shirt name"
          value={formData.name}
          onChange={handleChange}
        />
        Details:-
        <input
          type="text"
          name="details"
          placeholder="Description"
          value={formData.details}
          onChange={handleChange}
        />
        Price:-
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        Size L:-
        <input
          type="number"
          name="sizeL"
          value={formData.sizeL}
          onChange={handleChange}
        />
        Size M:-
        <input
          type="number"
          name="sizeM"
          value={formData.sizeM}
          onChange={handleChange}
        />
        Size S:-
        <input
          type="number"
          name="sizeS"
          value={formData.sizeS}
          onChange={handleChange}
        />
        <button type="submit">Add List</button>
      </form>

      {/* View Cart Button */}
      <button type="button" onClick={() => setShowCart(!showCart)}>
        View Cart
      </button>

      {/* Display Cart Component if showCart is true */}
      {showCart && <Cart />}

      <FormList itemList={itemList} />
    </React.Fragment>
  );
}

export default Form;
