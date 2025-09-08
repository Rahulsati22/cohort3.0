const express = require('express')
const app = express()



app.get('/', (req, res)=>{
    console.log(req.query.a)
    console.log(req.query.b)
    res.send(`The value of a is ${req.query.a} and the value of b is ${req.query.b}`)
})

//here we are using concept of queries
app.get('/sum', (req,  res)=>{

    res.send(Number(req.query.a) + Number(req.query.b))
})

app.get('/sub',(req, res)=>{
    res.send(Number(req.query.a) - Number(req.query.b))
})

app.get('/mul',(req, res)=>{
    res.send(Number(req.query.a) * Number(req.query.b))
})

app.get('/div', (req, res)=>{
    if (req.query.b == 0)
        res.status(400).send("bad request")
    res.send(Number(req.query.a) / Number(req.query.b))
})


app.get('/sum', (req,  res)=>{

    res.send(Number(req.query.a) + Number(req.query.b))
})

app.get('/sub',(req, res)=>{
    res.send(Number(req.query.a) - Number(req.query.b))
})

app.get('/mul',(req, res)=>{
    res.send(Number(req.query.a) * Number(req.query.b))
})

app.get('/div', (req, res)=>{
    if (req.query.b == 0)
        res.status(400).send("bad request")
    res.send(Number(req.query.a) / Number(req.query.b))
})




app.listen(3000, ()=>{
    console.log('running on port 3000')
})