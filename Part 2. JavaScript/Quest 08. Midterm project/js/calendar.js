// 코드를 컴포넌트 단위로 쪼개볼 것

class Calendar {
  constructor(data, todoList = 
    {
      2020: [
        {
          20: [
            {id: 1, date: "2020-01-20", title: '첫글이야', desc: '안녕녕녕'},
            {id: 2, date: "2020-01-20", title: '하하ㅋㅋ', desc: '반가워ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'}
          ]
        },{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},
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
    this.todoList[this.year][this.month] = new Month(this.year, this.month, this.todoList[this.year][this.month]);
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
      if (!this.todoList[this.year]){
        this.todoList[this.year] = [
          {0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},{0:{},},
        ]
      }

      let month = null;
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

    }
  };

  drawCalendar(){
    const app = document.getElementById('app');
    const calendar = document.getElementById('calendar');
    const todoDiv = document.getElementById('todo');
    const todoItemDiv = document.getElementById('todo-item');

    const calendarClone = document.importNode(calendar.content, true);
    const todoDivClone = document.importNode(todoDiv.content, true);
    
    
    const todoDivBox = todoDivClone.querySelector('.todo');
    const todoContent = todoDivClone.querySelector('.todo-content');
    const todoMonth = todoDivClone.querySelector('.todo-month');
    const todoDate = todoDivClone.querySelector('.todo-date');

    todoMonth.innerText = `${this.month + 1}월 `;
    todoDate.innerText = this.today.getDate() + '일 ';
    
    this.todoList[this.year][this.month]["todos"][this.today.getDate()].forEach( todo => {
        const todoItemDivClone = document.importNode(todoItemDiv.content, true);
        const todoItem = todoItemDivClone.querySelector('.todo-item');
        
        todoItem.innerText = `${todo.title} : ${todo.desc}`;
        todoContent.appendChild(todoItem);
      }
    );

    todoDivBox.append(todoContent);
    app.appendChild(calendarClone);
    app.appendChild(todoDivBox);
    
    this.todoList[this.year][this.month].drawMonth();

    const lastMonthBtn = document.querySelector('.lastMonth');
    const nextMonthBtn = document.querySelector('.nextMonth');

    lastMonthBtn.addEventListener('click', this.addMonth(-1));
    nextMonthBtn.addEventListener('click', this.addMonth(1));
  };
}