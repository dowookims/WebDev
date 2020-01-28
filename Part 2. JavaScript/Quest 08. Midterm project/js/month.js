class Month {
    constructor(y, m, today, todos){
        this.year = y;
        this.month = m;
        this.today = today;
        this.lastMonthDate = null;
        this.totalDate = null;
        this.firstDay = null;
        this.weeks = null;
        this.dates = null;
        this.dom = null;
        this.todos = todos;
        this._calculateMonthDates();
    };

    _calculateMonthDates () {
        const y = this.year;
        const m = this.month;
        const lastMonth = new Date(y, m, 0);
        const monthFirst = new Date(y, m, 1);
        const monthLast = new Date(y, m+1, 0);
        const firstDay = monthFirst.getDay();
        const lastDay = monthLast.getDay();

        this.lastMonthDate = lastMonth.getDate();
        this.totalDate = monthLast.getDate();
        this.firstDay = firstDay;
        this.weeks = ((this.totalDate + firstDay + 6 - lastDay) / 7);

        if ( this.dates ) return;

        this.dates = {};
        for (let i = 1; i <= this.totalDate; i++) {
            this.dates[i] = new Day(y, m, i, this.todos[i]);
        };
    };

    paintDOM () {
        const weekElems = document.querySelectorAll('.week');
        
        weekElems.length && weekElems.forEach(weekElem => {
            weekElem.parentNode.removeChild(weekElem);
        });

        const numberContent = document.querySelector('.number-calendar');
        const yearSpan = document.querySelector('.year');
        const monthSpan = document.querySelector('.month');
        const calendarNumberDiv = document.querySelector('.calendar-number-div');
        const weekDiv = document.getElementById('week');
        const todoList = new TodoList();

        yearSpan.innerText = this.year;
        monthSpan.innerText = this.month + 1;

        for (let i=0; i < this.weeks; i++) {
            const weekClone = document.importNode(weekDiv.content, true);
            const weekDOM = weekClone.querySelector('.week');

            for (let j=1; j < 8; j++) {
                const idx = i * 7 +  j;
                let year = this.year;
                let month = this.month;
                let date = null;
                let dayInstance = null;
                
                // 이전달 / 다음달 / 이번달
                if (this.firstDay >= idx) {
                    date = this.lastMonthDate - this.firstDay + idx;
                    month--;
                    if (month === -1) {
                        year--;
                        month = 11;
                    };
                } else if ( idx - this.firstDay > this.totalDate ) {
                    date = idx - this.firstDay - this.totalDate;
                    month++;
                    if (month === 12) {
                        year++;
                        month = 0;
                    };
                } else {
                    date = idx - this.firstDay;
                    if (this.dates[date]) {
                        dayInstance = this.dates[date];
                    } else {
                        dayInstance = new Day(year, month, date, []);
                    };
                    
                    dayInstance.prepareDOM();

                    if (j === 7) {
                        dayInstance.dom.lastChild.classList.add('sat');
                    } else if (j === 1) {
                        dayInstance.dom.lastChild.classList.add('sun');
                    }
                }
                // 일자 게산 끝
                
                if (!dayInstance) {
                    if (todoList.hasYear()
                        && todoList.isMonth(year, month)
                    ) {
                        dayInstance = todoList.data[year][month].dates[date];
                    } else {
                        dayInstance = new Day(year, month, date, [])
                    }
                    dayInstance.prepareDOM();
                    dayInstance.dom.classList.add('notThisMonth');
                };
                
                if (this.today.getFullYear() === dayInstance.year
                    && this.today.getMonth() === dayInstance.month 
                    && this.today.getDate() === dayInstance.date) {
                        dayInstance.dom.lastChild.classList.add("today");
                };

                if (!todoList.hasYear(year)) todoList.insertYear(year);
                
                if (!todoList.isMonth(year, month)) todoList.insertMonth(year, month, this.today);
                
                todoList.data[year][month].dates[date] = dayInstance;

                weekDOM.appendChild(dayInstance.dom);
            };
                numberContent.appendChild(weekDOM);
        };
        
        this.dom = numberContent;
        calendarNumberDiv.appendChild(numberContent);
    };
};
