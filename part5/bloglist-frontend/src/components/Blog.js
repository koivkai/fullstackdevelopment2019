import React, { useState } from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
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

  if (showFullInfo) {
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

export default Blog