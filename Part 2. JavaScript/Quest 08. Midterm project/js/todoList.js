class TodoList {
    constructor (todoList, y, m, t) {
        this.data = todoList;
        this.dom = null;
        this.year = y;
        this.month = m;
        this.today = t;
        this.side = new SideDrawer(
            this.data[y][m][t.getDate()]
            , m
            , t.getDate()
        );
        this._prepareDOM();
        
    }

    _prepareDOM () {
        this.data[this.year][this.month] = new Month(this.year, this.month, this.today, this.data[this.year][this.month]);
        console.log("TODO LIST", this)
        this.side._paintDOM();
    }
}