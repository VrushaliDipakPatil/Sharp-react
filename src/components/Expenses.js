import React, { useState } from "react";
import './expenses.css'
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";

export default function Expenses(props) {

  const[filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = selectedYear =>{
    setFilteredYear(selectedYear)
}

  return (
    <div className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler}  />
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </div>
  );
}
