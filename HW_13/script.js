'use strict'

const CALLORIES_PROPERTY = 'callories'
const PRICE_PROPERTY  = 'price'

function Hamburger(size) {
    this.size = size,
    this.toppings = []
}

Hamburger.SIZE_SMALL = {
    price: 50,
    callories: 20,
}

Hamburger.SIZE_MEDIUM = {
    price: 75,
    callories: 30,
}

Hamburger.SIZE_BIG = {
    price: 10,
    callories: 40,
}

Hamburger.TOPPING_MAYO = {
    price: 20,
    callories: 5,
}

Hamburger.TOPPING_SALAD = {
    price: 20,
    callories: 5,
}

Hamburger.TOPPING_POTATO = {
    price: 15, 
    callories: 10,
}

Hamburger.TOPPING_CHEESE = {
    price: 10,
    callories: 20,
}

Hamburger.TOPPING_SAUCE = {
    price: 15,
    callories: 0,
}

Hamburger.calc = function(arr, type, initialValue) {
    return arr.reduce((sum, el) => {
        return sum + el[type];
    }, initialValue);
}

Hamburger.prototype.addTopping = function (topping) {
    return this.toppings.push(topping)
}

Hamburger.prototype.getPrice = function () {
    return Hamburger.calc(this.toppings, PRICE_PROPERTY, this.size.price)
};

Hamburger.prototype.getCallories = function () {
    return Hamburger.calc(this.toppings, CALLORIES_PROPERTY, this.size.callories)
}
const hamburger = new Hamburger(Hamburger.SIZE_SMALL);

hamburger.addTopping(Hamburger.TOPPING_MAYO)
hamburger.addTopping(Hamburger.TOPPING_CHEESE)
hamburger.addTopping(Hamburger.TOPPING_SAUCE)

console.log("Callories with sauce: " + hamburger.getCallories());
console.log("Price with sauce: " + hamburger.getPrice());

const burger = new Hamburger(Hamburger.SIZE_MEDIUM);

burger.addTopping(Hamburger.TOPPING_MAYO)
burger.addTopping(Hamburger.TOPPING_CHEESE)
burger.addTopping(Hamburger.TOPPING_CHEESE)
burger.addTopping(Hamburger.TOPPING_POTATO)

console.log("Callories with sauce: " + burger.getCallories());
console.log("Price with sauce: " + burger.getPrice());
