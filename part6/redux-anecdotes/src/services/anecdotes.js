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
  
  export default { 
    getAll,
    createNew
  }