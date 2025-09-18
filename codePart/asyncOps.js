//this is the setTimeOutPromisified
function setTimeOutPromisified(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

 

//duration in milli seconds
const ms = 1000, ms2 = 3000, ms3 = 5000


//Promises helps us to convert call back into something that is less ugly using .then()
setTimeOutPromisified(ms).then(()=>{
    console.log("hi");
    return setTimeOutPromisified(ms2)
}).then(()=>{
    console.log("hello")
    return setTimeOutPromisified(ms3)
}).then(()=>{
    console.log("hello there")
})






//call back hell example -> When we have to perform many unsynchronous operations in a nested way the code looks very ugly and considered as callback hell
setTimeout(() => {
    console.log("first level of call back hell")
    setTimeout(() => {
        console.log("second level of callback hell")
        setTimeout(() => {
            console.log("third level of callback hell")
        }, 5000)
    }, 4000)
}, 2000)


 


// async await -> it is a way to write asynchronous code such that it looks and behave like
// a synchronous code

let solve = async ()=>{
    await setTimeOutPromisified(1000)
    console.log("hi")
    await setTimeOutPromisified(3000)
    console.log("hello")
    await setTimeOutPromisified(5000)
    console.log("hello there")
}

solve()

console.log("hey there")