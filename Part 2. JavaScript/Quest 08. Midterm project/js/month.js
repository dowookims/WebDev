class Month {
  constructor(y, m, today, todos){
    this.year = y;
    this.month = m;
    this.todos = todos;
    this.today = today;
    this.lastMonthDate = null;
    this.totalDate = null;
    this.firstDay = null;
    this.weeks = null;
    this.dates = [];
    this.dom = null;

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

  _prepareDOM () {
    const weekElems = document.querySelectorAll('.week');
    
    weekElems.length && weekElems.forEach(weekElem => {
        weekElem.parentNode.removeChild(weekElem);
    });


    const numberContent = document.querySelector('.number-calendar');
    const yearSpan = document.querySelector('.year');
    const monthSpan = document.querySelector('.month');
    const calendarNumberDiv = document.querySelector('.calendar-number-div');
    const weekDiv = document.getElementById('week');

    yearSpan.innerText = this.year;
    monthSpan.innerText = this.month + 1;
        // 주별
    for (let i=0; i < this.weeks; i++) {
        const weekClone = document.importNode(weekDiv.content, true);
        const weekDOM = weekClone.querySelector('.week');
  
          // 일별
        for (let j=1; j < 8; j++) {
            const idx = i * 7 +  j;
            let year = this.year;
            let month = this.month;
            let date;
            // 아마 여기서 문제가 발생한듯 함.
            if (this.firstDay >= idx) {
              date = this.lastMonthDate - this.firstDay + idx;
              month--;
              if (month === -1) { year--; month = 11;};
            } else if ( idx - this.firstDay > this.totalDate ) {
              date = idx - this.firstDay - this.totalDate;
              month++;
              if (month === 12) { year++; month = 0;};
            } else {
              date = idx - this.firstDay;
            }

            let dayInstance = null;
            if (month === this.month 
                && date >= 1 
                && date <= this.totalDate) {
                this.dates.push(new Day(year, month, date, this.todos[date]));
                dayInstance = this.dates[date - 1];
            } else {
              dayInstance = new Day(year, month, date, [])
            };
            
            if (this.today.getFullYear() === dayInstance.year
                && this.today.getMonth() === dayInstance.month 
                && this.today.getDate() === dayInstance.date) {
                    dayInstance.dom.lastChild.classList.add("today");
            }

            weekDOM.appendChild(dayInstance.dom);
        };
            numberContent.appendChild(weekDOM);
        };
        this.dom = numberContent;
        calendarNumberDiv.appendChild(numberContent);
    }
}
