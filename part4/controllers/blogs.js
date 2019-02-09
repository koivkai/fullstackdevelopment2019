const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //console.log('blogs returned', blogs)
  response.json(blogs)
})
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    //console.log('request body', request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter