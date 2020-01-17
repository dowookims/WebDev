class Calendar {
  constructor(data, todoList = []){
    if (!data instanceof(Date)) {
      data = new Date(data);
    }

    if (data.toString === "Invalid Date") {
      throw Error("Invalid Date Object data");
    }

    const date = data;
    console.log(date);
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

  drawCalendar(){
    const app = document.getElementById('app');
    const calendar = document.getElementById('calendar');
    const calendarClone = document.importNode(calendar.content, true);
    app.appendChild(calendarClone);
    
    const month = new Month(this.year, this.month, [])
    month.drawMonth();
  };
}