import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import './App.css';

export default function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(actions.increment());
  };
  const decrement = () => {
    dispatch(actions.decrement());
  };
  const addBy10 = () => {
    dispatch(actions.add(10));
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