class Month {
  constructor(y, m, todos){
    this.year = y;
    this.month = m;
    this.todos = todos;
    this.lastMonthDate = null;
    this.totalDate = null;
    this.firstDay = null;
    this.weeks = null;
    this.monthDOM = null;
    this.dates = [];

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
    if (!this.monthDOM){
      const calendarContent = document.querySelector('calendar-content');
      console.log(calendarContent)

      for (let i=0; i < this.weeks; i++) {

        const weekDiv = document.getElementById('week');
        const weekClone = document.importNode(weekDiv, true);

        for (let j=0; j < 7; j++) {
          const idx = i * 7 +  j;
          let date;
          if (this.firstDay >= idx){
            date = this.lastMonthDate - this.firstDay + idx;
            
          } else if(idx - this.firstDay > this.totalDate){
            date = idx - this.firstDay - this.totalDate;
          } else {
            date = idx - this.firstDay;
          }
          this.dates.push(new Day(new Date(this.year, this.month -1, date), []) );
          const dateDiv =document.getElementById("date");
          const dateClone = document.importNode(dateDiv, true);
          dateClone.innerText = 'date';
          weekClone.appendChild(dateClone);
        };

        calendarContent.appendChild(weekClone);
      };
    }
  }
}
