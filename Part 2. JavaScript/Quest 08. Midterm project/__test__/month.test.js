const Month = require('../js/month');

describe("Month initialize test", () => {
  const y = 2020;
  const m = 3;
  const d = new Date(y, m+1, 0).getDate();
  const month = new Month(y, m, []);

  test("Month year", () => {
    expect(month.year).toBe(y);
  });

  test("Month m", () => {
    expect(month.month).toBe(m);
  });

  test("Month d", () => {
    expect(month.totalDates).toBe(d);
  });
});