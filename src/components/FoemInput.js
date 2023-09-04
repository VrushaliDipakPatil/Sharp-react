import React, { useState } from "react";
import "./forminput.css";

const FoemInput = ({ onAddToBill }) => {
  const [formData, setFormData] = useState({
    uniqueOrderId: '',
    dish: '',
    price: '',
    selectedTable: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddToBill = () => {
    onAddToBill(formData);
  };
  return (
    <>
      <form className="form">
        <span className="fields">
          <label>Unique Order Id :</label>
          <input
            type="number"
            name="uniqueOrderId"
            value={formData.uniqueOrderId}
            onChange={handleChange}
          />
        </span>
        <span className="fields">
          <label>Choose Dish :</label>
          <input
            type="text"
            name="dish"
            value={formData.dish}
            onChange={handleChange}
          />
        </span>
        <span className="fields">
          <label>Choose Price :</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </span>
        <div className="fields">
          <label>Choose a Table :</label>
          <select
            name="selectedTable"
            value={formData.selectedTable}
            onChange={handleChange}
          >
            <option value="" disabled>
              Choose a Table
            </option>
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option>
          </select>
        </div>
        <div className="fields">
          <button onClick={handleAddToBill}>Add to Bill</button>
        </div>
      </form>
    </>
  );
};

export default FoemInput;
