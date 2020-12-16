'use strict'

function getSum(n) {
    return (n === 1) ? n : n + getSum(n-1)
};

console.log(getSum(5));