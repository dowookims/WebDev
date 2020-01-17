class Calendar {
  constructor(data, todoList = 
    {
      2020: [
        {0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},
      ]
    }
  ) {
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
    this.todoList[this.year][this.month] = new Month(this.year, this.month, [])
  };

  addMonth(n){
    const numberCalendar = document.querySelector('.number-calendar');
    return () => {
      if (this.month === 11 && n === 1) {
        this.year++;
        if (!this.todoList[this.year]){
          this.todoList[this.year] = [
            {0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},
          ]
        }
        this.month = 0;
      } else if (this.month === 0 && n === -1) {
        this.year--;
        this.month = 11;
      } else {
        this.month += n;
      }

      let month;
      this.todoList[this.year][this.month] instanceof Month
      ? month = this.todoList[this.year][this.month]
      : month = new Month(this.year, this.month, [])
      if (!(this.todoList[this.year][this.month] instanceof Month)) {
        this.todoList[this.year][this.month] = month;
      }
      const weekElems = document.querySelectorAll('.week');
      weekElems.forEach(weekElem => {
        weekElem.parentNode.removeChild(weekElem);
      })
      month.drawMonth();
      console.log(this)
    }
  };

  drawCalendar(){
    const app = document.getElementById('app');
    const calendar = document.getElementById('calendar');
    const calendarClone = document.importNode(calendar.content, true);

    app.appendChild(calendarClone);
    
    this.todoList[this.year][this.month].drawMonth();

    const lastMonthBtn = document.querySelector('.lastMonth');
    const nextMonthBtn = document.querySelector('.nextMonth');

    lastMonthBtn.addEventListener('click', this.addMonth(-1));
    nextMonthBtn.addEventListener('click', this.addMonth(1))
  };
}