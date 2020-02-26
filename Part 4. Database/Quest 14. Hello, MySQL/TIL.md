# Quest 14. Hello, MySQL

## 1. What is RDBMS?

### 1.0 What is Database?

### 1.1 What is MySQL?

#### 1.1.1 MySQL Enginens

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
| TINYINT  |  1   | -128 / 0 | 127 / 255 |
| SMALLINT | 2 | -32768 / 0 | 32767 / 65535 |
| MEDIUMINT | 3 | -8388608 / 0 | 8388607 / 16777215 |
| INT(INTEGER) | 4 | -2^31 / 0 | 2^31 -1 / 2^32-1 |
| BIGINT | 8 | -2^63 / 0 | 2^63 + 1 / 2^
| FLOAT | 4 |
| DOUBLE(REAL) | 8 |


### 1.2 What is Indexing?

## 2. SQL Query

### 2.1 Create

### 2.2 Read

### 2.3 Update

### 2.4 Delete

## 3. Hashing

### 3.1 Data Structure related Hashing

### 3.2 Hashing Algorhythm

