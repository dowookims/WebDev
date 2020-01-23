class TodoList {
    constructor (todoList, y, m, t) {
        if (!!TodoList.instance) return TodoList.instance;
        TodoList.instance = this;
        this.data = todoList;
        this.side = new SideDrawer(m, t.getDate());
        this._prepareDOM(y, m, t);
        console.log("TODOLIST constructure", this);
    }

    _prepareDOM (y, m, t) {
        this.side.paintDOM(this.data[y][m][t.getDate()]);
    }

    insertYear (y) {
        const year = parseInt(y);
        this.data[year] = [];
        for (let i=0; i<12; i++) {
          this.data[year][i] = {}
        };
    }
}