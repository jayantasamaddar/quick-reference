import { useSelector, useDispatch } from 'react-redux';
import './App.css';

export default function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };
  const addBy10 = () => {
    dispatch({ type: 'ADD', payload: 10 });
  };

  return (
    <div className="counterApp">
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <div className="buttons">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={addBy10}>+10</button>
      </div>
    </div>
  );
}
