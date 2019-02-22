import React, { useState, useEffect } from 'react'
import BlogService from '../services/blogs'

const NewBlogForm = (props) => {
    
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')
    
    const handleTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        //console.log('event ', event)
        //console.log('props ', props)
        const result = await BlogService.createBlog(newBlogTitle, newBlogAuthor, newBlogUrl)
        console.log('addBlog result', result)
        if(result.status === 201) {
            props.setBlogs(
                props.blogs.concat(result.data)
            )
            props.setMessage(`blogi "${result.data.title}" lisättiin onnistuneesti`)
            setTimeout(() => {
                props.setMessage(null)
            }, 5000)
            setNewBlogAuthor('')
            setNewBlogTitle('')
            setNewBlogUrl('')
        } else {
            props.setMessage(`blogin lisääminen epäonnistui viestillä: ${result.error}`)
            setTimeout(() => {
                props.setMessage(null)
            }, 5000)
        }
        
        
    }

    const form = () => (
        <>
        <h3>Add new blog</h3>
        <form onSubmit={addBlog}>
        Title:
        <input
            value={newBlogTitle}
            onChange={handleTitleChange}
        />
        Author:
        <input
            value={newBlogAuthor}
            onChange={handleAuthorChange}
        />
        Url:
        <input
            value={newBlogUrl}
            onChange={handleUrlChange}
        />
        <button type="submit">lisää blogi</button>
        </form> 
        </>
    )

    return (
        form()
    )
}

export default NewBlogForm

