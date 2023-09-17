import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import classes from './Counter.module.css';

const Counter = () => {

  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter)
  const toggleCounterHandler = () => {};

  const incrementCounterHandler = () =>{
    dispatch({type: 'incrementby2'})
  };

  const decrementCounterHandler = () =>{
    dispatch({type: 'decrementby2'})
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementCounterHandler}>Increment</button>
        <button onClick={decrementCounterHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
