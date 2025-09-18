const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const JWT_SECRET = "supersecret@123"

//parse the incoming json body 
app.use(express.json())
app.use(cors())

let users = []

//this is the code for auth middleware
function authMiddleware(req, res, next) {
    const token = req.headers.token
    const username = jwt.verify(token, JWT_SECRET).username
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            req.username = username
            return next()
        }
    }
    return res.status(404).send("User is not allowed to visit the website")
}

function logger(req, res, next) {
    console.log(req.method + " request came")
    next()
}

app.use(logger)


//this is signup route
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username)
            res.send("User already exists")
    }
    users.push({ username, password })
    res.send("User signed up successfully")
})

//this is login route
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            const token = jwt.sign({ username }, JWT_SECRET)
            return res.send({ token, message: "User logged in successfully" })
        }
    }
    return res.send("User doesn't exist")
})


//this is the profile route
app.get('/me', authMiddleware, (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == req.username)
            return res.send(users[i])
    }
    return res.send("this is an invalid token please send a valid token")
})

//writing the logout functionality
app.post('/logout', authMiddleware, (req, res)=>{
    return res.send("Logged out successfully")
})

app.listen(3000, () => {
    console.log("running on port 3000")
})


//all middlewares share same request and response objects