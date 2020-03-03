# Quest 16. Vue.js

## Components in web client development

Component는 소프트웨어 시스템에서 독립적인 업무 또는 독립적인 기능을 수행하는 모든 단위를 컴포넌트라고 보며, 재사용이 가능한 최소 단위를 말한다.  

모듈은 특정 기능을 온전히 수행할 수 있도록 만들어 졌다면, 그 모듈 내에서도 재사용 가능한 단위가 컴포넌트라 할 수 있다.

web client에서 Component란 web platform API들의 집합으로, 개발자가 새로 custom 되고, 재사용 가능하며, 캡슐화 된 HTML을 만들 수 있게 한다. 이 태그들은 web page나 web app에서 사용된다.  
Custom된 컴포넌트와 위젯들은 웹 컴포넌트 표준에 의해 구성되어지며, 모던 브라우저 뿐만 아니라 자바스크립트 라이브러리, 프레임워크 등에도 사용되어 진다.

웹 컴포넌트들은 웹 표준에 기반을 두고 있다. 웹 컴포넌트를 서포트 해주는 특성들은 HTML과 DOM spec에 작성되어 있으며, 웹 개발자들이 손쉽게 캡슐화된 새로운 엘리먼트를 확장할 수 있게 도와준다.

## Vue.js framework

Vue.js는 User Interface를 만들기 위한 progressive framework이다. 다른 Monolithic framework와 다르게, 뷰는 점진적 도입이 가능하게 디자인 되었다.  

Vue의 core library는 view layer에만 초점을 맞추고 있고, 다른 라이브러리나 현재 존재하는 프로젝트와 쉽게 통합할 수 있다는 장점이 있다.

React의 경우 javascript로 HTML, CSS를 다룬다는 특징이 있으나, Vue는 HTML 을 `<template></template>`, CSS를 `<style></style>`, JS를 `<script></script>` 로 구분해 작업한다는 특징이 있다.

Vue.js는 양방향 데이터 바인딩을 지원하는데, 부모는 자식에게 Props로, 자식은 부모에게 Event를 Emit 함으로써 작동된다.

### Component in Vue.js

Vue Component 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화 하는데 도와준다. Vue Component는 Vue instance이기도 하므로 모든 옵션 객체를 사용 할 수 있으며, 라이프 사이클 훅을 사용 할 수 있다.

### 데이터 바인딩이란

두 데이터 혹은 정보의 소스를 모두 일치시키는 기법이다. 즉, 화면에 보이는 데이터와 브라우저 메모리에 있는 데이터를 일치시키는 기법이다. 대다수 자바스크립트 프레임워크가 단방향 데이터 바인딩을 지원하는 반면 AngulaerJS와 VueJS는 양방향 데이터 바인딩을 제공한다.

웹 어플리케이션의 경우 구조화된 아키텍처를 기반으로 코드들이 빌드되게 된다. MVC pattern, MVP, MVVM등 다양한 아키텍처 패턴들이 존재한다. 이런 패턴들은 뷰와 모델을 분리하여 작업을 하는데, 분리된 뷰와 모델은 유기적으로 동작하여야 하는 모순이 발생한다. 데이터 바인딩은 이런 모순을 해결해준다.

#### 단방향 데이터 바인딩

인스턴스가 템플릿에 값을 전달하며 화면에 표현하는 것처럼, 한 방향으로만 데이터에 접근 할 수 있는 것을 단방향 데이터 바인딩이라 한다.  
더 자세히 이야기 하면, JS에 있는 변수를 DOM(template)에 바인딩 하는 것이다.

* 데이터가 한 방향으로 흐르기 때문에 이해하기 더 쉽다는 장점이 있다.

* 하위 컴포넌트가 부모의 상태를 변경하여 데이터 흐름을 추론하기 어렵게 만드는 것을 방지할 수 있다.

* 컴포넌트 간 데이터 전달이 어렵다.

#### 양방향 데이터 바인딩

인스턴스가 템플릿에 값을 전달하며, 템플릿 역시 인스턴스의 데이터에 접근 할 수 있는 것을 양방향 데이터 바인딩이라 한다.  
데이터의 변화를 감지해 템플릿과 결합하여 화면을 갱신하고, 화면에서의 입력에 따라 데이터를 갱신한다. 즉, 데이터와 화면 사이의 데이터가 계속 일치하게 된다.  
이는 곳, JS 변수가 template에 값에 영향을 주면서, template 값의 변화가 JS 변수에 영향을 주는 것을 의미한다.

* 데이터 흐름이 복잡해져 디버깅 시 어려움이 존재 할 수 있으며, 변경되는 데이터를 감지하기 위한 성능 문제가 생긴다.

#### 바인딩의 종류

* 인터폴레이션 : `{{ }}` `instance => template`
* 프로퍼티 : `v-bind:property`, `instance => template`
* 어트리뷰트 : `v-bind:attribute`, `instance => template`
* 클래스 : `v-bind:class` `instance => template`
* 스타일 : `v-bind:style` `instance => template`
* 이벤트 : `v-on`, `template => instance`
* 양방향 데이터 바인딩 : `v-model`

## Virtual DOM

[Virtual DOM](https://velopert.com/3236)
