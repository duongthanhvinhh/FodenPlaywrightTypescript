//Functions
function greet(name){
    console.log(`Hello, ${name}!`)
}
greet('Foden') //Output: Hello, Foden!

//Anonymous function
const greetUsingAnonymousFunction = function(visitor){
    console.log(`Hello, ${visitor}!`)
}
greetUsingAnonymousFunction('Foden') //Output: Hello, Foden!

//Arrow function (ES6 function syntax)
const greetUsingArrowFunction = (visitor) => {
    console.log(`Hello, ${visitor}!`)
}
greetUsingArrowFunction('Foden') //Output: Hello, Foden!

//Import functions
import { calculateAge } from '../helpers/printHelpers.js'
const birthYear = 1974
const age = calculateAge(birthYear)
console.log(`You are ${age} years old`) //Output: You are 23 years old


//Import everything
import * as helper from '../helpers/printHelpers.js'
const birthYear2 = 1974
const age2 = helper.calculateAge(birthYear2)
console.log(`You are ${age2} years old`) //Output: You are 23 years old