const Calendar = require('../js/calendar');

describe("Calendar Initialize test", () => {
  const calendar = new Calendar(new Date());
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();

  test("isToday", () => {
    expect(y).toBe(calendar.today.getFullYear());
    expect(m).toBe(calendar.today.getMonth());
    expect(d).toBe(calendar.today.getDate());
  });

  test("same month", () => {
    expect(m).toBe(calendar.month);
  });

  test("same year", () => {
    expect(y).toBe(calendar.year);
  });

  test("Invalid data", () => {
    expect(() => {
      new Calendar("kaka");
    }).toThrow();
  });
});

describe("Add month test", () => {
  test("December Add Test", () => {
    const today = new Date("2020-12-31");
    const calendar = new Calendar(today);
    calendar.addMonth(1);
    expect(calendar.month).toBe(0);
    expect(calendar.year).toBe(today.getFullYear() + 1);
  });

  test("January Before month test", () => {
    const today = new Date("2020-1-1");
    const calendar = new Calendar(today);
    calendar.addMonth(-1);
    expect(calendar.month).toBe(11);
    expect(calendar.year).toBe(today.getFullYear() - 1);
  });

  test("Normal Month test", () => {
    const today = new Date("2020-11-24");
    const calendar = new Calendar(today);
    calendar.addMonth(1);
    expect(calendar.month).toBe(today.getMonth() + 1);
    expect(calendar.year).toBe(today.getFullYear());
  });

  test("Normal Month test2", () => {
    const today = new Date("2020-11-24");
    const calendar = new Calendar(today);
    calendar.addMonth(-1);
    expect(calendar.month).toBe(today.getMonth() - 1);
    expect(calendar.year).toBe(today.getFullYear());
  });
})
