import React from 'react'
import './expenseslist.css'
import ExpenseItem from './ExpenseItem'

const ExpensesList = (props) => {

if(props.items.length === 0){
    return<h2 className='expenses-list__fallback'>Found no Expenses</h2>
}

  return (
    <ul className='expenses-list'>
        {props.items.map((expense)=>(
        <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        />
    ))}
    {props.items.length === 1 && <h2 style={{ color: "white" , textAlign: 'center'}}>Only Single expense is here. Please Add more...</h2>}
    </ul>
  )
}

export default ExpensesList