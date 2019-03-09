import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'
import { createSetNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    //console.log('props', props)
    const filteredAnecdotes = props.filteredAnecdotes 
    filteredAnecdotes.sort((a,b) => (b.votes - a.votes))

    const vote = (id) => {
        props.createVoteAction(id)
        const votedAnecdote = filteredAnecdotes.find(anecdote => anecdote.id === id)
        props.createSetNotification(`voted "${votedAnecdote.content}"`,5000)
        
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

const filterAnecdotes = ({ anecdotes, filter }) => {
    //console.log('anecdotes', anecdotes)
    const filteredAnecdotes = anecdotes.filter((anecdote) => {
        const anecdoteLowercase = anecdote.content.toLowerCase()
        const filterLowercase = filter.toLowerCase()
        return anecdoteLowercase.includes(filterLowercase) 
    })
    return filteredAnecdotes
}

const mapStateToProps = (state) => {
    return {
        filteredAnecdotes: filterAnecdotes(state)
    }
}

const mapDispatchToProps = {
    createVoteAction,
    createSetNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList