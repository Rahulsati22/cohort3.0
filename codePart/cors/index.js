const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
app.use(express.json())
app.post('/sum', (req, res)=>{
    console.log(req.body)
    res.send(Number(req.body.a)+ Number(req.body.b))
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})