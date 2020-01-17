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
      const yearSpan = document.querySelector('.year');
      const monthSpan = document.querySelector('.month');
      const numberContent = document.querySelector('.number-calendar');
      const weekDiv = document.getElementById('week');
      const dateDiv =document.getElementById("date");

      yearSpan.innerText = this.year;
      monthSpan.innerText = this.month + 1;

      for (let i=0; i < this.weeks; i++) {
          const weekClone = document.importNode(weekDiv.content, true);
          const weekDOM = weekClone.querySelector('.week');
        
          console.log(i)
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
          
          const dateClone = document.importNode(dateDiv.content, true);
          const dateDOM = dateClone.querySelector('.date');
          dateDOM.innerText = date;
          weekDOM.appendChild(dateDOM);
        };

        numberContent.appendChild(weekDOM);
      };
      this.monthDOM = numberContent;
    } else {
      numberContent
    }
  }
}
