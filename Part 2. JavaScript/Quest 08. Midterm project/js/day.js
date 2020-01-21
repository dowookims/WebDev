class Day {
    constructor(y, m, d, todo){
        this.year = y;
        this.month = m;
        this.date = d;
        this.todo = todo;
        this.dom = null;
        this.side = new SideDrawer(todo, m, d)
        this._prepareDOM();
    };

  _prepareDOM () {
      const dateDiv = document.getElementById("date");
      const dateClone = document.importNode(dateDiv.content, true);
      const dateDOM = dateClone.querySelector('.date');
      const dateSpan = dateClone.querySelector('.date-span');

      dateSpan.innerText = this.date;

      dateDOM.addEventListener('click', this.addTodo);
      dateSpan.addEventListener('click', (e) => {
          e.stopPropagation();
      }
      )
      dateDOM.appendChild(dateSpan);
      this.dom = dateDOM;
  }

  addTodo(){
    this.side._paintDOM();
    // this.todo.push({
    //   id, date, title, desc
    // });
  };

  removeTodo(id){};
  
  updateTodo(id){};
};
