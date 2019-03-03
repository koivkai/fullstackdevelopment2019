import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store
  
  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({type: 'VOTE', id: id})
  }
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    store.dispatch({type:'ADD', anecdote: newAnecdote})
  }

  const newAnecdoteForm = () => {
    return (
      <div>
        <h2>Add anecdote</h2>
        <form onSubmit={addAnecdote}>
        <input name="newAnecdote" />
        <button type="submit">add anecdote</button>
      </form>
      </div>   
    )
  }

  const anecdoteList = () => {
    const sortedAnecdotes = anecdotes.sort((a,b) => (b.votes - a.votes))
    return (
      <div>
        <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
  }

  return (
    <div>
      {anecdoteList()}
      {newAnecdoteForm()}
    </div>
  )
}

export default App
