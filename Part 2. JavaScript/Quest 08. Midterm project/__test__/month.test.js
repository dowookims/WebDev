const Month = require('../t/month');

describe("Month initialize test", () => {
  const y = 2020;
  const m = 3;
  const nextMonth = new Date(y, m+1, 0)
  const thisMonth = new Date(y, m, 1);
  const d = nextMonth.getDate();
  const month = new Month(y, m, []);

  test("Month year", () => {
    expect(month.year).toBe(y);
  });

  test("Month m", () => {
    expect(month.month).toBe(m);
  });

  test("Month d", () => {
    expect(month.totalDate).toBe(d);
  });

  test("Month totalDate", () => {
    expect(month.totalDate).toBe(nextMonth.getDate());
  });

  test("Month firstDay", () =>{
    expect(month.firstDay).toBe(thisMonth.getDay())
  });

  test("Month weeks", () => {
    expect(month.weeks).toBe(5)
  })
});