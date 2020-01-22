// 코드를 컴포넌트 단위로 쪼개볼 것

class Calendar {
  constructor(data, todoList) {
    if (!data instanceof(Date)) {
      data = new Date(data);
    }

    if (data.toString === "Invalid Date") {
      throw Error("Invalid Date Object data");
    }

    const date = data;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.today = date;
    this.todoList = new TodoList(todoList, this.year, this.month, this.today);
    this._prepareDOM();
  };

  _prepareDOM (){
    const app = document.getElementById('app');
    const calendar = document.getElementById('calendar');
    const calendarClone = document.importNode(calendar.content, true);
    const modal = new Modal();

    app.appendChild(calendarClone);
    app.appendChild(this.todoList.side.dom);
    app.appendChild(modal.dom);
    
    this.todoList.data[this.year][this.month]._prepareDOM();
    const lastMonthBtn = document.querySelector('.lastMonth');
    const nextMonthBtn = document.querySelector('.nextMonth');

    lastMonthBtn.addEventListener('click', this.addMonth(-1));
    nextMonthBtn.addEventListener('click', this.addMonth(1));
  };

  addMonth(n){
    return () => {
      if (this.month === 11 && n === 1) {
        this.year++;
        this.month = 0;
      } else if (this.month === 0 && n === -1) {
        this.year--;
        this.month = 11;
      } else {
        this.month += n;
      }

      if (!this.todoList.data[this.year]){
        for (let i=0; i<12; i++) {
          this.todoList.data[this.year].push({0: {}});
        };
      };
    
      let month = null;
      this.todoList.data[this.year][this.month] instanceof Month
      ? month = this.todoList.data[this.year][this.month]
      : month = new Month(this.year, this.month, this.today, []);
      this.todoList.data[this.year][this.month] = month;
      month._prepareDOM();
    };
  };
};