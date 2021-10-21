const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation, editEmailValidation, editPasswordValidation } = require('../validation/authValidation')
const verify = require('./verifyToken')

//ROUTE: Register a user
router.post('/register', async (req,res) => {

    //Validate the data before we create a user
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    //Check if username already exists in db
    const usernameExists = await User.findOne({username: req.body.username})
    if(usernameExists)
        return res.status(400).send('Username already exists')
    
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({user_id: user._id})
    } catch(err) {
        res.status(400).send(err)
    }
})

//ROUTE: Login a user
router.post('/login', async (req,res) => {

    //Validate the data before we login
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    //Check if username exists in db
    const user = await User.findOne({username: req.body.username})
    if(!user)
        return res.status(400).send('Username does not exist')

    //Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword)
        return res.status(400).send('Invalid password')
    
    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

router.delete('/:id', verify, async (req,res) => {

    //Check if username exists in db
    const user = await User.findOne({username: req.body.username})
    if(!user)
        return res.status(400).send('Username does not exist')

    //Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword)
        return res.status(400).send('Invalid password')

    try {
        const deletedUser = await User.deleteOne({username: req.body.username});
        console.log(deletedUser)
        res.send(deletedUser)
    } catch(err) {
        console.log('bad request')
        res.status(400).send(err)
    }
})

router.get('/:id', async (req,res) => {

    //Check if username exists in db
    const user = await User.findOne({username: req.body.username})
    if(!user)
        return res.status(400).send('Username does not exist')

    res.send(user)
})

router.get('/', async (req,res) => {

})

module.exports = router 