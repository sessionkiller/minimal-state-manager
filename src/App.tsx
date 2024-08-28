import "./App.css";
import { createObservable, useDispatch, useSelector } from "./state-manager";

const store = createObservable({ count: 0 });

function Counter() {
  const globalState = useSelector(store);
  const dispatch = useDispatch(store);

  return (
    <div style={{ margin: 10 }}>
      <button onClick={() => dispatch("count", -1)}>-</button>
      <span>{globalState.count}</span>
      <button onClick={() => dispatch("count", 1)}>+</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>State Manager</h1>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
