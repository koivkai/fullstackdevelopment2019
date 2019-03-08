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
      const voted = state.find(anecdote => anecdote.id === action.id)
      voted.votes = voted.votes +1
      return state.map(anecdote => anecdote.id === voted.id ? voted : anecdote)
    case 'ADD':
      const newAnecdoteObject = asObject(action.anecdote)
      return state.concat(newAnecdoteObject)
    case 'INITIALIZE':
      return action.data  
    default:
      return state
  }

 
}

export const createAnecdote = (newAnecdote) => {
  return {
    type:'ADD', anecdote: newAnecdote
  }
}

export const createVoteAction = (id) => {
  return {
    type: 'VOTE', id
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  }
}

export default reducer