import React from 'react'
import './expensesedata.css'

const ExpensesData = (props) => {
    let data = props.data
    console.log(data)
  return (
    <>
    <div className="expense-item">
      <div className="expense-heading">
        <div>Expense</div>
        <div>Amount</div>
        <div>Category</div>
      </div>
      {data.map((expense, index) => (
        <div className="expense-info" key={index}>
          <div>{expense.expense}</div>
          <div>{expense.amount}</div>
          <div>{expense.category}</div>
        </div>
      ))}
    </div>
    </>
  )
}

export default ExpensesData