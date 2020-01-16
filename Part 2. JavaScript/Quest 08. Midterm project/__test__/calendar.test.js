const Calendar = require('../js/calendar');

const calendar = new Calendar(new Date());

const today = new Date();

describe("Calendar Initialize test", () => {
  const y = today.getFullYear();
  const m = today.getMonth();

  test("isToday", () => {
    expect(today).toEqual(calendar.today)
  });

  test("same month", () => {
    expect(m).toBe(calendar.month);
  });

  test("same year", () => {
    expect(y).toBe(calendar.year);
  })

})