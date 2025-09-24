"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let x = 1;
// x = "Hello world" won't be able to do it without ts
x = 1;
x = "Hello world";
console.log(x);
//function greet user given their name
const greet = (name) => {
    console.log("hello " + name + " how are you?");
};
const greet2 = (value) => {
    console.log(value);
};
greet("rahul");
greet2("rahul");
greet2(2);
//number any
//# sourceMappingURL=index.js.map