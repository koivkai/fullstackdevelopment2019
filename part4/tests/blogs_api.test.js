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
    //console.log('response body', response.body[0])
  
    expect(response.body.length).toBe(initialBlogs.length)
  })

test('blogs have an id field', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('posting a new blog adds a blog to database', async () => {
    const newBlog = {
        title: "Lord of the rings the blog",
        author: "Elrond",
        url: "wwww.internet.com/rivendell/blog",
        likes: 101
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    
    const response = await api.get('/api/blogs')
    //koko olion matchaaminen ei onnistu koska alkuperäisessä ei ole tietokanna lisäämiä id ja _v kenttiä
    expect(response.body[3].author).toBe('Elrond')

})

test('posting a blog with no like value gives that blog a like value of 0', async () => {
    const newBlog = {
        title: "Sarumans awesome mordor fan blog",
        author: "Saruman the white",
        url: "wwww.internet.com/isengard/myBlog",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    
    const response = await api.get('/api/blogs')
    expect(response.body[3].likes).toBe(0)

})

test('posting a blog without title and url gives status 400 bad requestand no blog is added', async () => {
    const badPost = {
        author: 'blah blah'
    }

    await api 
        .post('/api/blogs')
        .send(badPost)
        .expect(400)

    const response = await api.get('/api/blogs')   
    expect(response.body.length).toBe(initialBlogs.length)
})  

afterAll(() => {
    mongoose.connection.close()
})