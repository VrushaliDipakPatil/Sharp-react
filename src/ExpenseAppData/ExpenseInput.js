import React, { useState } from "react";
import './expenseinput.css'
import ExpensesData from "./ExpensesData";

const ExpenseInput = () => {
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenseData, setExpenseData] = useState({})

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleExpense = (event) => {
    setExpense(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    let expensedata = {
expense: expense,
amount: amount,
category: category
    }
    setExpenseData(expensedata);
    console.log(expensedata);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="sub-heading">
          <label className="label">Expense Description : </label>
          <input type="text" value={expense} onChange={handleExpense} />
        </div>
        <div className="sub-heading">
          <label className="label">Amount : </label>
          <input type="number" value={amount} onChange={handleAmount} />
        </div>
        <div className="sub-heading">
          <label className="label">Category : </label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="" disabled>
              Select Category
            </option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div className="sub-heading">
          <button className="add-button">Add Expense</button>
        </div>
      </form>
      <ExpensesData data={expenseData}/>
    </>
  );
};

export default ExpenseInput;
