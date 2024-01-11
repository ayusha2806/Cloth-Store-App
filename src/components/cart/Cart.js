import React from "react";
import { useCart } from '../../CartContext'

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
