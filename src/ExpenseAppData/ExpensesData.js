import React from 'react'
import './expensesedata.css'

const ExpensesData = (props) => {
    let data = props.data;
  return (
    <>
    <div className="expense-item">
      <div className="expense-heading">
        <div>Expense</div>
        <div>Amount</div>
        <div>Category</div>
      </div>
      {/* {data.map((expense, index) => ( */}
        <div className="expense-info" >
          <div>{data.expense}</div>
          <div>{data.amount}</div>
          <div>{data.category}</div>
        </div>
      {/* ))} */}
    </div>
    </>
  )
}

export default ExpensesData