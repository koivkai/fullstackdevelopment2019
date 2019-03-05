import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'
import {createSetNotification, createResetNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = props.store.getState().anecdotes
    const filteredAnecdotes = anecdotes.filter((anecdote) => {
        const anecdoteLowercase = anecdote.content.toLowerCase()
        const filterLowercase = store.getState().filter.toLowerCase()
        return anecdoteLowercase.includes(filterLowercase) 
    })
    filteredAnecdotes.sort((a,b) => (b.votes - a.votes))

    const vote = (id) => {
        store.dispatch(createVoteAction(id))

        const votedAnecdote = filteredAnecdotes.find(anecdote => anecdote.id === id)

        store.dispatch(createSetNotification(`voted "${votedAnecdote.content}"`))
        setTimeout(() => {
            store.dispatch(createResetNotification())
        }, 5000)
    }
    
    return (
      <div>
        {filteredAnecdotes.map(anecdote =>
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