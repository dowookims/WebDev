const c = new Calendar(new Date(2020, 0, 1));

const m = new Month(c.year, c.month, []);

console.log(m.drawMonth());