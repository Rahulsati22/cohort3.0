const express = require('express')
const bodyParser = require('body-parser')
const app = express()


//both will be use to parse the incoming data to json
app.use(express.json())

app.use(bodyParser.json())
let request = 0
function printThings(req, response, next){
    console.log(req.url)
    console.log(req.method)
    console.log(new Date())
    next()
}

app.use(printThings)
app.use(express.json())

app.get('/request',(req, res)=>{
    return res.status(200).json({
        request
    })

})
app.get('/', (req, res)=>{
    console.log(req.query.a)
    console.log(req.query.b)
    res.send(`The value of a is ${req.query.a} and the value of b is ${req.query.b} and the number of total requests are ${request}`)
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


//here we will use the concept of params
app.get('/sum/:a/:b', (req,  res)=>{

    res.send(Number(req.params.a) + Number(req.params.b))
})

app.get('/sub/:a/:b',(req, res)=>{
    res.send(Number(req.params.a) - Number(req.params.b))
})

app.get('/mul/:a/:b',(req, res)=>{
    res.send(Number(req.params.a) * Number(req.params.b))
})

app.get('/div/:a/:b', (req, res)=>{
    if (req.query.b == 0)
        res.status(400).send("bad request")
    res.send(Number(req.params.a) / Number(req.params.b))
})




app.listen(3000, ()=>{
    console.log('running on port 3000')
})




//cors is one of the most important topics