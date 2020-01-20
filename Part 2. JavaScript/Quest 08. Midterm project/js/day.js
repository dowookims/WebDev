class Day {
  constructor(date, todo){
    this.date = date;
    this.todo = todo;
  };

  addTodo(id, date, title, desc){
    this.todo.push({
      id, date, title, desc
    });
  };

  removeTodo(id){};
  
  updateTodo(id){};
};
