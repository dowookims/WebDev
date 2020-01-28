class Todo {
    constructor(id, title, desc) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.dom = null;
        this._prepareDOM();
    }

    _prepareDOM () {
        const todoItemDiv = document.getElementById('todo-item');
        const todoItemDivClone = document.importNode(todoItemDiv.content, true);
        const todoItem = todoItemDivClone.querySelector('.todo-item');
        todoItem.innerText = `${this.title} : ${this.desc}`;
        this.dom = todoItem;
    }
}