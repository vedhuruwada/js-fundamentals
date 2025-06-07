// Map Polyfill
Array.prototype.myMap = (cb) => {
    let temp = [];
    for (let i=0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }
    return temp;
}

// Filter Polyfill
Array.prototype.myFilter = (cb) => {
    let temp = [];
    for (let i=0; i<this.length; i++) {
        if (cb(this[i], i, this)) {
            temp.push(cb(this[i], i, this));
        }
    }
};

// Reduce Polyfill
Array.prototype.myReducer = (cb, initialValue) => {
    let accumulator = initialValue;
    for (let i=0; i<this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    };
    return accumulator;
}