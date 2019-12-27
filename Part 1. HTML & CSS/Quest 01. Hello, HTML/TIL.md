# Quest 01. HTML

## 1. 브라우저의 역사

### 1) Mosaic(1993)

* 일리노이 대학의 국립 슈퍼컴퓨팅 애플리케이션 센터에서 개발되었다. 
* 일반 대중에 공개되었으며, 단순 명료함이 특징이었다.
* 텍스트와 이미지를 함께 표시한 최초의 브라우저
* 레이아웃을 최초로 도입
* 멀티미디어 서비스를 이용 가능
* 마이크로소프트 컴퓨터에서 비교적 쉽게 실행이 가능한 최초의 브라우저
* 90년대 웹 브라우저의 토대가 됐다.

### 2) Netscape(1994)

* 모자이크를 만들었던 팀이 다시 뭉쳐 만든 브라우저
* 마크 안데르센이 주도하였으며, 모자이크를 기반으로 대폭 개선되었으며, 다양한 색상을 지원함.
* 캐싱을 통한 즉석 페이지 로딩을 지원했으며, 일반인들이 사용하는 전화 접속 모뎀을 배려함.
* 어디서나 사용할 수 있었다.
* 최초의 상용화 웹 브라우저
* 웹 보급 초창기에 넷스케이프가 시장을 주도 하였음.
* 후에 유료화 정책을 펼치다가 MS에 점유율이 밀림
* 나중에 오픈소스로 정책을 변경하였고, 훗날 다른 브라우저에 많은 영향을 줌

### 3) Internet Explorer(1995)

* MSHTML(트라이던트) 기반
* Jscript

### 4) Firefox

* Gecko 기반
* 모질라 재단에서 만든 웹브라우저
* 사용자의 극한의 사용성에 초점이 맞추어져 있음

### 5) Chrome (2008)

* Blink 기반 (렌더링 엔진)
* v8 자바스크립트 처리엔진
* Google에서 제작, 현재(2019년 12월 27일 기준) 가장 많이 사용하는 웹 브라우저.

### 6) Safari (for iOS) (2003)

* WebKit 기반
* Apple에서 만들었으며, macOS, iOS, iPadOS 등 apple 제품의 기본 브라우저.

### 7) Edge (2015)

* 윈도우 10에 웹표준과 HTML5을 강화한 엔진으로 설계됨
* EdgeHTML 엔진을 사용하다 이후 크로미움(blink + v8) 버전으로 변경
* 트라이던트 엔진 단절

```
Question ) MS와 IE는 왜 역사에 오점을 남기게 되었을까요?

* 웹 표준을 지키지 않음
  - 크로스 브라우징 이슈
```

## 2. HTML 표준의 역사

HTML은 Hyper Text Markup Language로 프로그래밍 언어가 아니라 마크업 언어이다. HTML은 문서 작성자가 실수를 하더라도 브라우저가 최대한 유추하여 작성자가 원하는 결과를 출력 해 준다.

```
Question ) HTML 4.x 이후의 HTML 표준의 변천사는 어떻게 되나요?
```

### 1) HTML 4.01 (1999. 12)

* 안정된 표준의 HTML의 버전이다. 
* CSS(Cascading Style Sheet)로 디자인적인 요소를 구분
* HTML로는 웹페이지의 전반적인 구조만을 명시하는 것을 원칙.
* 비주얼 태그가 모두 비권장으로 지정된 것이 가장 큰 변화 
* 기존 비주얼 태그는 CSS로 빼서 사용할 것을 권장

### 2) XHTML 1.0, XHTML 1.1

* XML과 HTML을 합성하여 더 확장된 태그 사용 가능
* HTML보다 엄격한 규칙을 적용함.
* XML이 하위 호환성을 지원하지 않는 문제점 발생
* 학습의 어려움
* 대소문자 구분, 태그는 반드시 소문자로
* 잘못된 태그 구조는 에러 처리
* 속성값은 따옴표 사용
* 빈 태그는 </>로 끝나야함


### 3) XHTML 2.0

HTML 고의 호환을 포기하고, semantic tag를 추가하였다.
* 하위호환성 문제로 인해 브라우저 뿐만 아니라 개발자들에게도 외면 당함
* 2009년에 XHTML이 폐지됨
* 그러나 의의는 존재

### 4) HTML5

WHATWG(Web Hypertext Application Technology Working Group) 의 등장으로, 새로운 웹표준을 만들어냄

* 호환성 향상
* semantic tag
* accessibility enhance
* graphic(canvas, svg, webgl)
* websocket
* webstorage
* webworker
* pwa(progressive web app)

* HTML 5.3

### 3. HTML 문서의 구조

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

```

### 4. HTML 문서의 엘리먼트

* Semantic elements
* Block-level elements vs Inline elements
    * Block-level elements
      - 기본적으로 넓이를 100%를 유지하는 박스형태의 서식을 가짐
      - 블럭요소 뒤에 오는 요소는 줄바꿈 되어 표시됩니다.
      - Body 태그 안에서만 사용
      - 인라인 요소와 다른 블록 레벨 요소 포함 가능
      - 새로운 행에서 시작함(줄바꿈)
    * Inline elements
        - 블럭요소 안에 위치하며 줄바꿈 없이 표시됨
        - Body 안에서만 사용
        - 데이터와 다른 인라인 요소만 포함 가능
        - 줄바꿈 되지 않음
        - 텍스트 레벨 요소라고 불림
```
Question ) <section>과 <div>, <header>, <footer>, <article> 엘리먼트의 차이점은 무엇인가요?

해당 태그가 어떤 의미를 가지고 있느냐의 차이. semantic tag는 웹 접근성 뿐만 아니라 검색 엔진, 크롤러 등이 웹 페이지를 정확하고 빠르게 분석 할 수 있게 한다.
```
```
Question ) 블럭 레벨 엘리먼트와 인라인 엘리먼트의 차이는 무엇일까요?

Block level element의 경우 부모 컴포넌트의 가로 길이 100%를 유지하는 박스 형태의 레이아웃을 가지며, 블럭요소 뒤에 있는 요소는 개행 후 표시 된다.

inline level element의 경우 내부 컨텐츠의 길이에 맞게 가로 길이가 조정된다.
```
