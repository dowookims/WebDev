# Quest 15. ORM

## ORM

### 1. ORM 이란

ORM (Object Relational Mapping)은 객체지향 프로그래밍 언어를 사용하여 호환되지 않는 유형 시스템 간에 데이터를 변환하는 프로그래밍 기법이다.  
이는 사실상, 프로그래밍 언어 내에서 사용될 수 있는 가상 객체 데이터 베이스를 생성한다.

```SQL
SELECT * FROM users WHERE email = 'test@test.com';
```

ORM은 위의 쿼리문을 Object oriented paradigm을 활용하여, 개발자가 선호하는 언어로 쿼리를 작성하게 해주는 기술이다.  
즉, 개발자가 데이터베이스와 상호작용 할 때, SQL을 사용하는게 아닌, 우리가 선택한 개발 언어로 작업 할 수 있게 해준다.

```js
const orm = require('generic-orm-library');
const user = orm("users").where({ email: 'test@test.com' });
```

[What is an ORM and Why You Should Use it](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a)

### 2. ORM pros and cons

#### pros

* SQL에 익숙하지 않은 개발자들이, 개발 언어로 직관적으로 데이터베이스와 상호작용 할 수 있게 해준다.
* 선언문, 할당, 종료 같은 부수적인 코드들이 줄어든다.
* 객체에 대한 코드를 별도로 작서앟기 때문에 코드의 가독성을 올려준다.
* 데이터베이스 시스템을 추상한 라이브러리를 사용함으로써, 사용하는 라이브러이에 등록된 데이터 베이스로 교체 할 때 데이터 베이스 쿼리와 관련된 로직은 수정 할 필요없이, 데이터 베이스 정보만 수정함으로써 손쉽게 교체 할 수 있다.
* connection pooling, migrations, transactions, streams 등 다양한 데이터 베이스 로직을 캡슐화 하기 때문에 이를 개발자가 직접 구현하지 않아도 된다.
* 이미 잘 작성된 쿼리문들이 존재하기 때문에, 실제 SQL 전문 개발자가 아닌 비 숙력된 개발자들 보다 효율적인 쿼리를 작성해준다.

#### cons

* SQL에 숙련된 개발자라면 이보다 라이브러리에서 사용하는 쿼리보다 더 효율적인 쿼리를 작성 할 수 있다.
* ORM을 사용하면서 캡슐화된 로직을 사용하다 보니, 그 밑에(데이터 베이스 내부에서) 처리되는 로직에 대해 이해하지 못할 수 있다.
* 대형 쿼리 작성의 경우 별도의 튜닝이 필요하다.
* 프로시저가 많은 시스템에서는 ORM의 객체 지향적인 장점을 활용하기 어렵다.

### 3. ORM Query

#### CREATE

```js
Model.create({
    username: 'dowoo',
    job: 'FED',

// INSERT INTO Model (username, job) VALUES (dowoo, FED);
})


```

#### READ

```js
Model.findAll({
    attributrs: ['foo', 'bar']
});
// SELECT foo, bar from model;
```

```js
Model.findAll({
  attributes: ['foo', ['bar', 'baz']]
});
// SELECT foo, bar as baz from 'model';
```

```js
Post.findAll({
  where: {
    authorId: 2
  }
});
// SELECT * FROM post WHERE authorId = 2
```

#### UPDATE

```js
Model.update({
    { job: 'Front-end'},
    { where: { name: 'dowoo' }}
});

// UPDATE Model SET job = 'Front-end' WHERE name = 'dowoo';
```

#### DELETE

```js

Model.destory({
    where: { name: 'dowoo'}
})

// DELETE FROM Model WHERE name = 'dowoo';
```

### 4. ORM relation

#### 1:1 RelationShip

한 객체와 다른 객체간의 관계가 1:1 관계임을 의미한다. 두 객체 모두 다른 객체를 포함, 소유한다고 볼 수 있다.  
ex) 개인 - 주민등록 번호 / 결혼(일처일부제) / 국가 - 깃발

#### 1:N (One-To-Many) RelationShip

한 객체가 다른 객체 여럿을 소유하고 있는 관계를 의미한다.  
ex) 사용자 - 게시물 / 박물관 - 전시작품

#### M:N (Many-To-Many) RelationShip

두 객체간 상대 객체 여럿을 가질 수 있는 관계를 의미한다.  
ex) 학생 - 수업
