import anecdoteServices from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const voted = action.updatedAnecdote
      return state.map(anecdote => anecdote.id === voted.id ? voted : anecdote)
    case 'ADD':
      const newAnecdote = action.anecdote
      return state.concat(newAnecdote)
    case 'INITIALIZE':
      return action.data  
    default:
      return state
  }

 
}

export const createAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdoteObject = await anecdoteServices.createNew(newAnecdote)
    dispatch({
      type:'ADD', anecdote: anecdoteObject
    })
  }
  
}

export const createVoteAction = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.updateAnecdote(id)
    console.log('updatedAnecdote in reducer', updatedAnecdote)
    dispatch({
      type: 'VOTE', updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default reducer