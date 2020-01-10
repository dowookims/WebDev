# Quest 6. JS OOP

## Topics

### 1. Class

클래스는 객체 지향 프로그래밍에서 객체를 정의 하는 키워드로써, `class` 키워드를 통해 객체에 대한 정의를 내리고, `new` 키워드를 통해 새로운 객체를 생성하여 사용하는 방법이다. 수 없이 인용되는 비유로써, 객체에 대한 설계도 라고 불리기도 한다.

#### 1) Prototype based OOP

자바스크립트는 es6 부터 Syntactic sugar인 `class`를 지원한다. 그러나 그 이전에는 `생성자 함수` , `Object() 생성자 함수` 또는 `객체 리터럴` 을 통해 객체를 정의 할 수 있다. 이미 생성된 인스턴스의 자료구조와 기능을 동적으로 변경 할 수 있다는 것은 자바스크립트 OOP 의 특징이다. 또한 메소드, 상속 등을
 구현하기 위해 `Prototype` 과 `closure`를 활용하여 객체를 정의 한다. 

### 2. Constructor

자바스크립트에서 객체를 생성하기 위해 생성자 함수를 사용하는 경우도 잦다. `class`키워드를 대신 해 생성자 함수를 사용하고, 생성자 함수에서 객체를 정의하고 `new` `keyword`를 통해 새로운 객체를 만든다.

`class` 키워드에서 `constructor`는 인스턴스를 생성하고 클래스 필드를 초기화 하기 위한 특수한 메소드이다.

자바스크립트 내에서 클래스 내에 `constructor`는 하나만 존재 할 수 있다. 인스턴스를 생성할 때 new 연산자와 함께 호출하는 것이 `constructor`이며 `constructor`의 parameter에 전달한 값은 클래스 필드에 할당된다.

#### 1) Member function

특정 객체와 연결된 함수로써, 객체 (클래스) 내부에 정의된 함수로써, 메서드라고 불린다.

#### 2) Member variable

특정 객체와 연결된 변수로써, 해당 변수에 모든 멤버 함수들이 접근 가능하다.

```js
class Person {
    constructor(name) {
        this._name = name;
    }

    sayHi() {
        console.log(`HI i am ${this._name}`)
    }
    static sayBye(){
        console.log('bye bye bye')
    }
}
```

#### 3) Inheritance

자바스크립트는 prototype을 통해 상속을 구현한다. 이는, prototype을 통해 객체가 다른 객체로 직접 상속 된다는 의미이다. 

자바스크립트의 상속 구현 방식은
* 클래스 기반 언어의 상속 방식을 흉내 내는 것 (의사 클래스 패턴 상속, Pseudo-classical Inheritance)
* Protytypal Inheritance(프로토 타입으로 상속을 구현)
* class 키워드 사용시 extends

으로 크게 구분된다.

##### 3-1 ) 의사 클래스 패턴 상속 (Pseudo-classical Inheritance)

자식 생성자 함수의 prototype 프로퍼티를 부모 생성자 함수의 인스턴스로 교체하여 상속을 구현하는 방법.

```js
var Parent = (function(){

    function Parent(name) {
        this.name = name
    }

    Parent.prototype.sayHi = function(){
        console.log('Hi' + this.name);
    };

    return Parent;
}())

var Child = (function(){
    function Child(name, age){
        this.name = name;
        this.age = age;
    }

    Child.prototype = new Parent();

    Child.prototype.sayHi = function(){
        console.log("안녕" + this.age +'살' + this.name);
    };

    Child.prototype.sayBye = function(){
        console.log("잘가" + this.age +'살'  + this.name);
    };

    return Child;
}());
```

###### 문제점

* prototype 참조 객체를 `new` 연산자를 통한 인스턴스로 참조
* 생성자 링크 파괴
  * Child의 constructor가 parent로 되어 있음 : 프로토 타입 객체를 인스턴스로 교체하는 과정에서 constructor의 연결이 깨지게 된다. 그래서 `child` 객체를 생성한건 `Child` 생성자 함수지만, `child.constructor`의 출력 결과는 `Parent`가 된다. 이는 child 객체의 프로토타입 객체인 `new Parent()` 객체는 `constructor`가 없기에, `Parent.constructor`를 참조했기 때문.
* 객체 리터럴 패턴으로 생성한 객체의 상속에는 적합하지 않음

##### 3 - 2) 프로토타입 패턴 상속(Prototyal Inheritance)

`Object.create` 함수를 사용하여 객체에서 다른 객체로 직접 상속을 구현하는 방식. 의사 클래스 패턴 상속보다 간단하며, new 연산자가 필요없고, 생성자 링크도 보관되며 객체리터럴에도 사용 가능하다.

```js
var Parent = (function(){
    function Parent(name) {
        this.name = name;
    }

    Parent.prototye.sayHi = function() {
        console.log('HI!' + this.name);
    };

    return Parent();
}());

var child = Object.create(Parent.prototype);
child.name = 'child;

child.sayHi();
console.log(child instanceof Parent)
```

```js
function Vehicle(name, speed) {
    this.name = name;
    this.speed = speed;
}

Vehicle.prototype.drive = function(){
    console.log(`${this.name} runs at ${this.speed}`)
};

function Sedan(name, speed, maxSpeed){
    Vehicle.apply(this, arguments)
    this.maxSpeed = maxSpeed;
};

Sedan.prototype = Object.create(Vehicle.prototype);
Sedan.prototype.constructor = Sedan;
Sedan.prototype.boost = function(){
    console.log(`${this.name} boosts its speed at ${this.maxSpeed}`);
};

var sonata = new Sedan("sonata", 100, 200);
sonata.drive();
sonata.boost();
```

##### 3 - 3) 정보 은닉 (encapsulation)과 모듈 패턴

```js
var Person = function(args){
    var name = arg ? arg : '';
    
    this.getName = function(){
        return name;
    }
    this.setName = function(args){
        name = args;
    };
}

var me = new Person("Kim");

var name = me.getName();

```

```js
var person = function(args) {
    var name = arg ? arg : '';
    return {
        getName: function() {
            return name;
        },
        setName: function(args) {
            name = args;
        }
    }
}
```

```js
var Person = function() {
  var name = null;

  var F = function(arg) { name = arg ? arg : ''; };

  F.prototype = {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    }
  };

  return F;
}();

```

```js
var Human = function(type) {
  this.type = type || 'human';
};
 
Human.isHuman = function(human) {
  return human instanceof Human;
}
 
Human.prototype.breathe = function() {
  alert('h-a-a-a-m');
};

var Zero = function(type, firstName, lastName) {
  Human.apply(this, arguments);
  this.firstName = firstName;
  this.lastName = lastName;
};

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; // 상속하는 부분
Zero.prototype.sayName = function() {
  alert(this.firstName + ' ' + this.lastName);
};
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero); // true
```

### 3 - 4 ) class 와 extends

```js
// 부모 클래스
class Circle {
  constructor(radius) {
    this.radius = radius; // 반지름
  }

  // 원의 지름
  getDiameter() {
    return 2 * this.radius;
  }

  // 원의 둘레
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }

  // 원의 넓이
  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

// 자식 클래스
class Cylinder extends Circle {
  constructor(radius, height) {
    super(radius);
    this.height = height;
  }

  // 원통의 넓이: 부모 클래스의 getArea 메소드를 오버라이딩하였다.
  getArea() {
    // (원통의 높이 * 원의 둘레) + (2 * 원의 넓이)
    return (this.height * super.getPerimeter()) + (2 * super.getArea());
  }

  // 원통의 부피
  getVolume() {
    return super.getArea() * this.height;
  }
}

// 반지름이 2, 높이가 10인 원통
const cylinder = new Cylinder(2, 10);

// 원의 지름
console.log(cylinder.getDiameter());  // 4
// 원의 둘레
console.log(cylinder.getPerimeter()); // 12.566370614359172
// 원통의 넓이
console.log(cylinder.getArea());      // 150.79644737231007
// 원통의 부피
console.log(cylinder.getVolume());    // 125.66370614359172

// cylinder는 Cylinder 클래스의 인스턴스이다.
console.log(cylinder instanceof Cylinder); // true
// cylinder는 Circle 클래스의 인스턴스이다.
console.log(cylinder instanceof Circle);   // true
```

super 키워드는 부모 클래스를 참조(Reference)할 때 또는 부모 클래스의 constructor를 호출할 때 사용한다

```js
...
constructor(name, value){
    super(name);
    this.value = value;
}

... {
    super.getPerimeter()
}
```

## CheckList

### 객체지향 프로그래밍은 무엇일까요?

#### 객체와 클래스는 어떤 역할을 할까요?

### Q 2) 자바스크립트의 클래스는 어떻게 정의할까요?

자바스크립트는 Prototype 기반으로 객체를 정의해서 사용한다. 프로토타입 기반 프로그래밍으로 class-free한 객체지향 프로그래밍을 구현할 수 있으며, prototype chain과 closure 등으로 상속, 캡슐화 등을 구현한다.

자바스크립트에서는 객체 생성을 위해 
* 객체 리터럴
* Object() 생성자 함수
* 생성자 함수
* class

등을 통해 객체를 생성 할 수 있다.

자바스크립트에서는 주로 클래스를 정의하기 위해, `function Object() {}`로 구현을 하고, 새로운 인스턴스를 만들기 위해 `new`라는 키워드를 사용한다. 일반 함수의 경우에도 `new`키워드를 사용하면 인스턴스가 만들어지기 때문에, 클래스를 만들기 위한 함수의 경우 이름의 첫 글자를 대문자로 표현한다.

#### Q 2 - 1) 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?

클래스 기반의 객체지향 프로그래밍이 `class` 키워드를 통해 객체를 정의한다면, 프로토 타입 기반의 객체지향 프로그래밍은 객체를 만들고, 공유하는 변수 또는 메서드 들은 각 객체가 참고하고 있는 `[[proto]]`에 정의하여 사용하고, 객체의 상속 및 확장의 경우에도 `proto`를 기반으로 설계한다.

#### Q 2 - 2) 클래스 기반의 객체지향 프로그래밍과 어떤 점이 다를까요?

클래스 기반의 언어는 
* 클래스로 객체의 기본적인 형태와 기능을 정의하고
* 생성자로 인스턴스를 만들어 사용할 수 있다
* 클래스에 정의된 메서드로 여러 가지 기능을 수행할 수 있습니다.
* 인스턴스가 클래스에 정의된 대로 같은 구조이며, 런타임에 바꿀 수 없다.
* 정확도, 안정성, 예측성 등에서는 프로토타입 기반의 언어보다 좀 더 나은 결과를 보장한다.

프로토타입 기반의 언어는

* 객체의 자료구조, 메서드를 동적으로 바꿀 수 있다.
* 자유롭게 객체의 구조와 동작 방식을 바꿀 수 있다.
* 자바스크립트는 거의 모든 것이 객체이므로, 클래스, 생성자, 메서드도 모두 함수로 구현 가능하다.

### 클래스는 어떻게 상속할 수 있을까요?

#### 클래스를 상속하는 설계의 장점과 단점은 무엇일까요?
