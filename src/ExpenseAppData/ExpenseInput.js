import React, { useCallback, useEffect, useState } from "react";
import "./expenseinput.css";
import ExpensesData from "./ExpensesData";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";
import { expenseActions } from "../store/expenseSlice";

const ExpenseInput = () => {
  const dispatch = useDispatch();

  const expensedata = useSelector((state) => state.expenses?.expensedata);

  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchExpenseHandler();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleExpense = (event) => {
    setExpense(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let expensedata = {
      expense: expense,
      amount: amount,
      category: category,
    };
    addExpenseHandler(expensedata);
  };

  async function addExpenseHandler(expensedata) {
    try {
      const respone = await fetch(
        "https://movies-2a006-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expensedata),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = respone.json();
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      fetchExpenseHandler();
    }, 500);
  }

  const fetchExpenseHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://movies-2a006-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong.....Retrying!");
      }
      const data = await response.json();
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          expense: data[key].expense,
          amount: data[key].amount,
          category: data[key].category,
        });
      }
      dispatch(expenseActions.expenseData());
      dispatch(expenseActions.expenseData(loadedExpenses));
      let totalExpense = 0;
      loadedExpenses.map((data) => {
        totalExpense = Number(totalExpense) + Number(data.amount);
      });
      if (totalExpense > 10000) {
        dispatch(expenseActions.ActivatePremium(true));
      } else {
        dispatch(expenseActions.ActivatePremium(false));
      }
    } catch (error) {}
  }, []);

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
      {expensedata?.length > 0 ? (
        <ExpensesData fetchExpenseHandler={fetchExpenseHandler} />
      ) : (
        ""
      )}
    </>
  );
};

export default ExpenseInput;
