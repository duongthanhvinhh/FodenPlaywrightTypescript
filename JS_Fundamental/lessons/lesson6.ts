let customerFirstName: string = "Foden"
let customerLasterName: string = "Duong"
let customerAge: number = 25

type Customer = {firstName: string, lastName: string, age: number, isActive: boolean}

let customer: Customer = {
    firstName: customerFirstName,
    lastName: customerLasterName,
    age: customerAge,
    isActive: true
}

console.log(customer)