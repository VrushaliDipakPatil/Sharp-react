import React from 'react'
import './newexpense.css'
import ExpenseForm from './ExpenseForm'

const NewExpense = (props) => {

const saveExpensedatahandler=(enteredExpenseData)=>{
  const expenseData={
    ...enteredExpenseData,
    id:Math.random().toString()
  }
  props.onAddExpense(expenseData)
}

  return (
    <div className='new-expense'>
 <ExpenseForm onSaveExpenseData = {saveExpensedatahandler}/>
    </div>
  )
}

export default NewExpense