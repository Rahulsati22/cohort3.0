let x: number | string = 1

// x = "Hello world" won't be able to do it without ts
x = 1
x = "Hello world"
console.log(x)

//function greet user given their name
const greet = (name: string) => {
    console.log("hello " + name + " how are you?")
}


//avoid using "any" type
const greet2 = (value: any) => {
    console.log(value)
}


const sumFunctions = (value: number): number => {
    return productFunc1(value) + productFunc2(value)
}

const productFunc1 = (value: number): number => {
    return value * value
}


//in this way we can give return type to a function
const productFunc2 = (value: number): number => {
    return value * value
}




greet("rahul")
greet2("rahul")
greet2(2)


//number any