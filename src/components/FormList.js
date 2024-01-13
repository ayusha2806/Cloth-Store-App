// FormList.js
import React, { useState, useEffect } from "react";
import { useCart } from '../CartContext';
import "../Styles.css";

function FormList({ itemList: propItemList, inputValues: propInputValues }) {
  const { addToCart } = useCart();
  const [itemList, setItemList] = useState(propItemList || []);
  const [notification, setNotification] = useState(null);
  const [inputValues, setInputValues] = useState(propInputValues || { sizeL: 0, sizeM: 0, sizeS: 0 });

  useEffect(() => {
    setItemList(propItemList || []);
    setInputValues(propInputValues || { sizeL: 0, sizeM: 0, sizeS: 0 });
  }, [propItemList, propInputValues]);

  const handleAddToCart = (index, size) => {
    const selectedItem = itemList[index];

    if (inputValues[size] > 0) {
      const itemWithQuantity = {
        ...selectedItem,
        quantity: 1,
        size,
      };

      addToCart(itemWithQuantity);

      setInputValues(prevInputValues => ({
        ...prevInputValues,
        [size]: prevInputValues[size] - 1,
      }));

      setNotification("Item added to cart successfully!");

      setTimeout(() => {
        setNotification(null);
      }, 1000);
    }
  };

  return (
    <div className="container">
      {itemList && itemList.length > 0 ? (
        itemList.map((item, index) => (
          <div key={index} className="list-item">
            <div>
              <strong>Name:</strong> {item.name}
            </div>
            <div>
              <strong>Details:</strong> {item.details}
            </div>
            <div>
              <strong>Price:</strong> {item.price}
            </div>
            {" Size L: "}
            <button onClick={() => handleAddToCart(index, "sizeL")}>
              {`Add Size L (${inputValues.sizeL})`}
            </button>
            {" Size M: "}
            <button onClick={() => handleAddToCart(index, "sizeM")}>
              {`Add Size M (${inputValues.sizeM})`}
            </button>
            {" Size S: "}
            <button onClick={() => handleAddToCart(index, "sizeS")}>
              {`Add Size S (${inputValues.sizeS})`}
            </button>
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}

      {notification && (
        <div className="notification" style={{ marginTop: "10px" }}>
          {notification}
        </div>
      )}
    </div>
  );
}

export default FormList;
