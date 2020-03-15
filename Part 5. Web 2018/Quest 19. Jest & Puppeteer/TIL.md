# Quest 19. Jest & Puppeteer

## TDD (Test Driven Development)

테스트 주도 개발로, 테스트가 개발을 이끌어 나간다는 것이다. 즉, 테스트 코드를 먼저 작성하고 그 테스트를 통과하기 위한 것을 짜는 것을 의미한다.  
추상적으로, 결정과 피드백 사이의 갭에 대한 인식, 더 나아가 결정과 피드백 사이의 갭을 조절하기 위한 테크닉이라고도 한다.

### Pros

* 보다 튼튼한 객체 지향적 코드 생산
* 디버깅 시간 단축
* 재설계 시간 단축
* 테스트 문서의 대체 가능
* 추가 구현 용이
* 코드의 결함이 감소

### Cons

* 생산성의 저하.
* 개발 시간 증가.

### Unit Test

단위 테스트(unit test)는 프로그램의 기본 단위인 모듈을 테스트하여 모듈 테스트(module test)라고도 한다. 전체 애플리케이션에서 떼어 내어 분리된 환경에서 테스트를 진행한다.  
단위테스트는 구현 단계에서 각 모듈의 개발을 완료한 후 개발자가 명세서의 내용대로 정확히 구현되었는지를 테스트한다. 즉 개별 모듈이 제대로 구현되어 정해진 기능을 정확히 수행하는지를 테스트한다. 화이트박스 테스트와 블랙박스 테스트를 모두 사용할 수 있지만 모듈 내부의 구조를 구체적으로 들여다볼 수 있는 화이트박스 테스트 같은 구조적 테스트를 주로 시행한다.

분리하여 테스트를 진행하기 때문에 하나의 모듈이나 클래스에 대해 세밀한 부분까지 테스트 할 수 있고, 더 넓은 범위를 테스트 하는 것 보다 훨씬 빠르게 실행 할 수 있다. 그러나 테스트는 의존성이 있는 모듈을 제어하기 위해 필연적으로 Mocking(모의 객체)를 사용 할 수 밖에 없으며 이 경우 각 모듈이 실제로 잘 연결되어 상호 작용하는지에 대해 검증하지 ㅁㅗㅅ한다. 또한 각 모듈의 사소한 API 변경에도 영향을 받기에 작은 단위의 리팩토링에도 쉽게 깨진다

### Integration Test

단위 테스트가 끝난 모듈을 통합하는 과정에서 발생할 수 있는 오류를 찾는 테스트가 통합 테스트(integration test)이다. 실제 업무에서는 단위 모듈이 개별적으로 존재하는 것이 아니고 여러 모듈이 유기적 관계를 맺고 있으므로 이러한 모듈들을 결합한 형태로 테스트를 수행해봐야 한다. 이때 주로 확인하는 것은 '모듈 간의 상호작용이 정상적으로 수행되는가'이다. 즉 모듈 사이의 인터페이스 오류는 없는지, 모듈이 올바르게 연계되어 동작하고 있는지를 체크한다

모듈 통합을 한꺼번에 하는 방법으로는 빅뱅(big-bang) 테스트를 들 수 있다. 빅뱅 테스트는 단위 테스트가 끝난 모듈을 한꺼번에 결합하여 수행하는 방식이다. 이 방법은 소규모 프로그램이나 프로그램의 일부를 대상으로 하는 경우가 많고 그만큼 절차가 간단하고 쉽다. 그러나 한꺼번에 통합하면 오류가 발생했을 때 어떤 모듈에서 오류가 존재하고 또 그 원인이 무엇인지 찾기가 매우 어렵다.

모듈 통합을 점진적으로 하는 방법은 모듈 통합을 한꺼번에 하는 방법의 문제를 극복하는 방법으로, 완성된 모듈을 기존에 테스트된 모듈과 하나씩 통합하면서 테스트한다. 문제가 발생하면 바로 직전에 통합하여 테스트한 모듈에서 오류가 발생했다고 짐작할 수 있으므로 오류를 찾기가 쉽다. 점진적 통합 방식은 가장 상위에 있는 모듈부터 테스트하는지, 가장 하위에 있는 모듈부터 테스트하는지에 따라 하향식 기법과 상향식 기법으로 나뉜다.

### E2E test ( End to End Test)

기능 테스트라고 불리는 테스팅 기법으로, 끝에서 끝까지 테스트한다. 사용자가 직접 애플리케이션을 사용하는 것처럼 동작하도록 스크립트를 작성하고 이것을 실제 실행시켜보면서 기대한대로 동작하는지 검증한다.

사용자 관점에서 테스트를 진행하며, 사용자가 움직일거라 예상하는 시나리오를 매크로 처럼 스크립트를 작성해서 브라우저 내에서 자동으로 실행하여 테스트를 진행한다.

사용자의 실행 환경과 거의 동일한 환경에서 테스트를 진행하기 때문에 실제 상황에서 발생할 수 있는 에러를 사전에 발견할 수 있다는 장점이 있다. 특히 브라우저를 외부에서 직접 제어할 수 있어 자바스크립트의 API만으로는 제어할 수 없는 행위(브라우저 크기 변경, 실제 키보드 입력 등)를 테스트할 수도 있다. 또한 테스트 코드가 실제 코드 내부 구조에 영향을 받지 않기 때문에 큰 범위의 리팩토링에도 깨지지 않는다.

단위 테스트나 통합 테스트에 비해 테스트의 실행 속도가 느리기 때문에 개발 단계에서 빠른 피드백을 받기가 어려우며, 세부 모듈들이 갖는 다양한 상황들의 조합을 고려해야 하기 때문에 테스트를 작성하기가 쉽지 않다는 단점이 있다. 또한 큰 단위의 기능을 작은 기능으로 나누어 테스트할 수가 없기 때문에 필연적으로 테스트 사이에 중복이 발생할 수밖에 없다. 게다가 통제된 샌드박스 환경에서의 테스트가 아니기 때문에 테스트 실행 환경의 예상하지 못한 문제들(네트워크 오류, 프로세스 대기로 인한 타임아웃 등)로 인해 테스트가 가끔 실패하는 일이 발생하며, 이 때문에 테스트를 100% 신뢰할 수 없는 문제가 발생하기도 한다.

### Stub & Mock

#### Stub

* 객첵가 마치 실제로 동작하는 것 처럼 보이게 만들어 놓은 객체이다.
* 객체의 특정 상태를 가정하여 특정 값을 리턴해 주거나 특정 메시지를 출력해 주는 작업을 한다.
* 특정 상태를 가정해서 하드코딩된 형태이므로 로직에 따른 값의 변경은 테스트 할 수 없다.
* 어떤 행위(method)가 호출됐을 때 특정 값으로 리턴시켜주는 형태를 Stub이라 한다.
* 상태를 검증하는데 사용된다.

#### Mock

* 단위 테스트를 하기 위해 메서드를 실행하는데, 메서드가 네트워크 또는 데이터베이스 등 비동기에 의존하고 있을 때 단위 테스트를 하기 어렵다. 이 문제를 해결하기 위해 등장한 개념이 `Mock`이다.  

* Mock은 실제 객체를 만들기엔 비용과 시간이 많이 들거나 의존성이 길게 걸쳐져 있어 제대로 구현하기 어려울 경우, 가짜 객체를 만드는데 이 때 각자 객체를 Mock 이라 부른다.

* 테스트 작성을 위한 환경 구축이 어려운 경우에 사용된다.

* 테스트가 특정 경우나 순간에 의존적인 경우에 사용된다.

* Mock은 행위를 검증 할 때 주로 사용된다.

#### Test spy

* 테스트에 사용되는 객체, 메소드의 사용 여부 및 정상 호출 여부를 기록하고 요청시 알려준다.

#### Dummy Object

인스턴스화 될 수 있는 수준으로써의 객체로, 인스턴스화된 객체가 필요할 뿐 해당 객체의 기능까지 필요하지 않은 경우에 사용한다.

행위를 검증한다.

## Jest

### Javascript test framework

* Jest
* Mocha
* Jasmine


## Puppeteer
