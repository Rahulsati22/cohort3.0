"use strict";
/* code compile hojaega lekin warning aaegi*/
Object.defineProperty(exports, "__esModule", { value: true });
// -------------------------------------------------some code in ts---------------------------------------//
let a = 10;
let ab = "hello";
function sum(a, b) {
    return a + b;
}
console.log(a);
console.log(ab);
// -------------------------------------------------some code in ts---------------------------------------//
/*ts.config typescript ki setting hoti hai*/
//-----------------------------------------basic types in typescript---------------------------------//
/* primitive types(number, string, boolean),  arrays, tuples, enums, any, unknown, void, null, undefined never */
/* reference -> [], {}, () */
let first = 10;
let second = "hello world";
let third = false;
// array
let arr = [1, 2, 3, "my name is sati"];
// let arr2 = [1, 2]
// arr2 = ["hello world"] //warning because arr2 jo hai number ka array hai
//tupple (fixed size array with fixed types)
let fourth = [1, "hello"];
// enums
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["ADMIN"] = 12] = "ADMIN";
    UserRoles[UserRoles["USER"] = 13] = "USER";
    UserRoles[UserRoles["GUEST"] = 14] = "GUEST";
    UserRoles["SUPER_ADMIN"] = "super_admin";
})(UserRoles || (UserRoles = {}));
//enums->enumerations
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["SUCCESS"] = 200] = "SUCCESS";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
})(StatusCodes || (StatusCodes = {}));
let userRoles;
(function (userRoles) {
    userRoles["Admin"] = "Rahulji";
    userRoles["Guests"] = "Ayush";
})(userRoles || (userRoles = {}));
console.log(UserRoles.ADMIN, UserRoles.GUEST, UserRoles.USER, UserRoles.SUPER_ADMIN, userRoles.Admin);
console.log(StatusCodes.NOT_FOUND, StatusCodes.SUCCESS);
//printing every variable
console.log(first, second, third, arr, fourth);
// let arr2:(number)[] = ["hello world"] not possible
// first = "hello"
// second = 10  warning show hogi dono pe ki pehle kuch aur and ab kuch aur
// when the variable doesn't have any value or type then it is of type any
let value;
value = 2;
value = "hello";
value = true;
let values;
// values = "hello"//not allowed
values = 2; //allowed
// now reading about the unknown type
let fifth;
fifth = 2;
fifth = "hello";
// fifth.toUpperCase() not allowed in type unknown but allowed in type any
if (typeof fifth === 'string') {
    fifth.toUpperCase();
} //this way we can do this
//now reading about the void
function sumFunc() {
    return 2;
}
//defining return type as void because function is not returning anything
function greet() {
    console.log("hello ohaiyo gosaimos");
}
function booleanTypes() {
    return true;
}
// reading type null
function nullType() {
    return null;
}
let sixth;
sixth = "my name is rahul sati and i am from haridwar";
// reading type undefined
let seventh;
seventh = undefined;
//reading type never
function abcd() {
    while (true) { }
}
// abcd()
console.log("hello world"); //color dekho iska abcd se comment htake
//-----------------------------------------basic types in typescript---------------------------------//
// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//
// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//
//# sourceMappingURL=types.js.map