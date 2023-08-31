import logo from './logo.svg';
import './App.css';
import ExpenseItem from './components/ExpenseItem';

function App() {

const locationOfExpenditure = "Mall"
  return (
<div>
<h2>Let's get started</h2>
<ExpenseItem props={locationOfExpenditure}/>
</div>
  );
}

export default App;
