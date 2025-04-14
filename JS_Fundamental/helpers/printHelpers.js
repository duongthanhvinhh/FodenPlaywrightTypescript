export function calculateAge(birthYear){
    const currentYear = new Date().getFullYear()
    return currentYear - birthYear
}

class CustomerDetails{
    constructor(name, age){
        this.name = name
        this.age = age
    }
    /**
     * This method will print customer details
     * @returns {void}
     * @param {string} name - Customer name
     * @param {number} age - Customer age
     */
    printCustomerDetails(){
        console.log(`Customer name: ${this.name}`)
        console.log(`Customer age: ${this.age}`)
    }
}
export var customerDetails = new CustomerDetails('Foden', 24)