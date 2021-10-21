const express = require('express')
const app = express();
const mongoose = require('mongoose');
const { head } = require('./routes/auth');
require('dotenv/config')
//Import routes
const authRoutes = require('./routes/auth')


//connect to db
mongoose.connect(process.env.DB_CONNECTION, 
    () => console.log('Connected to database'))


//Routes
app.get('/', (req,res) => {
    res.send('we are on home')
})

//Middleware
app.use(express.json())
//Route Middleware
app.use('/api/user', authRoutes)


//boot up serverr
app.listen(3000, () => console.log('Listening to server'))