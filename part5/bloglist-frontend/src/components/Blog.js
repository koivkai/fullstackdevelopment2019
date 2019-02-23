import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showFullInfo, setShowFullinfo] = useState(false)
  if (showFullInfo) {
    return (
      <div className='blog' onClick={() => setShowFullinfo(!showFullInfo)}>
        {blog.title} by {blog.author}, url: {blog.url}, likes: {blog.likes} <button onClick={(event) => { event.stopPropagation(); console.log('liked')}} >like</button>
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