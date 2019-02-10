const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //console.log('blogs returned', blogs)
  response.json(blogs)
})
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    //console.log('request body', request.body)

    const blogToAdd = new Blog({
      title: blog.title,
        author: blog.author === undefined ? '' : blog.author,
        url: blog.url,
        likes: blog.likes === undefined ? 0 : blog.likes
    })

    try {
      const savedBlog = await blogToAdd.save()
      response.status(201).json(savedBlog.toJSON())
    } catch (error) {
      response.status(400).json({error: error.message})
    }

    /* blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }) */
  })

  module.exports = blogsRouter