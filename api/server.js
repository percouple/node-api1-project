// BUILD YOUR SERVER HERE
const express = require('express');
const server = express()
server.use(express.json())

const User = require('./users/model')

// [POST] A new user
server.post('/api/users', async (req, res) => {
    try {
        console.log("SUCCESS ROUTING")
        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({ message: "provide name and bio" })
        }
        const newUser = await User.insert({ name: req.body.name, bio: req.body.bio })
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
})

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
server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "does not exist" })
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
})

// [DELETE] A user
server.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.remove(id)
        if (!user) {
            console.log("User not found")
            return res.status(404).json({ message: 'does not exist' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
})

// [PUT] Update a user
server.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
        const user = await User.update(id, changes)
        if (!user) {
            return res.status(404).json({ message: "does not exist"})
        } else if (!user.name || !user.bio) {
            return res.status(400).json({ message: "provide name and bio"})
        }
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
