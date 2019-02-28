import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const statistics = () => {
    let totalReviews = store.getState().good + store.getState().ok + store.getState().bad
    let pointTotal = 1 * store.getState().good + store.getState().bad * -1
    let average = pointTotal / totalReviews
    let posivePercentage = (store.getState().good / totalReviews) * 100

    return (
      <div>
        <h3>Statistics</h3>
        <ul>
          <li>Total: {totalReviews}</li>
          <li>Average: {average}</li>
          <li>Postive: {posivePercentage} %</li>
        </ul>
        
      </div>
    )
  }

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={ok}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
      {statistics()}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
