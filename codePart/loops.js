let arr = [1, 2, 3, 4]

//returns a new array
let ans = arr.map((value)=> value * 2)
console.log(ans)

//returns a new array
ans = arr.filter((val)=>val % 2 == 0)
console.log(ans)


const arrFunction = ()=>{
    console.log("hello world")
}
arrFunction()