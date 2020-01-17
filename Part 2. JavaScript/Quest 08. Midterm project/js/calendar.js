class Calendar {
  constructor(date, todoList = []){
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.todoList = todoList;
    this.today = date;
  };

  addMonth(n){
    if (this.month === 11 && n === 1) {
      this.year++;
      this.month = 0;
    } else if (this.month === 0 && n === -1) {
      this.year--;
      this.month = 11;
    } else {
      this.month += n;
    }
  };

  // drawCalendar(){};
}

module.exports = Calendar;