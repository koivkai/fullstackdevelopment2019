import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userInStorageJSON = window.localStorage.getItem('currentUserJSON')
    if (userInStorageJSON) {
      const user = JSON.parse(userInStorageJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('currentUserJSON', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome "${user.name}"  `)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('user', user)
    } catch (exception) {
      
    }
  }

  const loginForm = () => (
    <>
    
    <h2>Please log in</h2>
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>      
    </>
  )

  const blogList = () => (
    <div>
      
      <p>{user.name} logged in</p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {logOutButton()}
      <Toggleable buttonLabel='Add blog'>
        <NewBlogForm setMessage={setMessage} setBlogs={setBlogs} blogs={blogs}/>
      </Toggleable>
      
    </div>
       
  )

  const logOut = () => {
    window.localStorage.removeItem('currentUserJSON')
    setUser(null)
    setMessage(`Logged out`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logOutButton = () => (
    <button onClick={logOut}>
      log out
    </button>
  )

  const messageBar = () => {
    if(message === null) {
      return null
    }

    return (
      <div className='message'>
        {message}
      </div>
    )
  }

  return (
    <div>
      {messageBar()}
      {user === null ? loginForm() : blogList()}  
    </div>
  )
}

export default App