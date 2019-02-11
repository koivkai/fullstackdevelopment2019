const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there are some initial blogs saved', async () => {
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

    describe('adding a new blog', async () => {
        test('adds the blog to database', async () => {
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
        
        test('with no like value gives that blog a like value of 0', async () => {
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
        
        test('without title and url gives status 400 bad requestand and no blog is added', async () => {
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
    })

    describe('deleting a blog', async () => {
        test('with valid id succeeds with status 200 and blog is removed', async () => {
            let blogsAtStart = await api.get('/api/blogs') 
            blogsAtStart = blogsAtStart.body  
            const blogToDelete = blogsAtStart[0]
            //console.log('blogsAtStart', blogsAtStart)
            //console.log('blogToDelete', blogToDelete)
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await api.get('/api/blogs')
            
            expect(blogsAtEnd.body.length).toBe(initialBlogs.length -1)

            const titlesAtEnd = blogsAtEnd.body.map(b => b.title)
            expect(titlesAtEnd).not.toContain(blogToDelete.title)
        })
    })

    describe('changing a blog', async () => {
        test('by adding likes changes the blogs likes currectly', async () => {
            let blogsAtStart = await api.get('/api/blogs') 
            blogsAtStart = blogsAtStart.body  
            const blogToChange = blogsAtStart[0]

            const changedBlog = {
                likes: 10000
            }

            await api
                .put(`/api/blogs/${blogToChange.id}`)
                .send(changedBlog)
                .expect('Content-Type', /application\/json/)

            const afterUpdate = await api.get('/api/blogs')
            const blogsAfterUpdate = afterUpdate.body

            expect(blogsAfterUpdate[0].likes).toBe(10000)
        })
    })
})

describe('when there is initially one user at db', async () => {
    beforeEach(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
      })

      test('creation with no username fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

          const badUser = {
              name: 'fail',
              password: 'secret'
          }

          const result = await api
            .post('/api/users')
            .send(badUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('User validation failed: username: Path `username` is required')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
      })

      test('creation with no password fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

          const badUser = {
              username: 'pekka',
              name: 'fail',
          }

          const result = await api
            .post('/api/users')
            .send(badUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('password must be at least 3 characters long')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
      })

      test('creation with too short username fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

          const badUser = {
              username: 'a',
              name: 'fail',
              password: 'secret'
          }

          const result = await api
            .post('/api/users')
            .send(badUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('`username` (`a`) is shorter than the minimum allowed length (3)')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
      })

      test('creation with too short password fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

          const badUser = {
              username: 'abba',
              name: 'fail',
              password: 'a'
          }

          const result = await api
            .post('/api/users')
            .send(badUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('password must be at least 3 characters long')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
      })
  })





afterAll(() => {
    mongoose.connection.close()
})