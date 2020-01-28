class Calendar {
  constructor(data, todoList = []){
    if (!data instanceof(Date)) {
      data = new Date(data);
    }

    if (data.toString === "Invalid Date") {
      throw Error("Invalid Date Object data");
    }

    const date = data;
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