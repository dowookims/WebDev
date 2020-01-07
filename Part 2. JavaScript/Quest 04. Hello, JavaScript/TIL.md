# Quest 04. JavaScript

2020.01.07

## Topics : JS data 타입과 연산자

### 1. 기본 타입

그 자체가 하나의 값을 가지는 데이터 자료형. 자바스크립트는 기본 타입에도 타입별로 호출 가능한 표준 메서드를 정의하고 있다. 이들은 기본 타입의 값들에 대해 객체 형태로 메서드 호출시, 이들 기본 값은 메서드 처리순간에 객체로 변환된 다음 각 타입별 표준 메서드를 호출하게 되며, 호출이 끝나면 다시 기본값으로 돌아가게 된다.

```js
```

#### 1) Number

JS는 number 타입의 숫자형 단 하나만 존재한다. JS에서 모든 숫자를 64비트 부동 소수점 형태로 저장하기 때문. 그렇기에, 정수의 나눗셈을 할 경우에도 소수점이 나오기 때문에 이를 조심하여 문서를 작성하여야 한다.

또한, +infinite, -infinite, NaN도 존재한다.

* NaN은 수치 연산을 해서 정상적인 값을 얻지 못할 때 출력되는 값이다.

#### 2) String

텍스트 데이터를 나타내는데 사용하며, 16비트 부호없는 정수 값 요소들의 집합이다. String의 각 요소는 String의 위치를 차지한다(const a = "number" => a[0] = n)

자바스크립트의 문자열은 immutable 하지만, 일부가 수정된 다른 문자열을 만드는건 가능하다. 즉, 한번 생성된 문자열은 읽기만 가능하고 쓰기는 불가능하다.
```js
const a = "test"
a[0] = "T"
console.log(a)
// "Test"가 나오기를 예상했으나, "test"가 출력됨
```

#### 3) Boolean

true 와 false 값 만을 가진다.

#### 4) undefined

값이 비어있음을 나타내며, JS 환경 내에서 기본적으로 값이 할당되지 않은 경우 undefined 타입 이며, undefined 타입의 변수는 변수 자체의 값 또한 undefined. undefined는 타입이자 값을 의미한다.

#### 5) null

값의 비어있음을 나타낸다. 그러나 값이 할당되지 않은게 아니라 일반적으로 개발자가 명시적으로 값이 비어있음을 나타내는데 사용한다.

#### 6) symbol (es 6에 추가)

유일하고 immutable한 기본 값으로, 객체 속성의 key 값으로도 사용 가능하다.

### 2. 참조 타입

자바스크립트에서 기본 타입을 제외한 모든 값은 객체이다. 이는, 객체의 모든 연산이 실제 값이 아닌 참조값으로 처리 됨을 의미한다.

#### Object

* key : value 형태의 프로퍼티들을 저장하는 컨테이너의 역할로, hash와 유사하다.
* 객체는 여러개의 프로퍼티를 가질 수 있으며, 이 프로퍼티는 기본 타입 또는 참조 타입이 될 수 있다.
* 자바스크립트에서 객체를 생성 할 때, Object() 객체 생성자 함수, 객체 리터럴, 생성자 함수를 통해 객체를 만들 수 있다.
  * Object()
  
  ```js
  const foo = new Object()
  foo.name = 'foo';
  foo.age = 30;
  foo.gender = 'male';
  console.log(typeof(foo)) // object
  console.log(foo) // { name: 'foo', age: 30, gender: 'male' }
  ```
  * 객체 리터럴
    ```js
    const foo = {
      name: 'foo',
      age: 30,
      gender: 'male'
    };
    console.log(typeof(foo)); // object
    console.log(foo); // { name: 'foo', age: 30, gender: 'male' }
    ```

* 객체에서 프로퍼티를 읽고, 쓰기 위해 객체 명 이후 object.propertyName 또는 object[propertyName]으로 접근 할 수 있다.
  * 대괄호([])로 접근시 대괄호 안에서 접근하려는 프로퍼티 명은 문자열 타입으로 되어 있어야 한다. 만약 변수가 들어가게 되는 경우, 변수의 값은 문자열로, 그 프로퍼티 명을 나타내야 한다.

* 자바스크립트 객체의 프로퍼티에 값을 할당 할 때, 프로퍼티가 이미 있는 경우 해당 프로퍼티의 값이 갱신되지만, 객체의 해당 프로퍼티에 값이 없을 경우 새로운 프로퍼티가 동적으로 생성된 후 값이 할당된다.
  
* 접근하려는 프로퍼티가 표현식 또는 예약어 일 경우 반드시 대괄호로 접근해야 한다.

###### [-1] 순회

Object 타입은 `for key in obj`로 순회가 가능하다

```js
const obj = {
  a: 1,
  b: 2,
  c :3
}

for ( item in obj ) {
  console.log(obj[item])
  /*
    1
    2
    3
  */ 
}
```

##### [-2] 객체의 프로퍼티 삭제

delete(Object.key)로 삭제가 가능하다.

##### [-3] Call By Value , Call By Reference

* Call By Value의 경우 함수를 호출할 때, 인자로 기본 타입의 값을 넘길 경우, 매개변수로 복사된 값이 전달된다. 그렇기에 함수 내부에 매개변수를 이용해 값을 변경해도 실제로 호출된 변수의 값이 변경되지는 않는다.

```js
let n = 30;
function changeNum(n){
  n = 40;
  console.log(n)
}
chnageNum(n) // 40
console.log(n) // 30
```

* Call By Reference의 경우 인자로 참조 타입인 객체를 전달하고, 이 때 객체의 프로퍼티값이 함수의 매개변수로 복사되지 않고 인자로 넘긴 객체의 참조값이 그대로 함수 내부로 전달된다. 그렇기에 함수 내부에서 참조값을 이용해 인자로 넘긴 실체 객체의 값을 변경 가능하다.

```js
const obj = {
  a: 1,
  b: 2
}

function chnageNum(obj){
  obj.a = 4;
  console.log(obj.a)
}
chnageNum(obj) // 4
console.log(obj.a) // 4
```

##### [-4] Prototype

자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다. 자바스크립트에서 이러한 부모 객체를 프로토타입 객체라고 부른다.

* ESMAScript에서 자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가지고 있다고 설명되어 있으며, 크롬 브라우저에서는 객체에 프로퍼티로 `__proto__`로 접근 가능할 수 있다.

#### function

##### 1) 함수의 정의

* 함수 선언문
  
  반드시 함수명이 정의되어야 한다.

  ```js
  function add(x,y) {
    return x + y;
  }
  ```

* 함수 표현식
  
  함수를 숫자나 문자열처럼 변수에 할당하는 방식으로, 함수 리터럴로 하나의 함수를 만들고, 생성된 함수를 변수에 할당하여 함수를 생성하는 방법.

  ```js
  const add = function(x, y){
    return x + y;
  }
  add(4,3) // 7
  ```

* Function()

```js
const add = new Function('x', 'y', 'return x + y');
console.log(add(3,4))
```

##### 2) 함수의 호이스팅

```js
add(2, 3); //5

function add(x,y) {
  return x + y;
}

add(3, 4) // 7
```

```js
add(2, 3) // uncaught type error

const add = function(x,y){
  return x + y;
};

add(3, 4) // 7
```

##### 2) 함수 객체

자바스크립트에서 함수도 객체이다. 이는 함수도 일반 객체처럼 취급이 될 수 있다는 것이다. 때문에 자바스크립트 함수는

* 리터털에 의해 생성 가능
* 변수나 배열의 요소, 객체 프로퍼티 등에 할당 가능
* 함수의 인자로 전달 가능
* 함수의 리턴값으로 리턴 가능
* 동적 프로퍼티 생성 및 할당 가능

이와 같은 특성이 있으므로, 자바스크립트에서의 함수를 **일급 객체** 라고 부른다.

* 함수 객체의 기본 프로퍼티중에 잘 보아야 할 것은
  * caller
  * arguments
  * length : 인자의 개수
  * prototype

* 함수의 prototype은 Function.prototype 객체이지만, 이 또한 함수이다. 이 함수 객체의 부모는 Object.prototype 객체이다.
  * Function.prototype 객체는
    * constructor
    * toString()
    * apply, call, bind 메서드 등을 가지고 있다.

##### 3) 함수의 다양한 형태

* callback 함수
  * 익명 함수의 대표적인 사용
  * 코드를 통해 명시적으로 호출하는 함수가 아니라, 함수를 등록만 하고, 이벤트가 발생하거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수.
  * 특정 함수의 인자로 코드 내부에서 호출되는 함수
  * 대표적으로 이벤트 핸들러.

* 즉시 실행 함수 (Immediate functions)
  * 함수를 정의함과 동시에 바로 실행하는 함수. 익명 함수를 응용한 형태
  * 초기화 등에 사용된다.

* 내부 함수
  * 함수 코드 내부에 다시 함수를 정의한 것.
  * 클로저를 생성하거나 독립적인 헬퍼함수를 구현하는 용도 등으로 사용

  ```js
  function parent(){
    var a = 100;
    var b = 200;

    function child(){
      var b = 300;
      console.log(a);
      console.log(b);
    }
    child();
  }
  parent();
  child(); // not defined error
  ```

    * 내부 함수를 사용하면 부모 함수의 변수에 접근이 가능하다.(스코프 체이닝)
    * 내부 함수는 일반적으로 자신이 정의된 부모 함수 내부에서만 호출 가능하다.
    * 부모함수가 내부 함수를 외부로 리턴하면, 부모 함수 밖에서도 사용 가능하다.
  
  ```js
  function parent() {
    var a = 100;
    var child = function() {
      console.log(a)
    }
    return child;
  }

  var inner = parent() // 100
  ```

  * 위 child 처럼, 부모 함수 스코프의 변수를 참조하는 inner() 와 같은 함수를 클로저라고 한다.

```js
(function (name){
  console.log('This is the immediate function -> ' + name);
})('foo')
```

* 함수를 리턴하는 함수

함수도 일급 객체이므로 일반 값처럼 함수 자체를 리턴할 수 있다. 함수를 호출함과 동시에 다른 함수로 바꾸거나, 자기 자신을 재정의하는 함수를 구현할 수 있다.

```js
var self = function(){
  console.log('a');
  return function(){
    console.log('b');
  }
}

self = self(); // a
self() // b
```

##### 4) 함수 호출과 this

###### (1) arguments 객체

런타임 시에 호출된 인자의 개수를 확인하고, 이에 따라 동작을 다르게 해줘야 할 필요가 있을 경우 사용하는 것이 arguments 객체

arguments 객체는 함수를 호출할 때 넘긴 인자들이 배열 형태로 저장된 객체이다. 이 객체는 실제 배열이 아닌 유사 배열 객체이다.

```js
function add(a, b) {
  console.dir(arguments);
  return a + b;
}

console.log(add(1))
console.log(add(1, 2))
console.log(add(1, 2, 3))
```

arguments 객체는
  * 함수 호출 시 넘겨진 인자
  * length
  * callee
로 구성되어 있으며, 배열이 아니므로 배열 메서드 사용시 에러가 발생하기 때문에, call과 apply 등을 활용하여 작업을 진행한다.

###### (2) this 바인딩

자바스크립트 함수 호출 시, 함수가 호출되는 방식(패턴)에 따라 this가 다른 객체를 참조하기 때문에 사용시 유의해야 한다. 객체의 프로퍼티가 함수일 경우, 함수를 메서드라고 부르는데, 이 때 메서드를 호출할 때 내부 코드에서 사용된 this는 해당 메서드를 호출한 객체로 바인딩 된다.

자바스크립트에서 함수 호출 시, 해당 함수 내부 코드에서 사용된 this는 전역 객체에 바인딩 된다. (브라우저는 window, 노드는 global)

```js
var value = 100;

var myObj = {
  value: 1,
  func1: function(){
    this.value += 1;
    console.log('func1() called. this.value : ' + this.value);
    func2 = function(){
      this.value += 1;
      console.log('func2() called. this.value : ' + this.value);
      func3 = function(){
        this.value += 1;
        console.log('func3() called. this.value : ' + this.value);
      }
      func3()
    }
    func2();
  }
};

myObj.func1();
/*
 func1() called. this.value : 2
 func2() called. this.value : 101
 func3() called. this.value : 102
*/
```

내부 함수도 함수이기 때문에 this에 binding 된다. 이를 극복하기 위한 방법으로

```js
var value = 100;

var myObj = {
  value: 1,
  func1: function(){
    var that = this;
    this.value += 1;
    console.log('func1() called. this.value : ' + this.value);
    func2 = function(){
      that.value += 1;
      console.log('func2() called. this.value : ' + that.value);
      func3 = function(){
        that.value += 1;
        console.log('func3() called. this.value : ' + that.value);
      }
      func3()
    }
    func2();
  }
};

myObj.func1();
```

## CheckList

* 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?
  * 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?

    * 자바스크립트는 Brendan Eich 에 의해 개발 되었고, 이 자바스크립트를 해석하기 위한 렌더링 머신의 규격이 제각각 이었다(특히 ms)
    * 그렇기에, 이 문제(규격이 다른 것)를 해결하기 위해, 표준화를 위한 작업이 필요하였고, 이를 해결하는 기관으로 ECMA( European Computer Manufacturers Association ) 라는 정보와 통신시스템의 비영리 표준 기구에 제출하였고 표준에 대한 작업을 ECMA-262란 이름으로 1996년 11월에 시작해 1997년 6월에 채택되었다.
    * 이 ECMA에서 이름을 따서, ES는 Ecma Script의 약자로 사용 되기 시작했고, ES5는 ECMA Script 5의 규격을 따르는 자바스크립트라 생각하면 된다.
    * ES 2015 (ES 6)은, 2015년에 발표된 규격인 ES 6을 따르는 자바스크립트를 의미한다.

    [정보 출처 : sjk5766 - medium](https://medium.com/sjk5766/ecma-script-es-%EC%A0%95%EB%A6%AC%EC%99%80-%EB%B2%84%EC%A0%84%EB%B3%84-%ED%8A%B9%EC%A7%95-77715f696dcb)
* 웹 브라우저의 자바스크립트 콘솔은 어떻게 사용할까요?
  * 웹 브라우저(Chrome)에서 자바스크립트 콘솔을 띄우는 단축키는 무엇인가요?
    `alt + cmd + i `
* let를 이용하여 변수를 선언하는 것과 const를 이용하여 변수를 선언하는 것은 어떻게 다를까요?
  * var를 이용하여 선언하는 방법은 어떻게 다를까요?

  ```
  var는 function scope 이고, const와 let은 block-scoped.
  const는 상수로서 값을 재할당 할 수 없지만, let은 재할당이 가능하다.
  또한, let과 const 는 변수 재선언이 불가능하다.
  ```

  * 특이한 var의 세계
  ```js
  for(var j=0; j<10; j++) {
    console.log('j', j)
  }
  console.log("j = ", j) // j = 10

  (function() {
  // var 변수는 여기까지 hoisting이 된다.
  for(var i=0; i<10; i++) {
    console.log('i', i)
  }
  })()
  console.log('after loop i is', i) // ReferenceError: i is not defined
  ```

  var, let, const 모두 hoisting이 존재하나, 각 키워드들은 자신들이 효력을 발휘 할 수 있는 범위 내에서 hoisting이 발생한다.

* 자바스크립트의 익명 함수는 무엇인가요?
  * 익명 함수는 이름이 없는 함수를 의미한다.
  * 자바스크립트의 Arrow function은 무엇일까요?
