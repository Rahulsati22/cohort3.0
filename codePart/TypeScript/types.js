/* code compile hojaega lekin warning aaegi*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// -------------------------------------------------some code in ts---------------------------------------//
var a = 10;
var ab = "hello";
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
var first = 10;
var second = "hello world";
var third = false;
// array
var arr = [1, 2, 3, "my name is sati"];
// let arr2 = [1, 2]
// arr2 = ["hello world"] //warning because arr2 jo hai number ka array hai
//tupple (fixed size array with fixed types)
var fourth = [1, "hello"];
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
var userRoles;
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
var value;
value = 2;
value = "hello";
value = true;
var values;
// values = "hello"//not allowed
values = 2; //allowed
// now reading about the unknown type
var fifth;
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
var sixth;
sixth = "my name is rahul sati and i am from haridwar";
// reading type undefined
var seventh;
seventh = undefined;
//reading type never
function abcd() {
    while (true) { }
}
// abcd()
console.log("hello world"); //color dekho iska abcd se comment htake
//-----------------------------------------basic types in typescript---------------------------------//
// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//
var eighth; //yha pe hum type bta rhe hain
var ninth = 12; //yha typescript khud pta lga rha hai variable ka type(type inference)
var tenth; //this is type annotation
function func4(num1, num2) {
    return 2 * 2;
}
// -----------------------------------------------------------Type Inference and Type Annotation-----------------------------------------------------------//
// -----------------------------------------------------------Interfaces and Type Aliases-----------------------------------------------------------//
/*
    interface ka kaam hai object ka shape btana
*/
function func5(a, b) {
    //a ko number related sare function dikhenge a. krke
    //b ko string related sare function dikhenge b. krke
}
function func6(obj, obj2) {
    // obj. krke kuch nahi aaega iske andr ky hoga ye btane ke liye interface ka use aaega
    console.log(obj.name);
    console.log(obj.email);
    console.log(obj.passowrd);
    console.log(obj.phoneNumber);
    console.log(obj.role);
    console.log(obj2.name);
    console.log(obj2.email);
}
func6({ name: "rahul sati", email: "rahulsati9969@gmail.com", passowrd: "helloworld@123", phoneNumber: 7302253826, role: "Admin" }, { name: 'rahul', email: 'rahulsati9969@gmail.com' });
var eleventh;
eleventh = 10;
console.log(eleventh);
var twelth;
twelth = true;
console.log(twelth);
twelth = 2;
console.log(twelth);
twelth = "hello";
console.log(twelth);
// -----------------------------------------------------------Interfaces and Type Aliases-----------------------------------------------------------//
//-----------------------------------------------------------Union and Intersection-----------------------------------------------------------//
var thirteenth; //example of union
thirteenth = "hello world";
console.log(thirteenth);
thirteenth = 2;
console.log(thirteenth);
function somefunc(a) {
    console.log(a.name);
    console.log(a.email);
    a.getDetails("hello");
}
var myfunc = function (a) {
    console.log(a);
};
somefunc({ name: "rahul", email: "rahulsati9969@gmail.com", getDetails: function (a) { return myfunc(a); } });
//-----------------------------------------------------------Union and Intersection-----------------------------------------------------------//
//-----------------------------------------------------------Classes and Objects-----------------------------------------------------------//
var User3 = /** @class */ (function () {
    function User3() {
        this.name = "rahul";
        this.email = "rahulsati9969@gmail.com";
        this.password = "matrukibijlikamandola";
    }
    return User3;
}());
var user1 = new User3();
console.log(user1.name);
console.log(user1.email);
console.log(user1.password);
//class with constructor
var BottleMaker = /** @class */ (function () {
    function BottleMaker(length, breadth, height) {
        this.length = length;
        this.breadth = breadth;
        this.height = height;
        this.length = length;
        this.breadth = breadth;
        this.height = height;
    }
    BottleMaker.prototype.display = function () {
        console.log(this.length);
        console.log(this.breadth);
        console.log(this.height);
    };
    BottleMaker.prototype.volume = function () {
        console.log(this.length * this.breadth * this.height);
    };
    return BottleMaker;
}());
var bottle1 = new BottleMaker(10, 20, 30);
bottle1.display();
bottle1.volume();
//another example of class with constructor
var Human = /** @class */ (function () {
    function Human(name, color, gender, height) {
        this.name = name;
        this.color = color;
        this.gender = gender;
        this.height = height;
        this.age = 0;
        this.name = name;
        this.color = color;
        this.gender = gender;
        this.height = height;
    }
    Human.prototype.display = function () {
        console.log(this.name);
        console.log(this.color);
        console.log(this.gender);
        console.log(this.height);
    };
    return Human;
}());
var rahul = new Human("rahul", "white", "male", 5);
rahul.display();
/* Public and Private access modifier
   *public access modifier are accessible from anywhere where as we have to use getters and setters to access private access modifier
*/
/*
   *example of private access modifier and public access modifier
*/
var BottleMaker2 = /** @class */ (function () {
    function BottleMaker2(name) {
        this.name = name;
        this.name = name;
    }
    BottleMaker2.prototype.set = function (nameNew) {
        this.name = nameNew;
    };
    BottleMaker2.prototype.get = function () {
        console.log(this.name);
    };
    return BottleMaker2;
}());
var bottleb1 = new BottleMaker2("milton");
//it is allowed but it will show error laal laal aaega comment hta ke dekho
//console.log(bottleb1.name)
//bottleb1.name = 'hululu'
//private variable are only accessible inside the class they are created whereas public variable are accessible from anywhere and protected are only accessible inside the class and its child classes
bottleb1.set('hululu');
bottleb1.get();
//now writing example of protected
var BottleMaker3 = /** @class */ (function () {
    function BottleMaker3(name) {
        this.name = name;
        this.name = name;
    }
    return BottleMaker3;
}());
var ChildBottle = /** @class */ (function (_super) {
    __extends(ChildBottle, _super);
    function ChildBottle(name) {
        return _super.call(this, name) || this;
    }
    ChildBottle.prototype.get = function () {
        //agar private hota to this.name nhi kr pate
        console.log(this.name);
    };
    ChildBottle.prototype.set = function (newName) {
        this.name = newName;
    };
    return ChildBottle;
}(BottleMaker3));
var childBottle = new ChildBottle('hululu');
childBottle.get();
childBottle.set('hey');
childBottle.get();
// childBottle.name not allowed in case of private and protected elements
/*now we will see the use of read only -> agar aap kisi variable ko bs chahte ho padh hi pae and change na kr pae then use read only*/
var BottleMaker4 = /** @class */ (function () {
    function BottleMaker4(name) {
        this.name = name;
        this.name = name;
    }
    Object.defineProperty(BottleMaker4.prototype, "username", {
        //in this way getter and setters work
        get: function () {
            //agar private hota to this.name nhi kr pate
            return this.name;
        },
        //in this way getter and setter work
        set: function (name) {
            // this.name = name
            console.log(name);
        },
        enumerable: false,
        configurable: true
    });
    return BottleMaker4;
}());
var childBottle2 = new BottleMaker4('hululu');
console.log(childBottle2.username);
childBottle2.username = 'hello world';
// example of static classes
var Nodes = /** @class */ (function () {
    function Nodes() {
    }
    Nodes.version = 1.2;
    return Nodes;
}());
console.log(Nodes.version);
// Node.version cannot do it if the class is not static
//abstract classes in typescript
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log('moving');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log('bow bow');
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.makeSound = function () {
        console.log('meow meow');
    };
    return Cat;
}(Animal));
var dog = new Dog();
dog.makeSound();
dog.move();
var cat = new Cat();
cat.makeSound();
cat.move();
//-----------------------------------------------------------Classes and Objects-----------------------------------------------------------//
