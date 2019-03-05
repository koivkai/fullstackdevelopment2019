import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'
import {createSetNotification, createResetNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = props.store.getState().anecdotes
    anecdotes.sort((a,b) => (b.votes - a.votes))

    const vote = (id) => {
        store.dispatch(createVoteAction(id))

        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)

        store.dispatch(createSetNotification(`voted "${votedAnecdote.content}"`))
        setTimeout(() => {
            store.dispatch(createResetNotification())
        }, 5000)
    }
    
    return (
      <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList