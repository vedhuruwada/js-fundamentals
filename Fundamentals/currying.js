// Function currying
const f = (a) => {
    return (b) => {
        return `${a + b}`
    }
}

// create currying method
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return curry(...args);
        } else {
            return function(...next) {
                return curried(...args, ...next);
            }
        }
    }
}

const sum = (a, b, c, d) => a + b + c + d;
const totalSum = curry(sum);
console.log(totalSum(1)(3)(5)(7));