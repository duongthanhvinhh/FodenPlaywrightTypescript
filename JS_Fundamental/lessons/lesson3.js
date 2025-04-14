//Loop

for(let i = 0; i < 10; i++) {
    console.log(i)
}
// //Output: 0 1 2 3 4 5 6 7 8 9

// For of loop
let cars = ['BMW', 'Mercedes', 'Audi']
for (let car of cars){
    console.log(car)
    if(car === 'Audi'){
        break
    }
}

// For loop in ES6
let names = ['Foden', 'Duong', 'Phil']
names.forEach(name => {
    console.log(name)
    if(name === 'Phil'){
        return
    }
})