import React, { useState } from "react";
import "./expenseform.css";

const ExpenseForm = (props) => {
  const [enteredtitle, setEnteredTitle] = useState("");
  const [enteredamount, setEnteredAmount] = useState("");
  const [entereddate, setEnteredDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredtitle,
      amount: enteredamount,
      date: new Date(entereddate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    stopEditingHandler(); // Close the form after adding an expense
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input
                type="text"
                value={enteredtitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Amount</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={enteredamount}
                onChange={amountChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>date</label>
              <input
                type="date"
                min="2019-01-01"
                max="2022-12-31"
                value={entereddate}
                onChange={dateChangeHandler}
              />
            </div>
          </div>
          <div className="new-expense__actions">
            <button type="button" onClick={stopEditingHandler}>
              Cancel
            </button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      ) : (
        <div className="centered">
        <button onClick={startEditingHandler}>Add Expense</button>
      </div>
      )}
    </div>
  );
};

export default ExpenseForm;
