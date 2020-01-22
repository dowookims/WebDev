class SideDrawer {
    constructor (m, d) {
        this.month = m;
        this.date = d;
        this.dom = null;
    }

    _paintDOM (todos) {
        const todoDiv = document.getElementById('todo');
        const todoItemDiv = document.getElementById('todo-item');
        const todoDivClone = document.importNode(todoDiv.content, true);
        const todoDivBox = todoDivClone.querySelector('.todo');
        const todoMonth = todoDivClone.querySelector('.todo-month');
        const todoDate = todoDivClone.querySelector('.todo-date');
        const todoItems = document.querySelectorAll('.todo-item');
        let todoContent = todoDivClone.querySelector('.todo-content');
        
        if (todoItems.length >= 1) {
            todoItems.forEach(elem => {
                elem.parentNode.removeChild(elem);
            });
        };

        const dTodoMonth = document.querySelector('.todo-month');
        const dTodoDate = document.querySelector('.todo-date');
        if (dTodoMonth) {
            dTodoMonth.innerHTML = `${this.month + 1}월 `;
            dTodoDate.innerHTML = `${this.date} 일 `;
        } else {
            todoMonth.innerHTML = `${this.month + 1}월 `;
            todoDate.innerHTML = `${this.date} 일 `;
        }
        todos && todos.forEach(todo => {
            if (this.dom) todoContent = document.querySelector('.todo-content');
            const todoItemDivClone = document.importNode(todoItemDiv.content, true);
            const todoItem = todoItemDivClone.querySelector('.todo-item');
            todoItem.innerText = `${todo.title} : ${todo.desc}`;
            todoContent.appendChild(todoItem);   
        });
        this.dom = todoDivBox;
    }
}