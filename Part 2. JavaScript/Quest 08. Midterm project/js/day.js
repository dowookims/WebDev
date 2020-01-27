class Day {
    constructor(y, m, d, todo){
        this.year = y;
        this.month = m;
        this.date = d;
        this.todo = [];
        this.dom = null;
        this.side = new SideDrawer(m, d);
        this._prepareDOM();
        this._prepareTodo(todo);
    };

    _prepareDOM () {
        const dateDiv = document.getElementById("date");
        const dateClone = document.importNode(dateDiv.content, true);
        const dateDOM = dateClone.querySelector('.date');
        const dateSpan = dateClone.querySelector('.date-span');
        dateSpan.innerText = this.date;
        dateSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            Modal.openModal(this.year, this.month, this.date, this);
        })
        dateDOM.appendChild(dateSpan);
        this.dom = dateDOM;
        this.dom.addEventListener('click', () => {
            this.side._paintDOM(this.todo);
        });
    };

    _prepareTodo (todos) {
        todos && todos.forEach(todo => {
            this.todo.push(new Todo(todo.id, todo.title, todo.desc))
        });
    }

    addTodo(title, desc) {
        if (!this.todo) this.todo = [];
        this.todo.push({
            id: 1,
            title,
            desc,
        });
        this.side._paintDOM(this.todo);
    }

    removeTodo(id){};
    
    updateTodo(id){};
};
