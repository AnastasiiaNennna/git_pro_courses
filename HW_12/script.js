'use strict'

function Calculator(baseNum) {
    this.base = baseNum;
    this.add = function(num) {
        return (num >= 0) ? baseNum = baseNum + num : null;
    };
    this.sub = function(num) {
        return (num >= 0) ? baseNum = baseNum - num : null;
    };
    this.mult = function(num) {
        return (num >= 0) ? baseNum = baseNum * num : null;
    };
    this.div = function(num) {
        return (num >= 0) ? baseNum = baseNum / num : null;
    };
    this.set = function(num) {
        return (num >= 0) ? baseNum = num : null;
    };
    this.get = function() {
        return baseNum;
    };
};

let calc = new Calculator(10);

console.log(calc.add(20));
console.log(calc.sub(21));
console.log(calc.mult(2));
console.log(calc.div(3));
console.log(calc.get());
console.log(calc.set(2));
console.log(calc.add(26));