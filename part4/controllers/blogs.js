const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  //console.log('blogs returned', blogs)
  response.json(blogs)
})
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    console.log('blog post request ', request)
    const token = request.token
    console.log('token', token)
    

    try {
      if(!token) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      console.log('decotedToken', decodedToken)
      console.log('decodedToken.id', decodedToken.id)
      const user = await User.findById(decodedToken.id)
      console.log('user', user)
      const blogToAdd = new Blog({
        title: blog.title,
        author: blog.author === undefined ? '' : blog.author,
        url: blog.url,
        likes: blog.likes === undefined ? 0 : blog.likes,
        user: user._id
      })    
  
      const savedBlog = await blogToAdd.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
      
    } catch(error) {
      response.status(400).json({error: error.message})
    }

  })

  blogsRouter.delete('/:id', async (request,response) => {
    console.log('päästiin delete kutsuun')

    const token = request.token
    console.log('token ', token)
    try{
      if(!token) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const decodedToken = jwt.verify(token, process.env.SECRET)
      console.log('decoded token', decodedToken)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      console.log('request params id', request.params)
      const blogToDelete = await Blog.findById(request.params.id)

      if(!blogToDelete) {
        return response.status(404).json({error: `blog with id ${request.params.id} does not exits`})
      }

      console.log('blogToDelete', blogToDelete)
      console.log('decodedToken', decodedToken)

      if(blogToDelete.user.toString() === decodedToken.id) {
        //console.log('request params id', request.params.id)
        await Blog.findByIdAndDelete(request.params.id)
        console.log('blogi poistettiin onnistuneesti')
        response.status(204).end()
      } else {
        response.status(403).json({error: 'You can only delete your own blogs'})
      }

      
    } catch (error) {
      console.log('something went wrong with delete')
      response.status(500).json({error:  error.message})
    }
  })

  blogsRouter.put('/:id', (request, response) => {
    //console.log('päästiin tänne')
    const reqBody = request.body

    const blogUpdate = {
      likes : reqBody.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blogUpdate, {new: true})
      .then(updatedBlog => {
        response.status(200).json(updatedBlog.toJSON)
      })
  })

  module.exports = blogsRouter