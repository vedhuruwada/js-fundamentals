// Function currying
const f = (a) => {
    return (b) => {
        return `${a + b}`
    }
}