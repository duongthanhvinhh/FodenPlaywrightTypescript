
//Objects
let foden = {
    'firstName': 'Foden',
    'lastName': 'Duong',
    'cars': ['BMW', 'Mercedes', 'Audi']
}
console.log(foden['firstName'])
console.log(foden.lastName)
console.log(foden.firstName + ' ' + foden.lastName)
console.log(foden.cars[0]) //Output: BMW

foden.firstName = 'Phil'
foden['lastName'] = 'Foden'
console.log(`${foden.firstName} ${foden.lastName}`)

//Arrays
let cars = ['BMW', 'Mercedes', 'Audi']
console.log(cars[0]) //Output: BMW
console.log(cars.length) //Output: 3
console.log(cars[cars.length - 1]) //Output: Audi
console.log(cars[cars.length - 4]) //Output: undefined
cars[2] = 'Mazda'
console.log(cars[2]) //Output: Mazda


//Equality operators
let x = 5
console.log(x == '5') //Output: true (Loose equality - Only check value)
console.log(x === '5') //Output: false (Strict equality - Check value and type)

//Logic operators
let a = 10
let b = '10'
console.log(a != b) //Output: false (Loose inequality - Only check value) => a == b return true -> so a != b return false
console.log(a !== b) //Output: true (Strict inequality - Check value and type) => a === b return false -> so a !== b return true
console.log(a > b) //Output: false
console.log(a < b) //Output: false
console.log(a >= b) //Output: true
console.log(a <= b) //Output: true
console.log(6 !== 6) //Output: false
console.log(6 != 6) //Output: false;
console.log(6 != '6') //Output: false
