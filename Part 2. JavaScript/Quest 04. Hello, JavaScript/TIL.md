# Quest 04. JavaScript

2020.01.07

## Topics : JS data 타입과 연산자

### 1. 기본 타입

그 자체가 하나의 값을 가지는 데이터 자료형.

#### 1) Number

JS는 number 타입의 숫자형 단 하나만 존재한다. JS에서 모든 숫자를 64비트 부동 소수점 형태로 저장하기 때문. 그렇기에, 정수의 나눗셈을 할 경우에도 소수점이 나오기 때문에 이를 조심하여 문서를 작성하여야 한다.

또한, +infinite, -infinite, NaN도 존재한다.

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

자바스크립트에서 기본 타입을 제외한 모든 값은 객체이다.

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
      gender: 'male
    };
    console.log(typeof(foo)); // object
    console.log(foo); // { name: 'foo', age: 30, gender: 'male' }
    ```

##### [1] Array

##### [2] function

##### [3] regex

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
