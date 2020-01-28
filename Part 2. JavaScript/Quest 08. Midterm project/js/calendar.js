
class Calendar {
    constructor(data, todoList = {}) {
        if (!data instanceof(Date)) {
            data = new Date(data);
        }

        if (data.toString === "Invalid Date") {
            throw Error("Invalid Date Object data");
        }

        const date = data;
        const year = date.getFullYear(); 
        this.year = year
        this.month = date.getMonth();
        this.today = date;

        if (this._isEmptyTodoList(todoList)) {
            todoList[year] = [];
            for (let i = 0; i < 12; i++ ) {
                todoList[year].push({0: []});
            };
        };

        this.todoList = new TodoList(todoList, this.year, this.month, this.today);
        this._prepareDOM();
  };

  _isEmptyTodoList (todoList) {
      for (let todo in todoList) {
          return false;
      };
      return true
  };

  _prepareDOM () {
      const app = document.getElementById('app');
      const calendar = document.getElementById('calendar');
      const calendarClone = document.importNode(calendar.content, true);
      const modal = new Modal();

      app.appendChild(calendarClone);
      app.appendChild(this.todoList.side.dom);
      app.appendChild(modal.dom);
      this.todoList.data[this.year][this.month].paintDOM();

      const lastMonthBtn = document.querySelector('.lastMonth');
      const nextMonthBtn = document.querySelector('.nextMonth');
      const addMonth = (n) => {
        return () => {
            this.month += n;
            if (this.month === 12) {
                this.year++;
                this.month = 0;
            } else if (this.month === -1) {
                this.year--;
                this.month = 11;
            } 
  
            if (!this.todoList.data[this.year]) this.todoList.insertYear(this.year);
            
            if (!this.todoList.isMonth(this.year, this.month)) this.todoList.insertMonth(this.year, this.month, this.today);

            this.todoList.data[this.year][this.month].paintDOM();
        };
    };
  
      lastMonthBtn.addEventListener('click', addMonth(-1));
      nextMonthBtn.addEventListener('click', addMonth(1));
  };
};