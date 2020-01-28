class TodoList {
    constructor (todoList, y, m, t) {
        if (!!TodoList.instance) return TodoList.instance;
        TodoList.instance = this;
        this.data = todoList;
        this.side = new SideDrawer(m, t.getDate());
        this.today = t;
        this._prepareInitialData(y, m, t);
        this._prepareDOM(y, m, t);
    }

    _prepareDOM (y, m, t) {
        this.side.paintDOM(this.data[y][m][t.getDate()]);
    }

    _prepareInitialData (y, m, t) {
        console.log(this.data);
        this.data[y][m] = new Month(y, m, t, this.data[y][m]);
        for (let date in this.data[y][m]) {
            this.data[y][m].dates[date] = this.data[y][m][date]
        }
    }

    insertYear (y) {
        const year = parseInt(y);
        this.data[year] = [];
        for (let i=0; i<12; i++) {
            this.data[year][i] = {};
        };
    };

    insertMonth (y, m, t) {
        if (this.data[y][m] instanceof Month) return;
        const month = new Month(y, m, t, this.data[y][m]);
        this.data[y][m] = month;
    }
}