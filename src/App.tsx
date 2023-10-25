import './App.css'
import { createObservable, useSelector } from './state-manager'

const store = createObservable({count: 0});

function Counter(){

  let globalState = useSelector(store);
  return (
    <div>
      <button onClick={() => (globalState.count -= 1) }>-</button>
      <span>{globalState.count}</span>
      <button onClick={() => (globalState.count += 1) }>+</button>
      
    </div>
  )
}

function App() {

  return (
    <div className="App">
        <Counter />

        <Counter />
        <Counter />
        <Counter />
    </div>
  )
}

export default App
