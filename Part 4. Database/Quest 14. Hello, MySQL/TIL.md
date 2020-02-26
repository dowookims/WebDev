# Quest 14. Hello, MySQL

## 1. What is RDBMS?

### 1.0 What is Database?

### 1.1 What is MySQL?

#### 1.1.1 MySQL Enginens

##### InnoDB

InnoDB는 높은 신뢰성과 고성능 사이의 밸런스를 가지고 있는 범용 스토리지 엔진이다.  
MySQL 8.0 버전에서 `MyISAM` 을 제치고 MySQL 테이블의 default type으로 지정되었다.

InnoDB 테이블은 Primary key를 기반으로 쿼리를 최적화하기 위해 디스크의 데이터를 할당한다. 각 InnoDB 테이블에는 데이터를 정리하여 Primary Key 조회를 위한 I/O를 최소화하는 clustered index라는 primary key index가 있다.

* Transactional-safe (ACID)
  * Atomicity
    * 트랜잭션 작업이 부분적으로 실행되거나 중단되지 않는 것을 보장 (All or Nothing)
  * Consistency
    * 트랜잭션 작업이 시작되지 전에 데이터베이스 상태가 일관된 상태였다면 트랜잭션 작업이 종료된 후에도 일관성 있는 데이터 베이스 상태를 유지해아한다.
  * Isolation
    * 트랜잭션 작업 수행 중에는 다른 트랜잭션에 영향을 주어서도 안되고, 다른 트랜잭션들에 의해 간섭을 받아서도 안 된다
  * Durability
    * 일련의 데이터 조작(트렌젝션 조작)을 완료 하고 완료 통지를 사용자가 받는 시점에서 그 조작이 영구적이 되어 그 결과를 잃지 않는 것을 나타낸다
  
* commit, rollback, recovery, row-level locking, foreign key를 지원한다.
* 제약조건, FK, PK 등으로 인해 데이터 무결성에 대한 보장이 된다.
* row level lock(행 단위)을 하기에, 쓰기, 변경 작업이 빠르다.
* 데이터 모델 디자인에 많은 시간이 필요하다.
* Full text search를 지원한다.
* ordering 가능

##### MyISAM

* non-transactional-safe 테이블을 관리한다.
* non-acid compliant
* 데이터 무결성이 보장되지 않는다.
* Full text index를 통한 search를 지원한다.
* Table level lock을 사용하기에 쓰기 작업에서 속도가 느리다.
* 읽기 위주 작업에 주로 사용된다.
* 한번에 대량의 데이터를 입력하는 배치성 테이블에 적합하다.

##### Memory

* Memory storage engine (known as HEAP)은 콘텐츠들을 메모리에 저장하는 특수 목적의 테이블을 생성한다. 이 테이블은 임시 작업 영역 또는 다른 테이블에서 가져온 데이터의 읽기 전용 캐시로만 사용한다.

##### CSV

* comma-separated values format을 사용하는 텍스트 파일을 저장할 때 사용하는 스토리지 엔진.

##### Archive

* 인덱싱되지 않은 대량의 데이터를 매우 작은 공간에 저장하는 특수 목적 테이블을 생성한다.

##### Etc

* Merge
* Blackhole
* Federated

#### 1.1.2 MySQL Data Type

##### 문자열

- CHAR : `CHAR(n)` 으로 스트링 데이터 타입을 지정 할 수 있다.  
`n <= 65535`  
`n`만큼의 메모리를 지정하기 때문에, 이 데이터 타입을 쓰는 변수가 n 만큼의 크기를 갖지 않더라도 공백으로 빈 칸을 채운다.  
해당 변수의 크기를 줄이는 작업이 없기 때문에 varchar보다 오버헤드가 적게든다.

- VARCHAR : VARiable length CHARacter string으로, `varchar(n)`로 스트링 데이터 타입을 지정 할 수 있다.  
`n <= 255`  
`char`와 다르게, 지정한 크기보다 작은 string의 경우 할당된 n만큼 값을 차지하는게 아니라, 그 string의 크기 만큼 메모리를 차지한다. 그렇기에 char보다 overhead를 더 사용한다.

- TEXT : 필드의 기본 값(default)를 가질 수 없으며, TEXT를 인덱싱 할 때 `n`을 정의하는데, 이 `n`은 처음 `n`개의 문자만 인덱스 할 수 있음을 의미한다. 그렇기에, 필드 전체를 검색하는 로직이 있는 경우 `TEXT` 타입보다 `CHAR` 또는 `VARCHAR`를 사용하는게 더 나으며, 필드 앞에 몇 개의 글자만 검색하는 경우에는 `TEXT`를 사용하는 것도 좋다.

  - TINYTEXT(n) : 최대 n (<= 255)
  - TEXT(n) : 최대 n (<= 65535)
  - MEDIUMTEXT(n) : 최대 n (<= 16777215)
  - LONGTEXT(n) : 최대 n (<= 4294967295)

```
특정 텍스트 값이 저장 될 때, 그 해당 데이터의 텍스트 길이의 유동 폭이 크고, 메모리 관리가 중요 할 경우  
varchar를 쓰는게 더 효율적이고, 텍스트 길이의 유동 폭이 적고, 빠른 읽기 작업이 필요 할 경우 char를 쓰는게 더 나은 사용이다.
```

##### Binary 형

- BINARY : `BINARY(n)` 일반 텍스트와 관련 없는 문자의 전체 바이트를 저장하는데 사용한다.  
GIF와 같은 이미지를 저장하는데 사용되기도 하며, `n <= 255` 이다.

- VARBINARY : `BINARY`의 variable length를 가질 수 있는 값으로 최대 `n <= 65535` 크기의 값을 가질 수 있다.

- BLOB : Binary Large Object. 크기가 65535 바이트를 넘는 바이너리 데이터에 가장 유용하며, `BINARY`와 다른점은 기본 값을 가질 수 없다는 것이다.
  - TINYBLOB(n) : 최대 n (<= 255)
  - BLOB(n) : 최대 n (<= 65535)
  - MEDIUMBLOB(n) : 최대 n (<= 16777215)
  - LONGBLOB(n) : 최대 n (<= 4294967295)

##### 숫자형

float을 제외한 모든 수는 `signed`와 `unsigned`를 가지고 있다.
| datatype | byte | min value(signed / unsigned) | max value(signed / unsgined) |
|----------|------|------------------------------|------------------------------|
| TINYINT  |  1   | -2^7 / 0 | 2^7-1 / 2^8-1 | 
| SMALLINT | 2 | -2^15 / 0 | 2^15-1 / 2^16-1 |
| MEDIUMINT | 3 | -2^23 / 0 | 2^23-1 / 2^24-1 |
| INT(INTEGER) | 4 | -2^31 / 0 | 2^31-1 / 2^32-1 |
| BIGINT | 8 | -2^63 / 0 | 2^63-1 / 2^64-1 |
| FLOAT | 4 | -3.4E+38 | 3.4E + 38 |
| DOUBLE(REAL) | 8 | 1.7E+308 | 1.7E + 308 |

##### 날짜와 시간

| 데이터 타입 | 날짜 / 시간 형식 |
|----------|---------------|
|DATETIME|'0000-00-00 00:00:00'|
|DATE|'0000-00-00'|
|TIMESTAMP|'0000-00-00 00:00:00'|
|TIME|'00:00:00'|
|YEAR|0000 (0000, 1901 - 2155)|

```
DATETIME의 범위는 1000-01-01 00:00:00 to 9999-12-31 23:59:59.

TIMESTAMP의 범위는 1970-01-01 00:00:01 UTC to 2038-01-19 03:14:07 UTC.
```

### 1.2 What is Indexing?

## 2. SQL Query

### 2.1 Create

### 2.2 Read

### 2.3 Update

### 2.4 Delete

## 3. Hashing

### 3.1 Data Structure related Hashing

### 3.2 Hashing Algorhythm
