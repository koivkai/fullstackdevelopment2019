import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (content) => {
    const anecdoteObject = {
      content,
      votes: 0
    }
    try {
      const response = await axios.post(url, anecdoteObject)
      return response.data
    } catch (error) {
      console.log('error', error)
    }
}

const updateAnecdote = async (id) => {
  const anecdoteURL = `http://localhost:3001/anecdotes/${id}`
  const res = await axios.get(anecdoteURL)
  const anecdoteToUpdate = res.data
  //console.log('anecdoteToUpdate', anecdoteToUpdate)
  //console.log('res', res)
  const updatedAnecdote = {
    id,
    content: anecdoteToUpdate.content,
    votes: anecdoteToUpdate.votes +1
  }
  const response = await axios.put(anecdoteURL, updatedAnecdote)
  console.log('response data', response.data)
  return response.data
}
  
  export default { 
    getAll,
    createNew,
    updateAnecdote
  }