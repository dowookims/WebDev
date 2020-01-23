class Day {
    constructor(y, m, d, todos){
        this.year = y;
        this.month = m;
        this.date = d;
        this.todos = [];
        this.dom = null;
        this.side = new SideDrawer(m, d);
        this._prepareTodo(todos);
    };

    prepareDOM () {
        const dateDiv = document.getElementById("date");
        const dateClone = document.importNode(dateDiv.content, true);
        const dateDOM = dateClone.querySelector('.date');
        const dateSpan = dateClone.querySelector('.date-span');
        dateSpan.innerText = this.date;
        dateSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            Modal.openModal(this.year, this.month, this.date, this);
        });
        dateDOM.appendChild(dateSpan);
        this.dom = dateDOM;
        this.dom.addEventListener('click', () => {
            this.side.paintDOM(this.todos);
        });
    };

    _prepareTodo (todos) {
        todos && todos.forEach(todo => {
            this.todos.push(new Todo(todo.id, todo.title, todo.desc))
        });
    }

    addTodo(title, desc) {
        if (!this.todos) this.todos = [];
        this.todo.push({
          id: 1,
          title,
          desc,
        });
        this.side.paintDOM(this.todos);
    }

  removeTodo(id){};
  
  updateTodo(id){};
};
