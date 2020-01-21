class SideDrawer {
    constructor (todos, m, d) {
        this.todos = todos;
        this.month = m;
        this.date = d;
        this.dom = null;
    }

    _paintDOM () {
        const todoDiv = document.getElementById('todo');
        const todoItemDiv = document.getElementById('todo-item');
        const todoDivClone = document.importNode(todoDiv.content, true);
        const todoDivBox = todoDivClone.querySelector('.todo');
        const todoContent = todoDivClone.querySelector('.todo-content');
        const todoMonth = todoDivClone.querySelector('.todo-month');
        const todoDate = todoDivClone.querySelector('.todo-date');
        const todoItems = document.querySelectorAll('.todo-item');

        if (todoItems.length >= 1) {
            todoItems.forEach(elem => {
                elem.parentNode.removeChild(elem);
            });
        };

        todoMonth.innerHTML = `${this.month + 1}월 `;
        todoDate.innerHTML = `${this.date} 일 `;

        this.todos && this.todos.forEach(todo => {
            const todoItemDivClone = document.importNode(todoItemDiv.content, true);
            const todoItem = todoItemDivClone.querySelector('.todo-item');
            todoItem.innerText = `${todo.title} : ${todo.desc}`;
            todoContent.appendChild(todoItem);   
        });
        // todoDiv.append(todoContent);
        console.log("TODOS?", this.todos)

        this.dom = todoDivBox;
    }
}