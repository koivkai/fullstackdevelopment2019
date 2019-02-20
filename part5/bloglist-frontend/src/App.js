import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    </div>
       
  )

  const logOut = () => {
    window.localStorage.removeItem('currentUserJSON')
    setUser(null)
  }

  const logOutButton = () => (
    <button onClick={logOut}>
      log out
    </button>
  )
    
  

  return (
    <div>

      {user === null ? loginForm() : blogList()}
      
      
    </div>
  )
}

export default App