import React from "react";
import "./expenseitem.css";
import ExpenseDate from "./ExpenseDate";

export default function ExpenseItem(props) {

const clickHandler = ()=>{
console.log("Clicked");
}

  return (
    <>
        <div className="expense-item" >
            <ExpenseDate date={props.date}/>
          <div className="expense-item__description">
            <h2>{props.title}</h2>
            <div className="expense-item__price">${props.amount}</div>
          </div>
          <button onClick={props.onDelete}>Delete Expense</button>
        </div>
    </>
  );
}
