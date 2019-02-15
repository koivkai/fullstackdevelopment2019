const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  //console.log('blogs returned', blogs)
  response.json(blogs)
})
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    //console.log('request body', request.body)

    const token = getTokenFrom(request)
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

    

   /*  try {
      const savedBlog = await blogToAdd.save()
      response.status(201).json(savedBlog.toJSON())
    } catch (error) {
      response.status(400).json({error: error.message})
    } */

    /* blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }) */
  })

  blogsRouter.delete('/:id', async (request,response) => {
    //console.log('päästiin delete kutsuun')
    try{
      //console.log('request params id', request.params.id)
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (error) {
      console.log('something went wrong with delete')
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
        response.json(updatedBlog.toJSON)
      })
  })

  module.exports = blogsRouter