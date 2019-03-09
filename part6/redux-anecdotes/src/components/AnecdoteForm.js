import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {createSetNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdoteContent = event.target.newAnecdote.value
    props.createAnecdote(newAnecdoteContent)
    props.createSetNotification(`Added ${newAnecdoteContent}`, 5000)
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

const mapDispatchToProps = {
  createAnecdote,
  createSetNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)