exports.abs = (num) => {
    let n = 0;
    num > 0 ? n = num : n = -num;
    return n;
};

exports.circleArea = (r) => {
    return r * r * Math.PI;
};

exports.sayHello = () => console.log("HELLO WORLD!");