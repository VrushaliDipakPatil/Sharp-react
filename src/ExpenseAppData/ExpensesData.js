import React, { useState } from "react";
import "./expensesedata.css";

const ExpensesData = (props) => {
  let data = props.data;



  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://movies-2a006-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      props.fetchExpenseHandler(); 
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <div className="expense-item">
        <div className="expense-heading">
          <div>Expense</div>
          <div>Amount</div>
          <div>Category</div>
        </div>
        {data.map((expense, index) => (
            <>
          <div className="expense-info" key={index}>
            <div>{expense.expense}</div>
            <div>{expense.amount}</div>
            <div>{expense.category}</div>
            <button>Edit</button>
            <button onClick={()=>deleteExpenseHandler(expense.id)}>Delete</button>
          </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ExpensesData;
