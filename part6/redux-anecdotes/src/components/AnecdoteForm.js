import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {createSetNotification, createResetNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    props.createAnecdote(newAnecdote)
    event.target.newAnecdote.value = ''

    props.createSetNotification(`Added ${newAnecdote}`)
    setTimeout(() => {
      props.createResetNotification()
    },5000)
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
  createSetNotification,
  createResetNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)