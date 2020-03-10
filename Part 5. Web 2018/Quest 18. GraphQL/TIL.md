# Quest 18. GraphQL

## 1. REST API

### 1) 정의

REST API는 Representational State Transfer의 약자로, 자원을 이름(자원의 표현) 으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미한다.  
이는 월드 와이드 웹(www)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 개발 아키텍처의 한 형식으로, REST는 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기에 웹의 장점을 최대한 활용할수 있는 아키텍처 스타일이며, 네트워크 상에서 Client와 Server 사이의 통신 방식 중 하나이다.

이를 좀 더 구체적으로 이야기 하면,

* 자원의 표현에 의한 상태를 전달하는 것인데
  * 자원의 표현
    * 자원 : 해당 소프트웨어가 관리하는 모든 것으로 문서, 그림, 데이터, 해당 소프트웨어 자체를 의미한다.
    * 자원의 표현 : 그 자원을 표현하기 위한 이름으로, DB 학생 정보가 자원일 때, 'students'를 자원의 표현으로 정한다.
  * 상태(정보) 전달
    * 데이터가 요청되어지는 시점에서 자원의 상태(정보)를 전달한다.
    * JSON 혹은 XML을 통해 데이터를 주고 받는 것이 일반적이다.

### 2) 구체적인 개념

HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)를 명시하고, HTTP METHOD(GET, POST, PUT, DELETE)를통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.

REST는 자원 기반의 구조(ROA, Resource Oriented Architecture) 설계 중심에 Resource가 있고, HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍쳐를 의미한다.

### 3) REST 특징

#### Server - Client 구조

자원이 있는 쪽이 Server, 요청하는 쪽이 Client가 된다. Server는 API를 제공하고, 비즈니스 로직 처리 및 저장을 책임진다. Client는 사용자 인증이나 context등을 직접 관리하고 책임지므로 서로 간 의존성이 줄어든다.

#### Stateless

* HTTP 프로토콜은 Stateless Protocol이기 때문에, 이 프로토콜을 사용하는 REST 역시 무상태성을 갖는다.
* Client의 context를 Server에 저장하지 않는다.
* Server는 각 요청을 별개의 것으로 인식하고 처리한다. 각 API 서버는 Client의 요청을 단순 처리하기에 Server의 처리 방식에 일관성을 부여하고, 부담이 줄어들며 서비스의 자유도가 높아진다.
* Cacheable : HTTP 프로토콜을 사용하므로 웹에서 사용하는 기존 인프라를 극대로 활용할 수 있다. (Last-Modified 태그 또는 E-Tag)
* Layerred System : Client는 Rest API Server만 호출하며, Rest Server는 다중 계층으로 구성 될 수 있다.
  * API Server는 순수 비즈니스 로직을 수행하고 그 앞단에 보안, 로드 밸런싱, 암호화, 사용자 인증 등을 추가하여 구조상 유연성을 줄 수 있다.
  * Proxy, gateway등을 두어 네트워크 기반의 중간 매체를 사용할 수 있다.
* Uniform Interface : URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행하며, HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하기에 특정 언어나 기술에 종속되지 않는다.

### 4) REST 구성 요소

#### 자원(Resource) : URI

* 모든 자원에 고유한 ID가 있고, 이 자원은 SERVER에 존재한다.
* 자원을 구별하는 ID는 'groups/:group_id'와 같은 HTTP URI다.
* Client는 URI를 이용해 자원을 지정하고 해당 자원의 상태(정보)에 대한 조작을 Server에 요청한다.

#### 행위(Verb) : HTTP METHOD

* HTTP 프로토콜의 METHOD(GET, POST, PUT, DELETE) 를 사용한다.

#### 표현(Representation of Resource)

* Client가 자원의 상태에 대한 조작을 요청하면 Server는 이에 적절한 응답을 보낸다.
* REST 에서 하나의 자원은 JSON, XML등 여러 형태의 Representation으로 나타나는데, JSON 혹은 XML을 통해 데이터를 주고 받는 것이 일반적이다.

### 5) REST가 필요한 이유

* 애플리케이션 분리 및 통합
* 다양한 클라이언트의 등장
* 서버 프로그램이 다양한 플랫폼(브라우저, 모바일 환경) 에서 통신 가능해야 함

### 6) REST의 장단점

#### 장점

* HTTP 프로토콜의 인프라를 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구축 할 필요가 없다.
* HTTP 프로토콜을 따르는 모든 플랫폼에서 사용이 가능하다.
* Hypermedia API의 기본을 지키며 범용성을 보장한다.
* REST API가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.
* 서비스 디자인에서 생길 수 있는 문제를 최소화 한다.
* 서버와 클라이언트의 역할을 명확하게 분리한다.
* HTTP cache를 사용하여 HTTP 요청을 줄일 수 있다.

#### 단점

* 표준이 존재하지 않는다.
* 사용할 수 있는 메소드가 젷한적이다.
* 구형 브라우저가 아직 제대로 지원해주지 못하는 부분이 존재한다.
* Client에서 필요한 데이터만을 받아 오는게 아닌 모든 데이터를 받아와야 한다.
* 관리해야 할 End Point가 많아지게 된다.
* 데이터를 선택 할 수 없기에, 네트워크 요청을 여러번 생성해 data overfetching, underfetching이 되기도 한다.
* response 구조를 요청하기 전에 알 수 없다.

[REST란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)

## 2. GraphQL API

### 1) Schema

### 2) Resolver

### 3) DataLoader

[GraphQL 개념잡기](https://tech.kakao.com/2019/08/01/graphql-basic/)
