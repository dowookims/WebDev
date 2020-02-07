# Quest 10. Hello, Node.js

## 1. Node.js란?

`Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.`

`노드 JS는 Chrome V8 자바스크립트 엔진으로 빌드된 Javascript 런타임이다.`

2005년 Ajax가 부상하면서 JS의 중요성이 더더욱 부각되었다. Ajax의 활성화와 함께, JS의 연산이 증가했고, 자연스레 더 빠른 JS 엔진이 필요하게 되었다. 이런 맥락에서 2008년, Google이 공개한 V8 엔진은 많은 주목을 받게 되었다.

2009년 Ryan Dahl이 개발한 Javascript 서버 개발 환경으로, 구글 크롬 브라우저에서 사용하는 V8 엔진을 사용하여 자바스크립트를 활용해 어플리케이션 개발을 할 수 있게 한다.
v8 엔진은 c++로 개발 되었으며 자바스크립트 코드를 기반으로 머신 코드를 생성하여 실행하므로 다른 자바스크립트 엔진보다 빠른 속도로 처리한다는 것이 가장 큰 장점이다.

자바스크립트 처리 속도가 빨라지고, 2009년 1월 부터 자바스크립트의 활용을 브라우저를 넘어서기 위한 노력들이 많아졌고, 이를 위해 표준을 만드려는 움직임이 활발해지기 시작했다.
현재 CommonJS 프로젝트로 알려진 ServerJS프로 젝트도 이맘때 쯤 시작되었고, Common.js 발표 이후 Ryan Dahl은 Common.js 표준과 v8 엔진으로 node.js를 개발하였다.

Node.js를 개발 할때, Ruby의 Event Machine과 Python의 Twisted와 같은 시스템에 영향을 받고 설계 되었다.

기존에 있는 서버 어플리케이션과 node.js로 만들어진 서버 어플리케이션의 차이는, 기존 웹 서버가 대부분 스레드 기반으로 동기 방식으로 네트워크 입출력을 처리했다면, Node.js는 이벤트를 기반으로 하는 비동기 방식으로 네트워크 입출력을 처리했다.

Node.js가 이벤트 기반 비동식으로 작동하기 때문에, 대규모 네트워크 프로그램 개발에 적합하다. 싱글 스레드 기반의 이벤트를 활용한 비동기 처리 방식으로, 스레드를 생성, 유지를 하는데 불필요한 메모리 사용 및 시스템 리소스 사용에 큰 비용을 두지 않는 것은 Node.js의 장점이다. 즉, 프로세스의 dead-lock과 blocking에 대해 걱정 하지 않아도 된다. 또한, 싱글 스레드 기반의 서버이기 때문에 한 스레드가 죽으면 전체 프로세스에 영향을 준다는 단점 또한 가지고 있다.

## 2. NPM 이란?

NPM은 Node Package Manger의 약자로, 노드를 활용하여 만들어진 자바스크립트 코드들의 저장소이며 라이브러리들을 설치, 관리 할 수 있게 도와주는 패키지 매니저이다.

NPM은 Node.js를 설치하면 자동으로 npm이 설치된다.

### 2-0 npm init

작업을 진행할 디렉토리에 CLI에서 npm init 을 하면, 해당 폴더에서 진행할 프로젝트에 대한 정보를 입력하고, npm을 사용할 수 있는 환경을 제공해 주는 명령어이다. 이 명령어를 통해 정보들을 입력하게 되면, package.json이라는 파일이 만들어 지게 되는데, 이 package.json에서 node기반의 프로젝트 환경을 구축 할 수 있다.

### 2-1 scripts

script는 CLI를 통해 작업을 해야 할 명령어들을 정리 해두어, npm run + '스크립트 명' 과 같은 식으로 단축 실행이 가능하게 만둘어준다.

ex) npm run start, npm run test 등

### 2-2 dependencies

#### 2-2-1 devDependencies vs dependencies

devDependecies에 기술된 라이브러리의 경우, 개발 환경에서만 필요한 라이브러리들을 이야기하고, dependencies에 기술된 라이브러리의 경우, 개발 환경 뿐만 아니라 런타임에서도 필요한 라이브러리 들을 기술한다.

이는 개발자가 직접 입력해주기 보다는, npm의 명령어를 통해 패키지를 다운받을 때 사용하는 키워드에 따라 달라진다. 일반적으로 패키지를 다운 받을 때,

`npm i packageName` 으로 패키지를 저장한다면, devDependencies의 경우 `npm i pacakgeName --save-dev`로 저장한다.

ex)
* devDependencies : Chai, Mocha,Enzyme etc..
* dependencies : axios, express, react, redux

## 3. Node의 전역 변수.

브라우저상에서 Javascript의 전역 Context, 최상위 객체는 Window였다. 그러나 Node 런타임 환경 내에서 전역은 Global이다.

`__dirname` : 현재 실행중인 코드의 디렉토리 경로

`__filename` : 현재 실행중인 코드의 파일 경로

### 3-1 process 객체

프로그램과 관련된 정보를 나타내는 객체이며, 웹 브라우저에는 존재하지 않음.

## 4. require와 exports

Node.js는 CommonJS의 모듈 시스템을 따르며, require 함수를 통해 모듈화된 파일들을 불러오고 활용한다.
require의 핵심 기능은, 자바스크립트 파일을 읽고, 그 파일을 실행하고, 그리고 export 객체를 반환한다.

CommonJS에서 모듈을 어떻게 정의하고, 사용할 것인가에 대한 내용은 아래와 같이 세 부분으로 이루어진다.

* Scope : 모든 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.
  * 모듈은 자신만의 독립적인 실행 영역이 있어야 하기에, 전역변수와 지역변수를 분리하는 것은 매우 중요하다.
  * 서버 사이드 JS의 경우 파일마다 독립적인 파일 스코프가 존재하기에, 파일 하나에 모듈 하나를 작성하면 간단히 해결 가능
* Definition : 모듈 정의는 exports 객체를 이용한다.
* Usage : 모듈 사용은 require 함수를 이용한다.

`CommonJS의 모듈 명세는 모든 파일이 로컬 디스크에 있어 필요할 때 바로 불러올 수 있는 상황을 전제로 한다.`

즉, 서버사이드 JS 환경을 전제로 한다. 그러나 이 방식은 브라우저에서 결정적인 단점이 될 수 있는데, 필요한 모듈을 모두 내려받을 때 까지 아무것도 할 수 없게 된다는 것이다.
이를 해결하기 위한 방법으로, 동적으로 `<script>` 태그를 삽입하여 해결하도록 했다. 이는 Javascript 로더들이 사용하는 가장 일반적인 방법이기도 하다.

## 4-1 문제점 1

JS가 브라우저에서 동작할 때, 서버 사이드 JS와 달리 파일 단위 스코프가 없다. 또한 표준 `<script>` 태그를 활용해도 변수의 이름이 같으면, 변수를 덮어쓰게 되는 문제도 발생한다. 
이런 문제를 해결하기 위해 CommonJS는 서버 모듈을 비동기적으로 전송할 수 있는 모듈 전송 포맷(Module Transport Format) 을 추가로 정의했다.

이 명세에 따라 서버사이드에서 사용하는 모듈을 전송 포맷으로 감싸면 서버 모듈을 비동기적으로 로드할 수 있게 되었다.

```js
// server side에서 사용되는 모듈

var sum = require('./math').sum;
exports.plusTwo = (a) => return sum(a,2);

// browser 에서 사용되는 모듈

require.define({'complex-numbers/plus-two': (require, exports) => {
    var sum = require('./complex-number').sum;
    exports.plusTwo = (a) => return sum(a,2);
};
}, ['complex-numbers/math']);
```

브라우저에서 사용하는 모듈 부분에서 주목할 점은, require.define 함수를 통해 함수 클로저로 전역 변수를 통제한다.

### 4-2 AMD(Asynchronous Module Definition)

비동기 상황에서 JS 모듈을 쓰기 위해 CommonJS와 논의하다 합의점을 이루지 못하고 독립한 그룹.
AMD의 목표는 필요한 모듈을 네트워크를 이횽애 내려받아, 브라우저 환경에서도 모듈을 사용할 수 있도록 표준을 만드는 일이다.

CommonJS와 AMD 에서 정의하는 모듈 명에의 차이는 모듈 로드에 있다. 필요한 파일이 모두 로컬 디스크에 있어 바로 불러 쓸 수 있는 상황인 서버사이드에서는 CommonJS가 AMD보다 간결하다.
그러나 필요한 파일을 네트워크를 통해 내려받아야 하는 브라우저 환경에서는 AMD가 CommonJS보다 더 유연한 방법을 제공한다.

AMD는 비동기 모듈에 대한 표준안을 다루고 있으며, CommonJS와 많이 닮아있기도 하고, 호환할 수 잇는 기능을 제공하기도 한다. (require 함수 사용 가능 및 exports 형태로 모듈 정의)

또한, 브라우저 환경의 JS는 파일 스코프가 존재하지 않기에 AMD에서는 `define()` 함수로 파일 스코프의 역할을 대신한다. 일종의 네임스페이스 역할을 하여 모듈에서 사용하는 변수와 전역변수를 분리한다.

#### 4-2-1 define()

`define(id?, dependencies?, factory);`

`id` : 모듈을 식별하는데 사용하는 인수로, 선택적으로 사용한다. id가 없으면 로더가 요청하는 `<script>` 태그의 src 값을 기본 id로 설정한다. 만약, id를 명시하면, 파일의 절대 경로를 식별자로 지정해야 한다.

`dependencies` 정의하려는 모듈의 이존성을 나타내는 배열로, 반드시 먼저 로드되어야 하는 모듈을 나타낸다. 이렇게 먼저 로드된 모듈은 팩토리 함수의 인자로 넘겨진다. default value는 `['require', 'exports', 'module']`이 기본으로 지정되며, 세가지 모듈은 CommonJS에서 정의한 전역객체와 동일한 역할을 하게 된다.

`factory` 모듈이나 객체를 인스턴스화 하는 실제 구현을 담당한다. 팩토리 인수가 함수면 싱글톤으로 한번만 실행되고, 반환되는 값이 있다면 그 값을 exports 객체의 속성 값으로 할당한다. 인수가 객체면, exports 객체의 속성 값으로 할당된다.

### 4-3 exports

Node.js 환경에서 모듈을 만들 때 module.exports 를 사용한다.

```js
// calc.js
function add(a, b) {
    return a + b;
}
module.exports = add;

// main.js
const add = require('./calc.js');
console.log(add(1,2));
```

```js
// calc.js
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

module.exports = {
  add: add,
  substract: substract,
  multiply: multiply,
  divide: divide,
};

// main.js
const add = require('./calc.js').add;
const multiply = require('./calc.js').multiply;

console.log(multiply(add(1,2), add(2,3)); // 15
```


```js
exports.add = function(a, b) {
  return a + b;
};

exports.substract = function(a, b) {
  return a - b;
};

exports.multiply = function(a, b) {
  return a * b;
};

exports.divide = function(a, b) {
  return a / b;
};
```

[Javascript 표준을 위한 움직임: CommonJS와 AMD](https://d2.naver.com/helloworld/12864)

## CheckList

### module.exports 와 exports 변수는 어떻게 다를까?

moudle객체는 exports 프로퍼티를 가지게 된다. exports는 module.exports를 참조하고 있다.

module.exports는 주로 한 번에 export 할 때 사용하고, exports는 여러 개의 객체를 위로 export할 때 사용한다.

### npm

#### npm pakage를 `-g` 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가?

-g 옵션을 사용하면 로컬 node 저장소에 패키지가 다운받아지고, 패키지명과 관련한 `CLI`를 사용 할 수 있게 된다. -g 옵션을 사용하지 않고 설치 할 경우, 현재 package.json이 존재하는 위치에 node_modules 안에 라이브러리가 저장되어 그 해당 위치에서 해당 버전의 라이브러리를 사용 할 수 있다.

### difference `require` and  `import`

* require
  * can dynamic loading wherever the loaded moudle name is not predefined 
  * wherever you do not absolutely loada  module providing it's "truly required (depending on bound code flow)
  * loading synchronous

* import
  * can use name import selectively load only the pieces that need. can save memory => A module’s structure being static means that you can determine imports and exports at compile time (statically)
  * declarative syntax
  * Import can be asynchronous
  * return Promise
  * can do tree shaking - webpack
  * static loading

* Require is more of dynamic analysis and import is more of static analysis
* Require Throws error at runtime and Import throws error while parsing
* Require is Nonlexical and Import is Lexical
* Requires to stay where they have put the file and imports get sorted to the top of the file.
* Import is always run at the very beginning of the file and can’t be run conditionally. On the other hand require can be used inline, conditionally,

use require() "natively" in NodeJS and not in browsers, and import() is specified for all JavaScript engines.

You can't selectively load only the pieces you need with require but with imports, you can selectively load only the pieces you need. That can save memory.

Loading is synchronous(step by step) for require on the other hand import can be asynchronous(without waiting for previous import) so it can perform a little better than require

[참고 자료 - 2ality](https://2ality.com/2014/09/es6-modules-final.html)

[참고 - educba](https://www.educba.com/require-vs-import/)

[참고 - javascript.info](https://javascript.info/modules-intro)

[참고 - JS module system, hacks.mozila](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

[참고 - Naver D2](https://d2.naver.com/helloworld/591319)

[참고](https://insights.untapt.com/webpack-import-require-and-you-3fd7f5ea93c0)

[webpack](https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234)