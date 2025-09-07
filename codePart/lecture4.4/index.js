const express = require('express')

const app = express()


//creating a check if the user's age is more than 14 or not
function isValidAge(age){
    return age >= 14 ? true : false
}


function isValidAgeMiddleware(request, response, next){
    if (request.query.age >= 14)
        next()

    else
        response.status(400).send("Age is invalid")
}


//this is the way1 which is not right and here repeating our code
/*
    app.get('/ride1', (request, response)=>{
        let age = request.query.age

        if (isValidAge(age))
            response.send(
                "Successfully joined the ride one"
            )
        else
            response.status(400).send("Age is invalid")
    })


    app.get('/ride2', (request, response)=>{
        let age = request.query.age

        if (isValidAge(age))
            response.send(
                "Successfully joined the ride one"
            )
        else
            response.status(400).send("Age is invalid")
    })


    app.get('/ride3', (request, response)=>{
        let age = request.query.age

        if (isValidAge(age))
            response.send(
                "Successfully joined the ride one"
            )
        else
            response.status(400).send("Age is invalid")
    }) 
*/

//in above code we are repeating ourselves. To avoid this repetition we should use middlewares

//as we are using isValidAgeMiddleware for each route so instead what we can do is
//app.use(isValidAgeMiddleware)


app.get('/ride1', isValidAgeMiddleware, (request, response)=>{
    response.status(200).send("Welcome to the ride1")
})

app.get('/ride2', isValidAgeMiddleware, (request, response)=>{
    response.status(200).send("Welcome to the ride2")
})

app.get('/ride3', isValidAgeMiddleware, (request, response)=>{
    response.status(200).send("Welcome to the ride3")
})





app.listen(3000, ()=>{
    console.log('app is running on 3000')
})