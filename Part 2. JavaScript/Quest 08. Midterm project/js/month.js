class Month {
  constructor(y, m, todos){
    this.year = y;
    this.month = m;
    this.todos = todos;
    this.totalDates = (() => {
      const thisMonth = new Date(y, m+1, 0)
      return thisMonth.getDate();
    })()
  }
}

module.exports = Month;