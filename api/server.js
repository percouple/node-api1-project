// BUILD YOUR SERVER HERE
const express = require('express');
const server = express()
server.use(express.json())

const User = require('./users/model')


// [GET] All Users
server.get('/api/users', async (req, res) => {
    try {
        const userList = await User.find()
        res.status(200).json(userList);
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
})

// [GET] Individual Users
server.get('/api/users', async (req, res) => {
    try{
        
    } catch (err) {

    }
})

console.log(User.find())


module.exports = server; // EXPORT YOUR SERVER instead of {}
