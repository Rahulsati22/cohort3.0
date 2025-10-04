/* code compile hojaega lekin warning aaegi*/










// -------------------------------------------------some code in ts---------------------------------------//
let a = 10
let ab = "hello"
function sum(a: number, b: number): number {
    return a + b
}
console.log(a)
console.log(ab)
// -------------------------------------------------some code in ts---------------------------------------//











/*ts.config typescript ki setting hoti hai*/




//-----------------------------------------basic types in typescript---------------------------------//
/* primitive types(number, string, boolean),  arrays, tuples, enums, any, unknown, void, null, undefined never */
/* reference -> [], {}, () */

let first: number = 10
let second: string = "hello world"
let third: boolean = false

// array
let arr: (string | number)[] = [1, 2, 3, "my name is sati"]
// let arr2 = [1, 2]
// arr2 = ["hello world"] //warning because arr2 jo hai number ka array hai


//tupple (fixed size array with fixed types)
let fourth: [number, string] = [1, "hello"]

// enums
enum UserRoles {
    ADMIN = 12,
    USER = 13,
    GUEST = 14,
    SUPER_ADMIN = "super_admin"
}

//enums->enumerations
enum StatusCodes {
    SUCCESS = 200,
    NOT_FOUND = 404
}

let userRoles;

(function (userRoles) {
    userRoles["Admin"] = "Rahulji"
    userRoles["Guests"] = "Ayush"
})(userRoles || (userRoles = {}))



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

let values: number;
// values = "hello"//not allowed
values = 2 //allowed



// now reading about the unknown type
let fifth: unknown;
fifth = 2
fifth = "hello"

// fifth.toUpperCase() not allowed in type unknown but allowed in type any
if (typeof fifth === 'string') {
    fifth.toUpperCase()
} //this way we can do this




//now reading about the void

function sumFunc(): number {
    return 2;
}


//defining return type as void because function is not returning anything
function greet(): void {
    console.log("hello ohaiyo gosaimos")
}


function booleanTypes(): boolean {
    return true;
}


// reading type null
function nullType(): null {
    return null;
}


let sixth: string | null;
sixth = "my name is rahul sati and i am from haridwar"



// reading type undefined
let seventh: undefined;
seventh = undefined



//reading type never
function abcd(): never {
    while (true) { }
}

// abcd()
console.log("hello world") //color dekho iska abcd se comment htake
//-----------------------------------------basic types in typescript---------------------------------//


























// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//
let eighth: number; //yha pe hum type bta rhe hain
let ninth = 12; //yha typescript khud pta lga rha hai variable ka type(type inference)


let tenth: number; //this is type annotation
function func4(num1: number, num2: number): number {
    return 2 * 2
}
// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//












// -----------------------------------------------------------Interfaces and Type Aliases-----------------------------------------------------------//
/*
    interface ka kaam hai object ka shape btana
*/

function func5(a: number, b: string) {
    //a ko number related sare function dikhenge a. krke
    //b ko string related sare function dikhenge b. krke
}



//proper use case of interfaces
interface User {
    name: String,
    email: String,
    passowrd: String,
    phoneNumber: number,
    gender?: string //this is optional
}

//extending an interface
interface Admin extends User {
    role: String
}



//two interfaces of same name are always merged
interface first {
    name: String
}
interface first {
    email: String
}
function func6(obj: Admin, obj2: first) {
    // obj. krke kuch nahi aaega iske andr ky hoga ye btane ke liye interface ka use aaega
    console.log(obj.name)
    console.log(obj.email)
    console.log(obj.passowrd)
    console.log(obj.phoneNumber)
    console.log(obj.role)
    console.log(obj2.name)
    console.log(obj2.email)
}


func6({ name: "rahul sati", email: "rahulsati9969@gmail.com", passowrd: "helloworld@123", phoneNumber: 7302253826, role: "Admin" }, { name: 'rahul', email: 'rahulsati9969@gmail.com' })




/* Starting type aliases from here */
type sankhya = number
let eleventh: sankhya
eleventh = 10
console.log(eleventh)

//example
type muloptions = string | number | boolean | null
let twelth: muloptions
twelth = true
console.log(twelth)
twelth = 2
console.log(twelth)
twelth = "hello"
console.log(twelth)
// -----------------------------------------------------------Interfaces and Type Aliases-----------------------------------------------------------//







//-----------------------------------------------------------Union and Intersection-----------------------------------------------------------//
let thirteenth: string | number //example of union
thirteenth = "hello world"
console.log(thirteenth)
thirteenth = 2
console.log(thirteenth)




/*Example of intersection*/
type User2 = {
    name: String,
    email: String,
}

//this & sign shows intersection
type Admin2 = User2 & {
    getDetails: (user: string) => void
}

function somefunc(a: Admin2) {
    console.log(a.name)
    console.log(a.email)
    a.getDetails("hello")
}
const myfunc = (a: string) => {
    console.log(a)
}
somefunc({ name: "rahul", email: "rahulsati9969@gmail.com", getDetails: (a) => myfunc(a) })
//-----------------------------------------------------------Union and Intersection-----------------------------------------------------------//













//-----------------------------------------------------------Classes and Objects-----------------------------------------------------------//
class User3 {
    name = "rahul"
    email = "rahulsati9969@gmail.com"
    password = "matrukibijlikamandola"
}

let user1 = new User3()
console.log(user1.name)
console.log(user1.email)
console.log(user1.password)




//class with constructor
class BottleMaker {
    constructor(public length: number, public breadth: number, public height: number) {
        this.length = length
        this.breadth = breadth
        this.height = height
    }
    display(): void {
        console.log(this.length)
        console.log(this.breadth)
        console.log(this.height)
    }

    volume(): void {
        console.log(this.length * this.breadth * this.height)
    }
}

const bottle1 = new BottleMaker(10, 20, 30)
bottle1.display()
bottle1.volume()




//another example of class with constructor
class Human {
    age: number = 0;
    constructor(public name: string, public color: string, public gender: string, public height: number) {
        this.name = name;
        this.color = color;
        this.gender = gender;
        this.height = height;
    }
    display(): void {
        console.log(this.name)
        console.log(this.color)
        console.log(this.gender)
        console.log(this.height)
    }
}

let rahul = new Human("rahul", "white", "male", 5)
rahul.display()












/* Public and Private access modifier
   *public access modifier are accessible from anywhere where as we have to use getters and setters to access private access modifier
*/

/*
   *example of private access modifier and public access modifier
*/

class BottleMaker2 {
    constructor(private name: string) {
        this.name = name
    }
    set(nameNew: string) {
        this.name = nameNew
    }
    get() {
        console.log(this.name)
    }
}

let bottleb1 = new BottleMaker2("milton")

//it is allowed but it will show error laal laal aaega comment hta ke dekho
//console.log(bottleb1.name)
//bottleb1.name = 'hululu'
//private variable are only accessible inside the class they are created whereas public variable are accessible from anywhere and protected are only accessible inside the class and its child classes
bottleb1.set('hululu')
bottleb1.get()



//now writing example of protected
class BottleMaker3 {
    constructor(protected name: string) {
        this.name = name
    }
}

class ChildBottle extends BottleMaker3 {
    constructor(name: string) {
        super(name)
    }
    get() {
        //agar private hota to this.name nhi kr pate
        console.log(this.name)
    }
    set(newName: string) {
        this.name = newName
    }
}

let childBottle = new ChildBottle('hululu')
childBottle.get()
childBottle.set('hey')
childBottle.get()
// childBottle.name not allowed in case of private and protected elements













/*now we will see the use of read only -> agar aap kisi variable ko bs chahte ho padh hi pae and change na kr pae then use read only*/
class BottleMaker4 {
    constructor(public readonly name?: string) { //? ka mtlb hai aapki mrzi hai do ya na do
        this.name = name
    }

    //in this way getter and setters work
    get username() {
        //agar private hota to this.name nhi kr pate
        return this.name
    }

    //in this way getter and setter work
    set username(name){
        // this.name = name
        console.log(name)
    }
     
}
let childBottle2 = new BottleMaker4('hululu')
console.log(childBottle2.username)
childBottle2.username='hello world'
//-----------------------------------------------------------Classes and Objects-----------------------------------------------------------//