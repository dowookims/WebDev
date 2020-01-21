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

    weekElems.forEach(weekElem => {
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
            let date;
            if (this.firstDay >= idx) {
              date = this.lastMonthDate - this.firstDay + idx;
              
            } else if ( idx - this.firstDay > this.totalDate ) {
              date = idx - this.firstDay - this.totalDate;
            } else {
              date = idx - this.firstDay;
            }

            this.dates.push(new Day(this.year, this.month, date, []) );

            const dayInstance = this.dates[idx-1];
            
            if (this.today.getFullYear() === dayInstance.year
                && this.today.getMonth() === dayInstance.month 
                && this.today.getDate() === dayInstance.date) {
                    dayInstance.dom.lastChild.classList.add("today");
            }

            weekDOM.appendChild(this.dates[idx-1].dom);
        };

            numberContent.appendChild(weekDOM);
        };

        this.dom = numberContent;
        calendarNumberDiv.appendChild(numberContent);
    }
}
