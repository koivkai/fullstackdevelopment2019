import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const store = props.store

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    store.dispatch(createAnecdote(newAnecdote))
    event.target.newAnecdote.value = ''
  }
  
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

export default (AnecdoteForm)