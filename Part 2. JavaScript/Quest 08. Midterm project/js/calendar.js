class Calendar {
  constructor(date, todoList = []){
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.todoList = todoList;
    this.today = date;
  };

  addMonth(n){};

  drawCalendar(){};
}

module.exports = Calendar;