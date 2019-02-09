const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {"title": "Paras blogi",
    "author": "minä",
    "url": "wwww.internet.com",
    "likes": 1000},

    {"title": "Java blogi",
    "author": "javamies",
    "url": "wwww.internet.com/javamies",
    "likes": 0},

    {"title": "Game of thrones blogi",
    "author": "jon snow",
    "url": "wwww.internet.com/gotblog",
    "likes": 100}
]

beforeEach(async () => {
    await Blog.remove({})

    let blogsObject = new Blog(initialBlogs[0])
    await blogsObject.save()
    
    blogsObject = new Blog(initialBlogs[1])
    await blogsObject.save()

    blogsObject = new Blog(initialBlogs[2])
    await blogsObject.save()
})

test('blogs returned as json', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
  })
  

afterAll(() => {
    mongoose.connection.close()
})