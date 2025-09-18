const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = "upar ghoda neche ghoda aage ghoda peeche ghoda"

const app = express()

const users = []

app.use(express.json())

app.get('/', (req, res) => {
    res.send("going to learn authentication in today's video")
})


function ifAlreadyExists(req, res, next) {
    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).send("please provide username and password")

    const username = req.body.username
    const password = req.body.password

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username)
            return res.send("user already exists")
    }
    return next()
}

async function ifNotExist(req, res, next) {
    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).send("please provide username and password")

    const username = req.body.username
    const password = req.body.password

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && await bcrypt.compare(password, users[i].password)) {
            const token = jwt.sign(
                { username: users[i].username },   // payload
                JWT_SECRET,                   // secret key
                { expiresIn: "1h" }           // token expiry
            );
             
            users[i].token = token
            req.headers.authorization = token
            console.log(users[i])
            return next()
        }
    }
    return res.send({ message: "user doesn't exist" })
}



app.post('/register', ifAlreadyExists, async (req, res) => {

    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).send("please provide username and password")

    const usersname = req.body.username
    const userspassword = req.body.password

    const hashedPassword = await bcrypt.hash(userspassword, 10)


    users.push({
        username: usersname,
        password: hashedPassword
    })
    return res.send('this is the register page')
})

app.post('/login', (req, res) => {
    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).send("please provide username and password")

    const username = req.body.username
    const password = req.body.password


    
    for (let i = 0; i < users.length; i++){
        if (users[i].username == username){
            const token = jwt.sign({username}, JWT_SECRET)
            return res.send({message : 'this is the login page', token})
        }
    }
    return res.send({ message: 'user not found' })
})



app.get('/me', (req, res)=>{
    if (!req.headers.authorization)
        res.send("please send token")

    const token = jwt.decode(req.headers.authorization, JWT_SECRET).username
    console.log(token)

    res.send(token)
})

app.listen(3000, () => {
    console.log("running on port 3000")
})