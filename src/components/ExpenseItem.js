import React, { useState } from "react";
import "./expenseitem.css";
import ExpenseDate from "./ExpenseDate";

export default function ExpenseItem(props) {


    const [title, setTitle] = useState(props.title);
    const [amount, setAmount] = useState(props.amount);

const clickHandler = ()=>{
    setTitle('updated')
}

const handleAmount = ()=>{
    setAmount(100)
}

  return (
    <>
        <div className="expense-item" >
            <ExpenseDate date={props.date}/>
          <div className="expense-item__description">
            <h2>{title}</h2>
            <div className="expense-item__price" onClick={handleAmount}>${amount}</div>
            <button onClick={clickHandler}>Change Title</button>
          </div>
        </div>
    </>
  );
}
