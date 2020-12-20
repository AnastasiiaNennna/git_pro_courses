'use strict'

let calc = createCalculator(100);

function createCalculator(a) {
    return {
        add: (b) => (b >= 0) ? a = a + b : null,
        sub: (b) => (b >= 0) ? a = a - b : null,
        mult: (b) => (b >= 0) ? a = a * b : null,
        div: (b) => (b >= 1) ? a = a / b : null,
        set: (b) => (b >= 0) ? a = b : null,
    };
};