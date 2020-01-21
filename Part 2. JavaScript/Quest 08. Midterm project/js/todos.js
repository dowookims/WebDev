class Todos {
  constructor(date, title, desc) {
    this.date = date;
    this.title = title;
    this.desc = desc;
  }

  drawTodo(todoContent, todoItemDiv) {
    const todoItemDivClone = document.importNode(todoItemDiv.content, true);
    const todoItem = todoItemDivClone.querySelector('.todo-item');
        
    todoItem.innerText = `${this.title} : ${this.desc}`;
    todoContent.appendChild(todoItem);
  }
}