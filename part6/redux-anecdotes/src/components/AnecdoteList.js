import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = props.store.getState()
    anecdotes.sort((a,b) => (b.votes - a.votes))

    const vote = (id) => {
        store.dispatch(createVoteAction(id))
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