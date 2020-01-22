class TodoList {
    constructor (todoList, y, m, t) {
        if (!!TodoList.instance) return TodoList.instance;
        TodoList.instance = this;
        this.data = todoList;
        this.year = y;
        this.month = m;
        this.today = t;
        this.side = new SideDrawer(m, t.getDate());
        this._prepareDOM();
        
    }

    _prepareDOM () {
        this.data[this.year][this.month] = new Month(this.year, this.month, this.today, this.data[this.year][this.month]);
        this.side._paintDOM(this.data[this.year][this.month].todos[this.today.getDate()]);
    }
}