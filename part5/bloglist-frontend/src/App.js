import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Togglable'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  //const [username, setUsername] = useState('')
  const username = useField('text')
  //const [password, setPassword] = useState('')
  const password = useField('password')
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
        username: username.value, password: password.value,
      })

      window.localStorage.setItem('currentUserJSON', JSON.stringify(user))

      setUser(user)
      username.reset()
      password.reset()
      setMessage(`Welcome "${user.name}"  `)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('user', user)
    } catch (error) {
      console.log('error', error)
    }
  }

  const loginForm = () => (
    <>

    <h2>Please log in</h2>
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          {...username}
        />
      </div>
      <div>
        salasana
        <input
          {...password}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
    </>
  )

  const blogList = () => {
    sortBlogsByLikes()

    return (
      <div>

        <p>{user.name} logged in</p>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
        )}
        {logOutButton()}
        <Toggleable buttonLabel='Add blog'>
          <NewBlogForm setMessage={setMessage} setBlogs={setBlogs} blogs={blogs}/>
        </Toggleable>

      </div>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('currentUserJSON')
    setUser(null)
    setMessage('Logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const sortBlogsByLikes = () => {
    //console.log('blogs before', blogs)
    //console.log('sorting blogs')
    blogs.sort((blogA, blogB) => (blogB.likes - blogA.likes))
    //console.log('blogs after', blogs)
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