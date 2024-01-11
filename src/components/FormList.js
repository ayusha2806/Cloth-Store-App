import React from "react";

function FormList({ itemList }) {
  return (
    <ul>
      {itemList.map((item, index) => (
        <li key={index}>
          Name: {item.name}, Details: {item.details}, Price: {item.price},{" "}
          <button>Size L: {item.sizeL}</button>,{" "}
          <button>Size M: {item.sizeM}</button>,
          <button>Size S: {item.sizeS}</button>
        </li>
      ))}
    </ul>
  );
}

export default FormList;
