class Day {
    constructor(y, m, d, todos){
        this.year = y;
        this.month = m;
        this.date = d;
        this.todos = [];
        this.dom = null;
        this.side = new Side(m, d);
        this._prepareTodo(todos, d);
    };
    
    _prepareTodo (todos) {
        todos && todos.forEach(todo => {
            this.todos.push(new Todo(todo.id, todo.title, todo.desc))
        });
    }

    prepareDOM () {
        const dateDiv = document.getElementById("date");
        const dateClone = document.importNode(dateDiv.content, true);
        const dateDOM = dateClone.querySelector('.date');
        const dateSpan = dateClone.querySelector('.date-span');
        dateSpan.innerText = this.date;
        dateSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            // dateDOM.fire('openModal', ...);
            Modal.openModal(this.year, this.month, this.date, this);
        });
        dateDOM.appendChild(dateSpan);
        this.dom = dateDOM;
        this.dom.addEventListener('click', () => {
            this.side.paintDOM(this.todos);
        });
    };

    addTodo(id, title, desc) {
        this.todos.push(new Todo(id, title, desc));
        alert(`${this.year}년 ${this.month+1}월 ${this.date}에 ${title} : ${desc} 일정이 추가 되었습니다.`);
        this.side.paintDOM(this.todos);
    }

    removeTodo(id){};
    
    updateTodo(id){};
};
