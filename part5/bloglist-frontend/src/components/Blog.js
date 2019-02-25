import React, { useState } from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showFullInfo, setShowFullinfo] = useState(false)

  const handleLike = async (event) => {
    event.stopPropagation()
    //console.log('blog ennen like ', blog)
    blog.likes = blog.likes +1;
    //console.log('blog after like', blog)
    try {
      const result = await BlogService.updateBlog(blog)
      console.log('result', result)
      if (result.status === 200) {
        console.log('blogs ', blogs)
        //should use blog from result but current backend doesnot return one
        setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
      }
    } catch (error) {
      console.log('error', error)
    }
    
    
  }

  const deleteBlog = async (id) => {
    
    try {
      console.log('deleteBlog id', id, typeof(id))
      const response = await BlogService.deleteBlog(id)
    if(response) {
      setBlogs(blogs.filter(b => b.id !== id))
    }
    } catch (error) {
      console.log('error in deleteBlog', error)
    }
    
  }

  if (showFullInfo) {
    console.log('user', user)
    console.log('blog.user', blog.user)
    if(user.id === blog.user.id) {
      return (
        <div className='blog' onClick={() => setShowFullinfo(!showFullInfo)}>
          {blog.title} by {blog.author}, url: {blog.url}, likes: {blog.likes} <button onClick={(event) => {handleLike(event)}} >like</button> <button onClick={() => deleteBlog(blog.id)}>delete </button>
        </div>
      )
    }
    return (
      <div className='blog' onClick={() => setShowFullinfo(!showFullInfo)}>
        {blog.title} by {blog.author}, url: {blog.url}, likes: {blog.likes} <button onClick={(event) => {handleLike(event)}} >like</button>
      </div>
    )
  }
  return (
    <div className='blog' onClick={() => setShowFullinfo(!showFullInfo)}>
    {blog.title} by {blog.author}
    </div>
  )
  
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  


export default Blog