class Month {
  constructor(y, m, todos){
    this.year = y;
    this.month = m;
    this.todos = todos;
    this.totalDate = null;
    this.firstDate = null;
    this.weeks = null;
    (() => {
      const monthFirst = new Date(y, m, 1);
      const monthLast = new Date(y, m+1, 0);
      this.totalDate = monthLast.getDate();
      this.firstDate = monthFirst.getDate();
    })();
  }
}

// module.exports = Month;