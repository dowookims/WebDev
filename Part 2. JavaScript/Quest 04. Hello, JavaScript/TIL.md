# Quest 04. JavaScript

2020.01.07

## Topics : JS data 타입과 연산자

### 1. 기본 타입

그 자체가 하나의 값을 가지는 데이터 자료형.

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

##### [-3] Prototype

자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다. 자바스크립트에서 이러한 부모 객체를 프로토타입 객체라고 부른다.

* ESMAScript에서 자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가지고 있다고 설명되어 있으며, 크롬 브라우저에서는 객체에 프로퍼티로 `__proto__`로 접근 가능할 수 있다.

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
* 자바스크립트의 익명 함수는 무엇인가요?
  * 자바스크립트의 Arrow function은 무엇일까요?
