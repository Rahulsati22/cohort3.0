/* code compile hojaega lekin warning aaegi*/










// -------------------------------------------------some code in ts---------------------------------------//
let a = 10
let ab = "hello"
function sum(a: number, b: number) {
    return a + b
}
console.log(a)
console.log(ab)
// -------------------------------------------------some code in ts---------------------------------------//











/*ts.config typescript ki setting hoti hai*/




//-----------------------------------------basic types in typescript---------------------------------//
/* primitive types(number, string, boolean),  arrays, tuples, enums, any, unknown, void, null, undefined never */
/* reference -> [], {}, () */

let first:number = 10
let second:string = "hello world"
let third:boolean = false

// array
let arr:(string|number)[]=[1, 2, 3, "my name is sati"]
// let arr2 = [1, 2]
// arr2 = ["hello world"] //warning because arr2 jo hai number ka array hai


//tupple (fixed size array with fixed types)
let fourth :[number, string] = [1, "hello"]

// enums
enum UserRoles{
    ADMIN = 12,
    USER = 13,
    GUEST = 14,
    SUPER_ADMIN = "super_admin"
}

//enums->enumerations
enum StatusCodes{
    SUCCESS = 200,
    NOT_FOUND = 404
}

let userRoles;

(function(userRoles){
    userRoles["Admin"] = "Rahulji"
    userRoles["Guests"] = "Ayush"
})(userRoles||(userRoles={}))



console.log(UserRoles.ADMIN, UserRoles.GUEST, UserRoles.USER, UserRoles.SUPER_ADMIN, userRoles.Admin)
console.log(StatusCodes.NOT_FOUND, StatusCodes.SUCCESS)




//printing every variable
console.log(first, second, third, arr, fourth)
// let arr2:(number)[] = ["hello world"] not possible

// first = "hello"
// second = 10  warning show hogi dono pe ki pehle kuch aur and ab kuch aur





// when the variable doesn't have any value or type then it is of type any
let value;
value = 2
value = "hello"
value = true

let values:number;
// values = "hello"//not allowed
values = 2 //allowed



// now reading about the unknown type
let fifth:unknown;
fifth = 2
fifth = "hello"

// fifth.toUpperCase() not allowed in type unknown but allowed in type any
if (typeof fifth === 'string') {
    fifth.toUpperCase()
} //this way we can do this




//now reading about the void

function sumFunc():number{
    return 2;
}


//defining return type as void because function is not returning anything
function greet():void{
    console.log("hello ohaiyo gosaimos")
}


function booleanTypes():boolean{
    return true;
}


// reading type null
function nullType():null{
    return null;
}


let sixth : string|null;
sixth = "my name is rahul sati and i am from haridwar"



// reading type undefined
let seventh:undefined;
seventh = undefined



//reading type never
function abcd():never{
    while(true){}
}

// abcd()
console.log("hello world") //color dekho iska abcd se comment htake
//-----------------------------------------basic types in typescript---------------------------------//


























// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//

// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//