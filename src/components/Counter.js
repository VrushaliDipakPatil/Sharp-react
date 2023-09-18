import { useDispatch, useSelector } from '../../node_modules/react-redux/es/exports';
import { counterActions } from '../store/index';
import classes from './Counter.module.css';

const Counter = () => {

  const dispatch = useDispatch()
  const counter = useSelector((state) => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)

  const incrementCounterHandler = () =>{
    dispatch(counterActions.increment())
  };

  const decrementCounterHandler = () =>{
    dispatch(counterActions.decrement())
  };
  const incrementCounter=()=>{
    dispatch(counterActions.increase(5))
  }

  const toggleCounterHandler = () =>{
    dispatch(counterActions.toggleCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementCounterHandler}>Increment</button>
        <button onClick={incrementCounter}>Increment by 5</button>

        <button onClick={decrementCounterHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
