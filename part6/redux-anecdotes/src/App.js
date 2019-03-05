import React from 'react';
import AnecdoteFrom from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  const store = props.store
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <AnecdoteFrom store={store} />
    </div>
  )
}

export default App
