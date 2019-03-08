import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {createSetNotification, createResetNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdoteContent = event.target.newAnecdote.value
    const newAnecdote = await anecdoteService.createNew(newAnecdoteContent)
    props.createAnecdote(newAnecdote)
    //console.log('newAnecdote', newAnecdote)

    props.createSetNotification(`Added ${newAnecdote.content}`)
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