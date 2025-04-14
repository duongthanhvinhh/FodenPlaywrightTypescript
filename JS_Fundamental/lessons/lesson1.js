console.log("Foden Duong")

console.log(nameLet) //ReferenceError: Cannot access 'nameLet' before initialization
let nameLet = "Foden Duong"

console.log(nameConst) //ReferenceError: Cannot access 'nameConst' before initialization
const nameConst = "Foden Duong"

console.log(nameVar) //Output: undefined
var nameVar = "Foden Duong"


/*
When to Use var, let, or const?
1. Always declare variables
2. Always use const if the value should not be changed
3. Always use const if the type should not be changed (Arrays and Objects)
4. Only use let if you can't use const
5. Only use var if you MUST support old browsers.
*/
/*
let can be reassigned.
const can not be reassigned.
let and const have block scope.
let and const can not be redeclared.
let and const must be declared before use.
let and const does not bind to this.
let and const are not hoisted.
Variables declared with let have Block Scope
Variables declared with let must be Declared before use
Variables declared with let cannot be Redeclared in the same scope - But can be Redeclared in different scopes
*/

//Data types - In JS we have 5 primitive data types
//String
let name = "Foden Duong" //String
//Number
let age = 18 //Number
//Boolean
let isAdult = true //Boolean
//Null
let address = null //Null
//Undefined
let phoneNumber //Undefined




//Single quotes, double quotes, and backticks
let name1 = 'Foden Duong' //Single quotes
let name2 = "Foden Duong" //Double quotes



//Single quotes and double quotes are used for strings - with different quotes, no need to escape
let quote1 = "It's a beautiful day";  // ✅ No need to escape '
let quote2 = 'He said, "Hello!"';     // ✅ No need to escape "

//But if you used the same kind of quote inside the string, you'd need to escape it:
let quote3 = 'It\'s a beautiful day';
let quote4 = "He said, \"Hello!\"";





let name3 = `Foden Duong` //Backticks
//Backticks are used for template literals
//Template literals are used for multi-line strings and string interpolation

//String interpolation
let firstName = 'Foden'
let lastName = 'Duong'
let fullNameUsingConcatenation = firstName + ' ' + lastName //String concatenation
let fullName = `${firstName} ${lastName}` //String interpolation
console.log(fullName) //Output: Foden Duong

//Multi-line strings
let multiLineString = `This is a multi-line string
This is the second line
This is the third line` //Multi-line strings
console.log(multiLineString) //Output: This is a multi-line string


//String methods
let str = 'Hello World'
console.log(str.length) //Output: 11
console.log(str.toUpperCase()) //Output: HELLO WORLD
console.log(str.toLowerCase()) //Output: hello world
console.log(str.charAt(0)) //Output: H
console.log(str.charAt(str.length - 1)) //Output: d
console.log(str.indexOf('o')) //Output: 4
console.log(str.lastIndexOf('o')) //Output: 7
console.log(str.slice(0, 5)) //Output: Hello
console.log(str.slice(6)) //Output: World
console.log(str.substring(0, 5)) //Output: Hello
console.log(str.substr(0, 5)) //Output: Hello
console.log(str.split(' ')) //Output: [ 'Hello', 'World' ]
console.log(str.split('o')) //Output: [ 'Hell', ' W', 'rld' ]
console.log(str.replace('World', 'Duong')) //Output: Hello Duong
console.log(str.includes('Hello')) //Output: true
console.log(str.startsWith('Hello')) //Output: true
console.log(str.endsWith('World')) //Output: true
//Number methods - Part 1
let num = 10
console.log(num.toString()) //Output: 10
console.log(num.toFixed(2)) //Output: 10.00
console.log(num.toExponential(2)) //Output: 1.00e+1
console.log(num.toPrecision(2)) //Output: 10
console.log(num.toLocaleString()) //Output: 10
console.log(num.toLocaleString('en-US')) //Output: 10
console.log(num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })) //Output: $10.00
console.log(num.toLocaleString('en-US', { style: 'percent' })) //Output: 1,000%
//Number methods - Part 2
let num1 = 10.5
let num2 = 20.5
console.log(Math.round(num1)) //Output: 11
console.log(Math.floor(num1)) //Output: 10
console.log(Math.ceil(num1)) //Output: 11
console.log(Math.abs(num1)) //Output: 10.5
console.log(Math.max(num1, num2)) //Output: 20.5
console.log(Math.min(num1, num2)) //Output: 10.5
console.log(Math.random()) //Output: Random number between 0 and 1
console.log(Math.random() * 10) //Output: Random number between 0 and 10
console.log(Math.random() * 10 + 1) //Output: Random number between 1 and 10
console.log(Math.floor(Math.random() * 10 + 1)) //Output: Random number between 1 and 10
console.log(Math.floor(Math.random() * 10)) //Output: Random number between 0 and 9
console.log(Math.floor(Math.random() * 100)) //Output: Random number between 0 and 99
console.log(Math.floor(Math.random() * 100) + 1) //Output: Random number between 1 and 100
console.log(Math.floor(Math.random() * 100) + 1) //Output: Random number between 1 and 100
//Math methods
console.log(Math.PI) //Output: 3.141592653589793
console.log(Math.E) //Output: 2.718281828459045
console.log(Math.sqrt(16)) //Output: 4
console.log(Math.pow(2, 3)) //Output: 8