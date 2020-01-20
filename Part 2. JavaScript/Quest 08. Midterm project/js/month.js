class Month {
  constructor(y, m, todos){
    this.year = y;
    this.month = m;
    this.todos = todos;
    this.lastMonthDate = null;
    this.totalDate = null;
    this.firstDay = null;
    this.weeks = null;
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
    const App = document.getElementById('app');
    const modal = document.getElementById('modal');
    const ModalClone = document.importNode(modal.content, true);
    const numberContent = document.querySelector('.number-calendar');
    const yearSpan = document.querySelector('.year');
    const monthSpan = document.querySelector('.month');
    const calendarNumberDiv = document.querySelector('.calendar-number-div');
    const ModalDiv = ModalClone.querySelector('.modal');
    const today = new Date();

    yearSpan.innerText = this.year;
    monthSpan.innerText = this.month + 1;

    const weekDiv = document.getElementById('week');
    const dateDiv = document.getElementById("date");
    /* 
      Week 이랑 Day로 컨텐츠를 줄여서 만들어 리팩토링 해도 괜찮지 않을까?
    */
      // 주별
      for (let i=0; i < this.weeks; i++) {
          const weekClone = document.importNode(weekDiv.content, true);
          const weekDOM = weekClone.querySelector('.week');

        // 일별
        for (let j=1; j < 8; j++) {
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
          const dateSpan = dateClone.querySelector('.date-span');
          
          dateSpan.innerText = date;
          if (today.getFullYear() === this.year && today.getMonth() === this.month && today.getDate() === date) {
            dateSpan.classList.add("today");
          }

          dateSpan.addEventListener('click', () => { console.log("KKK"); ModalDiv.style.visibility = 'visible'})
          const ModalSubmitBtn = ModalClone.querySelector('.submit-btn');
          ModalSubmitBtn.addEventListener('click', Modal.submitTodo)

          dateDOM.appendChild(dateSpan);
          weekDOM.appendChild(dateDOM);
        };

        numberContent.appendChild(weekDOM);
      };
      calendarNumberDiv.appendChild(numberContent);
      App.appendChild(ModalDiv)
  }
}
