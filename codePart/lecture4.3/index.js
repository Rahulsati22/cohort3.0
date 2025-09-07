const express = require("express")
function calculateSum(n) {
    return (n * (n + 1)) / 2
}


const app = express()






//this is the databse (assume it as a database)

let johnKidneys = [
    {
        name : 'john',
        kidney : [{healthy : true}, {healthy : false}]
    }
]


app.use(express.json())






app.get('/', (request, response) => {
    const n = Number(request.query.n)
    const ans = calculateSum(n)
    response.send(ans.toString())
})



app.get('/getkidney', (request, response) => {
    let name = johnKidneys[0].name
    let kidneys = johnKidneys[0].kidney
    let healthyKidneys = 0
    for (let i = 0; i < kidneys.length; i++)
        if (kidneys[i].healthy)
            healthyKidneys++
    
    let unhealthyKidneys = kidneys.length - healthyKidneys
    return response.send({name : name, totalKidneys : kidneys.length, healthyKidneys : healthyKidneys, unhealthyKidneys : unhealthyKidneys})
})


 
//let us put an unhealthy kidney

app.post('/addkidney', (request, response)=>{
    //during post request you send data in the body
    const isHealthy = request.body.isHealthy
    johnKidneys[0].kidney.push({healthy:isHealthy})
    console.log(johnKidneys)
    response.send({johnKidneys, message : "successfully added a kidney"})
})


//let us convert all the unhealthy kidney to healthy kidney
app.put('/updatekidney', (request, response)=>{
    //converting unhealthy kidney to a healthy kidney
    for (let i = 0; i < johnKidneys[0].kidney.length; i++){
        if (johnKidneys[0].kidney[i].healthy == false)
            johnKidneys[0].kidney[i].healthy = true
    }
    response.send({johnKidneys, message : "successfully updated the kidneys"})
})


//let us delete first kidney

app.delete('/deletekidney', (request, response)=>{
    let cnt = 0;
    for (let i = 0; i < johnKidneys[0].kidney.length; i++){
        if (johnKidneys[0].kidney[i].healthy == false){
            cnt++;
            break;
        }
    }
    if (cnt == 0){
        return response.status(204).send("all kidneys are okay")
    }
    johnKidneys[0].kidney = johnKidneys[0].kidney.filter((val)=> val.healthy == true)
    response.send(johnKidneys)
})



app.listen(3000, () => { console.log("server running on 3000") })


/*this is a small express server
    status codes-> 
        200 -> everything went fine
        401-> route is wrong
        500->some error occured
        411 -> input is incorrect 
        403 -> unauthorized access
*/


/*
    request methods
        get -> get the data from the database
        post -> give something to the data base
        put -> update something into the database
        delete -> delete something from the database
 */


