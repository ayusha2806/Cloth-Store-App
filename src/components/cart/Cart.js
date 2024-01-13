// Cart.js
import React from "react";
import { useCart } from "../../CartContext";
import "../../Styles.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="list-item">
            <div>
              <strong>Name:</strong> {item.name}
            </div>
            <div>
              <strong>Details:</strong> {item.details}
            </div>
            <div>
              <strong>Price:</strong> {item.price}
            </div>
            <div>
              <strong>Quantity:</strong> {item.quantity}
            </div>
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total Price:</strong> {totalPrice}
      </div>
    </div>
  );
};

export default Cart;
