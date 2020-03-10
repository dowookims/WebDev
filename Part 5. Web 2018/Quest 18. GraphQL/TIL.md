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

![rest api vs gql api](http://tech.kakao.com/files/graphql-mobile-api.png)

## 2. GraphQL API

### 0) What is GraphQL

Grah QL(GQL)은 페이스북에서 만든 어플리케이션 레이어 쿼리 언어이다. GQL은 웹 클라이언트가 데이터를 서버로 부터 효율적으로 가져오는 것을 목적으로 한다. 특정한 데이터베이스나 스토리지 엔진과 관계되어 있지 않으며 기존코드와 데이터에 의해 대체된다.

서버사이드 gql 어플리케이션은 gql로 작성된 쿼리를 입력으로 받아 쿼리를 처리한 결과를 다시 클라이언트로 돌려준다. HTTP API 자체가 특정 데이터베이스나 플렛폼에 종속적이지 않은것 처럼 마찬가지로 gql 역시 어떠한 특정 데이터베이스나 플렛폼에 종속적이지 않다.

REST API가 URL, METHOD를 조합하기에 다양한 end point가 존재하는데, gql은 단 하나의 EndPoint가 존재하며, gql API에서 불러오는 데이터의 종류를 쿼리 조합을 통해서 결정한다. REST API는 각 EndPoint에서 SQL 쿼리가 달라진다면, gql API는 gql 스키마의 타입마다 database query가 달라진다.

### 1) Intro GQL

gql 서비스는 타입과 필드를 정의하고, 각 타입의 필드에 대한 함수로 구현된다.

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

```js
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

gql 서비스가 실행되면 gql 쿼리를 전송하여 유효성을 검사하고 실행할 수 있다. 수신된 쿼리는 먼저 정의된 타입과 필드만 참조하도록 검사한 다음, 함수를 실행하여 결과를 생성한다.

```graphql
{
    me {
        name
    }
}
```

이 결과는 다음과 같다

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

### 2) Schema

gql 서비스는 언어 종속적이지 않다.

#### type

gql 스키마의 가장 기본적인 구성 요소는 개체 타입이다. 객체 타입은 서비스에서 가져올 수 있는 객체 종류와 그 객체의 필드를 나타낸다.

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

* Character는 GraphQL 객체 타입이다. 필드가 있는 타입을 의미한다. 스키마의 대부분의 타입은 객체 타입이다.
* `name`과 `appearIn`은 `Character` 타입의 필드이다.
* `String`은 내장 *스칼라* 타입 중 하나이다. 스칼라 객체로 해석되는 타입이며, 쿼리에서 하위 선택을 할 수 없다.
* `String!` 은 필득가 non-nullable을 의미한다.
* `[Episode]!` 는 `Episode` 객체의 배열을 의미하며, non-nullable이기에 apperaIn 필드 쿼리를 할 때 항상(0개 이상의 아이템을 가진) 배열을 기대할 수 있다.

#### 인자

gql 객체 타입의 모든 필드는 0개 이상의 인수를 가질 수 있다.

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

모든 인수에 이름이 있듯이, gql의 모든 인자는 특별한 이름으로 전달된다. 이 경우 length 필드는 하나의 인자 unit을 가진다.

인자는 필수이거나 옵셔널일 수 있다. 인자가 옵셔널일 경우 default를 정의할 수 있으며 위에서는 unit 인자가 전달되지 않으면 METER로 설정된다.

#### 쿼리 & 뮤테이션 타입

스키마 대부분의 타입은 일반 객체 타입이지만 스키마 내에는 특수한 두 가지 타입이 있다.

```graphql
schema {
    query: Query
    mutation: Mutation
}
```

모든 GraphQL 서비스는 query 타입을 가지며 mutation 타입은 가질 수도 있고 가지지 않을 수도 있다. 이러한 타입은 일반 객체 타입과 동일하지만 모든 GraphQL 쿼리의 진입점(entry point) 을 정의하므로 특별하다다. 따라서 다음과 같은 쿼리를 볼 수 있다.

```graphql
query {
    hero {
        name
    }
    droid(id: '2000) {
        name
    }
}
```

즉, GraphQL 서비스는 hero 및 droid 필드가 있는 Query 타입이 있어야한다.

```graphql
type Query {
    hero(episode: Episode): Character
    droid(id: ID!): Droid
}
```

#### 스칼라 타입

GraphQL 객체 타입은 이름과 필드를 가지지만, 어떤 시점에서 이 필드는 구체적인 데이터로 해석되어야한다. 이것이 스칼라 타입이 필요한 이유입니다. 즉, 쿼리의 끝을 나타낸다.

```graphql
{
  hero {
    name
    appearsIn
  }
}
```

해당 필드에 하위 필드가 없기 때문에 이를 알 수 있고, 이 필드는 쿼리의 끝 부분이다.  
gql은 스칼라 타입들이 기본 제공되는데
* Int
* Float
* String
* Boolean
* ID

이다.

#### 열거형 타입

`Enums`라는 열거형 타입은 특정 값들로 제한되는 특별한 종류의 스칼라이다. 이를 통해 다음과 같은 작업을 할 수 있는데,

1. 타입의 인자가 허용된 값 중 하나임을 검증한다.
2. 필드가 항상 값의 열거형 집합 중 하나가 될 것임을 타입 시스템을 통해 의사소통한다.

```graphql
enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
}
```

#### 인터페이스

이를 구현하기 위해 타입이 포함해야하는 특정 필드들을 포함하는 추상 타입이다.

```graphql
interface Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
}
```

이는 Character를 구현한 모든 타입은 이런 인자와 리턴 타입을 가진 정확한 필드를 가져야한다는 것을 의미한다.

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

### 3) Resolver

query에서 특정 필드에 대한 요청이 있을 때, 그것을 어떤 로직으로 처리할지 gql에게 알려주는 역할을 수행한다.

Resolver는 함수의 collection으로 gql query에 대한 응답을 생성한다. 즉, resolver는 gql query hanlder 역할을 수행한다. gql 스키마에서 모든 resolver는 아래 4개의 인수를 받는다.

`fileName: (root, args, context, info) => { result }`

* root : 연쇄적 리졸버 호출에서 부모 리졸버가 리턴한 객체이다. 이 객체를 활용해서 현재 리졸버가 내보낼 값을 조절 할 수 있다.
* args : 쿼리에서 입력으로 넣은 인자
* context: 모든 리졸버에게 전달이 된다. 주로 미들웨어를 통해 입력된 값들이 들어있다. 로그인 정보 혹은 권한과 같은 주요 컨텍스트 관련 정보를 가지고 있다.
* info : 스키마 정보와 더불어 현재 쿼리의 특정 필드 정보를 가지고 있다.

### 4) DataLoader

[GraphQL 개념잡기](https://tech.kakao.com/2019/08/01/graphql-basic/)  
[graphql kr](https://graphql-kr.github.io/learn/execution/)