# Quest 11. My Little Server

## 1. Rest API

REST는 Representational State Transfer의 약자로, 자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미한다.

* 자원의 표현에 의한 상태 전달이 핵심 키워드인데,
  * 자원의 표현
    * 자원 : 해당 소프트웨어가 관리하는 모든 것(문서, 그림, 데이터, 해당 소프트웨어)
    * 자원의 표현 : 그 자원을 표현하기 위한 이름 (학생 정보가 자원일 때, students를 자원의 표현으로 정함)
  * 상태 정보 전달
    * 데이터가 요청되어 지는 시점에서 자원의 상태(정보)를 전달
    * JSON 혹은 XML을 통해 데이터를 주고 받음

* www와 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 개발 아키텍처의 형식
  * REST는 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기에 웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일
  * REST는 네트워크 상 Client와 Server 사이의 통신 방식 중 하나.

Rest는 HTTP URI(Uniform Resource Identifier)를 통해 자원을 명시하고, HTTP METHOD를 통해 해당 자원에 대한 CRUD operation을 적용하는 것을 의미

* REST는 자원 기반의 구조(ROA, Resource Oriented Architecture) 설계의 중심에 Resource가 있고, HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍쳐를 의미한다.
* 웹 사이트 이미지, 텍스트, DB 내용 등 모든 자원에 고유한 ID인 HTTP URI를 부여한다.

### 1-0 사용 이유

* 어플리케이션 분리 및 통합
* 다양한 클라이언트의 등장
* 모바일 디바이스에서도 통신 가능
* 멀티 플랫폼에 대한 지원을 위한 아키텍처

### 1-1 REST 구성 요소

#### 1-1-1 자원(Resource) : URI

* 모든 자원에 고유한 ID가 서버에 존재한다.
* 자원을 구별하는 ID는 `/groups/:group_id` 와 같은 HTTP URI
* client는 URI를 이용해서 자원을 지정하고, 해당 자원의 상태에 대한 조작을 서버에 요청한다.

#### 1-1-2 행위(Verb) : HTTP Method

* HTTP 프로토콜의 Method를 사용한다(GET, POST, PUT, DELETE, PATCH)
  
#### 1-1-3 표현(Representation of Resource)

* 클라이언트가 자원의 상태(정보)에 대한 조작을 요청하면, 서버는 이에 적절한 응답(Representation)을 보낸다.
* REST에서 하나의 자원은 JSON, XML 등 여러 형태의 Representation 으로 나타나 질 수 있다.
* JSON 혹은 XML을 통해 데이터를 주고 받는 것이 일반적이다.

### 1-2 REST 특징

### 1-2-1 Server-Client 구조

* 자원이 있는 쪽이 Server, 자원을 요청하는 쪽이 Client
* 서버는 API를 제공하고, 비즈니스 로직 처리 및 저장을 책임진다.
* Client는 사용자 인증, context(세션, 로그인 정보) 등을 직접 관리하고 책임진다
* 이런 구조로 인해 서로 간 의존성이 줄어들고, 독립적인 개발이 가능하다.

### 1-2-2 stateless

* HTTP는 Stateless Protocol 이므로 REST 역시 무상태성을 갖는다.
* Client의 context를 Server에 저장하지 않아도 된다.
* Server는 각각의 요청을 별개의 것으로 인식하고 처리한다.
  * API 서버는 Client의 요청만을 처리한다.
  * Server 처리 방식에 일관성을 부여하여 부담이 줄고, 서비스 자유도가 높아진다.

### 1-2-3 Cacheable (캐시처리 가능)

* 웹 표준 HTTP protocol을 사용하므로 기존 인프라를 사용하기에, 웹 캐싱이 가능하다. (Last-Modified나 E-tag를 활용)
* 대량의 요청을 효율적으로 처리하기 위해 캐시를 사용하고, 빠른 처리가 가능할 뿐만 아니라 Rest Server Transaction이 발생하지 않기에 효율적인 처리가 가능해진다.

### 1-2-4 Layered System

* Client는 REST API만 호출한다.
* Rest server는 다중 계층으로 구성될 수 있는데, API Server는 순수 비즈니스로직만을 수행하고, 그 앞단에 보안, 로드밸런싱, 암호화, 인증 등을 추가하여 구조상 유연성을 줄 수 있다.
* Proxy, gateway와 같은 네트워크 기반의 중간 매체를 사용할 수 있다.

### 1-2-5 Uniform Interface

* URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행한다.
* HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하기에 특정 언어나 기술에 종속되지 않는다.

### 1-3 Rest API : Representational State Transfer API

#### 1-3-1 API(Application Programming Interface)

데이터와 기능의 집합을 제공하여 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환 가능 하도록 하는 것

Rest API는 REST 기반으로 서비스 API를 구현한 것이다.

#### 1-3-2 REST API 특징

* REST 기반으로 시스템을 분산해 확장성, 재사용성을 높여 유지보수 및 운용에 유리하다
* REST가 HHTP 표준을 기반으로 구현하기에 HTTP를 지원하는 프로그램 언어로 클라이언트, 서버를 구현할 수 있다.

#### 1-3-3 REST API 설계 기본 규칙

* 도큐먼트 : 객체 인스턴스, 데이터 베이스 레코드와 유사
* 컬렉션 : 섭어ㅔ서 관리하는 디렉터리(리소스)
* 스토어 : 클라이언트에서 관리하는 리소스 저장소

##### 1) URI는 정보의 자원을 표현해야 한다

* resource는 명사, 소문자를 사용해야 한다
* resource의 document 이름으로는 단수명사를, 컬렉션과 스토어의 이름으로는 복수 명사를 사용해야 한다.
* `GET /members/1`

##### 2) 자원에 대한 행위는 HTTP Method로 표현한다

* URI에 HTTP method가 들어가서는 안된다.
  * `GET /members/delete/1 => DELETE /members/1`
* URI에 행위에 대한 동사 표현이 들어가면 안된다(CRUD 기능과 관련된 동사는 사용하지 않는다.)
  * `GET /members/show/1 => GET /members/1`
  * `GET /members/insert/2 => POST /members/2`

##### 3) 슬래시 구분자 (/) 는 계층 관계를 나타낼 때 사용한다.

`http://restapi.example.com/houses/apartments`

##### 4) URI 마지막 문자로 슬래시를 포함하지 않는다.

* URI에 포함되는 모든 글자는 리소스 유일한 식별자로 사용되야 한다.

##### 5) 하이픈 사용은 지양하되, 가독성을 높일 때만 사용한다.

##### 6) 언더바 (_) 사용은 자제한다.

##### 7) URI 경로에 최대한 소문자를 사용한다.

##### 8) 파일 확장자는 URI에 포함하지 않는다.

### 1-4 RESTful의 개념

RESTful은 일반적으로 REST라는 아키텍처를 구현하는 웹 서비스를 나타내기 위해 사용되며, REST 규칙을 준수하여 만든 웹 서비스를 `RESTful`하다고 이야기 한다.

RESTFUL 한 API를 만드는 이유는 이해하기 쉽고, 사용하기 쉬우며, 이해도 및 호환성을  웹 서비스를 구축하기 위함이지, 성능 향상을 목적으로 하는 것은 아니다.


### 1-1 장점

* HTTP 프로토콜 인프라를 그대로 사용하므로 REST API를 사용하기 위한 별도의 인프라를 구축할 필요가 없다
* HTTP 프로토콜의 표준을 최대한 활용하여 여러 추가적인 장점을 함께 가져갈 수 있다.
* HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
* Hypermedia API 기본을 준수하며 범용성을 보장한다.
* REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.
* 여러가지 서비스 디자인에서 생길 수 있는 문제점을 최소화 할 수 있다.
* 서버와 클라이언트의 역할을 명확하게 분리한다

### 1-2 단점

* 표준이 존재하지 않는다.
* 사용할 수 있는 메소드가 제한적이다
* 구형 브라우저에서 아직 지원해주지 못하는 것들이 존재한다.

## 2. Node.js http module

### 2-1 req

### 2-2 res

## Rest API

## Content-type & Header

