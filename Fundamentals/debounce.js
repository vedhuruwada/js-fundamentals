 // Custom Debounce
 const customDebounce = (cb, delay) => {
    let timer;
    return (...args) => {
        if (timer) clearInterval(timer);
        timer = setTimeout (cb.apply(this, args), delay);
    }
 }

 //Custom Throttle
 const customThrottle = (cb, limit) => {
    let lastCall = 0;
    return (...args) => {
        let current = Date().now();
        if (current - lastCall >= limit) {
            current = lastCall;
            cb.apply(this, args);
        }
    }
 }