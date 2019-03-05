import React from 'react';
import AnecdoteFrom from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => {
  const store = props.store
  console.log('store state', store.getState())
  return (
    <div>
      <Notification store={store}/>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <AnecdoteFrom store={store} />
    </div>
  )
}

export default App
