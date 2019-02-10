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