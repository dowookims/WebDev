# Quest 08. Midterm project


## Introduction
* 이번 퀘스트를 통해 자유롭게 웹 브라우저 기반의 어플리케이션을 만들어 보세요!

## Checklist
* 더 좋은 코드를 만들려면 어떻게 해야 할까요?
  * 혹시 HTML 코드 안에 디자인 요소나 동작에 관련된 요소가 들어가지는 않았나요?
  * 혹시 불필요한 CSS 규칙들이 코딩되지는 않았나요?
* 더 좋은 JavaScript 코드를 만들려면 어떻게 해야 할까요?
  * 혹시 전역변수를 사용하고 있지는 않나요?
  * JavaScript 코드 안에 상수 문자열이나 상수 숫자가 어떤 식으로 관리되고 있나요?
  * 각각의 클래스는 (필요한 경우) HTML 모양에 관계 없이 독립적으로 DOM을 관리하고 있나요?

## Quest

* 지금까지 배운 것을 바탕으로 자유롭게 웹 브라우저 기반의 어플리케이션을 만들어 보세요!
  * 등장하는 JavaScript 클래스가 5개 내외가 되는 정도의 규모면 적당합니다.
* 한 번 완성된 프로그램을 제출하여 피드백을 받은 뒤, Checklist의 사항들을 생각해 보고 좀 더 좋은 코드로 리팩토링해 보세요!

## 설계

### Intro

Javascript OOP를 연습하기 위한 웹 어플리케이션을 제작합니다.

이번에 만들어 볼 웹 어플리케이션은 달력 Todo App 입니다. 달력 알고리즘을 직접 구현해 보고, 사용자가 선택한 해당 일에 Todo를 직접 넣어보는 것을 진행 할 예정입니다.

### class 설계

```js
class Calendar {
  constructor(date, todoList = []){
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.todoList = todoList;
    this.today = date;
  };

  addMonth(n){};

  drawCalendar(){};
}

class Month {
  constructor(m, todos){
    this.month = m;
    this.todos = todos;
    this.dateCount = null;
  };

  drawMonth() {};
};

class Date {
  constructor(todo, date) {
    this.todo = todo;
    this.date = date;
  };

  addTodo() {};

  updateTodo() {};

  deleteTodo() {};
}

class Todo {
  constructor(date, title, desc) {
    this.date = date;
    this.title = title;
    this.desc = desc;
  }
}
```