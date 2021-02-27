const sum = require('./add')
const difference = require('./sub')
const multiplication = require('./mult')
const division = require('./div')

module.exports = {
    add: sum.add,
    sub: difference.sub,
    mult: multiplication.mult,
    div: division.div
}