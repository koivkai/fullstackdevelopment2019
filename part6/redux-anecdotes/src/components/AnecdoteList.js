import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'
import {createSetNotification, createResetNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    //console.log('props', props)

    const anecdotes = props.anecdotes
    const filteredAnecdotes = anecdotes.filter((anecdote) => {
        const anecdoteLowercase = anecdote.content.toLowerCase()
        const filterLowercase = props.filter.toLowerCase()
        return anecdoteLowercase.includes(filterLowercase) 
    })
    filteredAnecdotes.sort((a,b) => (b.votes - a.votes))

    const vote = (id) => {
        props.createVoteAction(id)
        const votedAnecdote = filteredAnecdotes.find(anecdote => anecdote.id === id)

        props.createSetNotification(`voted "${votedAnecdote.content}"`)
        setTimeout(() => {
            props.createResetNotification()
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    createVoteAction,
    createSetNotification,
    createResetNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList