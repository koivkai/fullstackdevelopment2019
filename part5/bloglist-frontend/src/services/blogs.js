
import axios from 'axios'
import userInfo from '../utils/user_info'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (title, author, url) => {
  const config = {
    headers: {Authorization: userInfo.getAuthorizationString()}
  }

  //console.log('title ', title, ' author ', author, ' url ', url, ' config ',config)
  const newBlog = {
    "title":  title,
    "author": author,
    "url": url,
    "likes": 0
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response
  } catch (error){
    return {error: error.message}
  }
  
  //console.log('response', response)
  
}

export default { 
  getAll,
  createBlog
}