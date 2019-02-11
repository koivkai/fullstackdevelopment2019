const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs')
  
    response.json(users.map(User.format))
  })

usersRouter.post('/', async (request, response) => {
  
    const body = request.body
    //console.log('salasana', body.password, ' tyyppi ', typeof(body.password))
    //console.log('salasana pituus', body.password.length)
    //console.log('salasana < 3',body.password.length <3)

    // tämän tarkistaminen modelin puolella ei liene mahdollista koska sinne annetaan vain hash jonka pituus on vakio riippumatta salasananpituudesta
    if(body.password === undefined || body.password.length <3) {
        //console.log('salasanassa oli virhe')
        response.status(400).json({error: 'password must be at least 3 characters long'})
    } else {
        try {

            const saltRounds = 10
            const hash = await bcrypt.hash(body.password, saltRounds)
            
            const user = new User({
              username: body.username,
              name: body.name,
              passwordHash: hash
            })
            //console.log('user', user)
        
            const savedUser = await user.save()
        
            response.json(savedUser)
          } catch (error) {
            if(error.name === 'ValidationError') {
                response.status(400).json({ error: error.message })
            }
          }
    }
    
})

module.exports = usersRouter