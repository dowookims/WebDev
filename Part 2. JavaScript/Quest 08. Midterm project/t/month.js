class Month {
  constructor(y, m, todos){
    this.year = y;
    this.month = m;
    this.todos = todos;
    this.lastMonthDate = null;
    this.totalDate = null;
    this.firstDay = null;
    this.weeks = null;

    (() => {
      const lastMonth = new Date(y, m, 0);
      const monthFirst = new Date(y, m, 1);
      const monthLast = new Date(y, m+1, 0);
      const firstDay = monthFirst.getDay();
      const lastDay = monthLast.getDay();

      this.lastMonthDate = lastMonth.getDate();
      this.totalDate = monthLast.getDate();
      this.firstDay = firstDay;
      this.weeks = ((this.totalDate + firstDay + 6 - lastDay) / 7);
    })();
  }

  drawMonth() {
    for (let i=1; i<=this.weeks * 7; i++) {
      if (this.firstDay >= i){
        console.log("asd", this.lastMonthDate - this.firstDay + i);
      } else if(i - this.firstDay > this.totalDate){
        console.log(i - this.firstDay - this.totalDate);
      } else {
        console.log(i - this.firstDay);
      }
    }
  }
}

module.exports = Month;