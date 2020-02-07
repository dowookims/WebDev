# Quest 12. AJAX(Asynchronous Javascript And XML)

## 어떠한 자바스크립트 코드가 HTTP 응답이나 사용자의 이벤트등에 종속되어 언제 실행되어야 할 지 알기 어려울 때엔 어떻게 해야 할까요?

HTTP응답은 네트워크의 속도와 request의 수신 및 처리, request에 대한 비즈니스 로직 및 서버 내 로직, 이에 대한 응답등으로 인해 언제 클라이언트의 요청에 대한 응답을 받을 수 없다.

사용자의 이벤트에 종속되어 있는 경우, 클라이언트를 구축 할 때 이벤트 리스너 등을 통해 특정 이벤트에 그에 맞는 반응을 등록 해 두고, 사용자가 그 이벤트를 점화 했을 때만 자바스크립트 코드들이 실행되기 때문에 그 시점에 대해 예측한다는 것은 거의 불가능 하다고 볼 수 있다.

그렇기에 자바스크립트는 이 시점을 정확히 예측하기 보다는, 네트워크 및 사용자의 행위에 대해 이벤트를 등록(callback 을 통해) 해 두고, 그 이벤트들이 점화 될 때 특정한 요청들을 처리하는 방식을 이해하는게 위의 질문을 해결하는 키 포인트가 될 것이다.

자바스크립트의 경우 싱글 스레드 기반 언어이기 때문에, 이런 네트워크와 관련된 요청을 동기적으로 작업하게 되면, 즉시 처리되는 요청같은 경우는 사용자에게 불편함을 주지 않지만 그렇지 않은 경우 클라이언트에서 작업을 처리하기 위해 다른 작업이 중단 될 수 있다. 

그래서 브라우저 에서는 이런 작업들을 처리하기 위한 몇가지 장치들이 존재하는데, 이 때 사용되는 장치들이 이벤트 루프와 태스크 큐 등이 있다.

V8과 같은 자바스크립트 엔진은 단일 호출 스택(Call Stack)을 사용하며, 요청이 들어 올 때마다 해당 요청을 순차적으로 호출 스택에 담아 처리한다. 단일 호출 스택을 사용하며, pop을 통해 호출 스택에 있는 요청을 처리한다면 비동기 요청 및 동시성에 대한 처리는 불가능 해 진다. 그러나 자바스크립트 엔진들은 이 문제들을 해결 해내는데, 이는 바로 자바스크립트 엔진을 구동하는 환경인 브라우저나 Node.js가 담당한다.

![javascript env](https://image.toast.com/aaaadh/real/2018/techblog/b1493856379d11e69c16a9a4cf841567.png)

* 비동기 호출을 위해 사용하는 `setTimeOut`이나 `XMLHttpRequest` 함수들은 JS Engine이 아닌 Web  API 영역에 따로 저장되어 있다.
* 이벤트 루프나 태스크 큐와 같은 장치도 JS Engine 외부에 구현되어 있다.
* 이벤트 루프는 자바스크립트 코드를 싱행하기 위해 자바스크립트 엔진을 이용한다. 자바 스크립트 엔진에는 이벤트 루프를 관리하는 코드가 없으며, Node.js나 브라우저가 이벤트 루프를 담당한다.
* 이벤트 루프는 task를 담아놓는 스택이 존재하지 않는다. 그리고 이벤트 루프가 작동하는 과정은 여러 개의 큐를 사용하는 복잡한 과정이다.
* 자바스크립트 환경은 단일 스레드로 코드의 실행 및 이벤트 루프를 담당한다.

![Node js Env](https://image.toast.com/aaaadh/real/2018/techblog/Bt5ywJrIEAAKJQt.jpg)

[ 참고자료 - Toast meet up 김동우님 자료](https://meetup.toast.com/posts/89)

* Node.js는 비동기 IO를 지원하기 위해 libuv 라이브러리를 사용하며, 이 라이브러리가 이벤트 루프를 제공한다.
* JS 엔진은 비동기 작업을 위해 Node.js의 API를 호출하고, 이 때 넘겨진 `callback`은 libuv의 이벤트 루프를 통해 스케쥴되고 실행된다.

### Run To Completion

자바스크립트의 특징 중 하나는, `Run-to-Completion`인데, 각 태스크는 다른 태스크가 완료된 후에 실행되거나, 명시적으로 스케쥴러에게 컨트롤을 반환하는 스케쥴링 모델을 의미한다. 이는 OS에서 말하는 비선점 스케쥴링과 유사하다. 이는, 자바스크립트 엔진은 하나의 호출 스택을 사용하며, 스택에 쌓여있는 모든 함수들이 실행을 마치고 스택에서 제거되기 전 까지 다른 어떤 함수도 실행 될 수 없음을 의미한다.

여기서 핵심은, 자바스크립트가 `싱글 스레드 기반의 언어` 라는 것은 자바스크립트 엔진이 단일 호출 스택을 사용한다는 관점에서만 사실이라는 것이다. 실제 자바스크립트가 구동되는 환경(Node.js, Browser)의 경우 여러 개의 스레드가 사용되며, 구동 환경이 단일 호출 스택을 사용하는 JS 엔진과 상호 연동하기 위해 사용하는 장치가 `Event Loop`이다.

### Event loop

개발자가 `setTimeout`이나, `XMLHttpRequest`, `fetch`등을 사용하여 비동기 요청을 처리하는 로직을 짰다고 가정하자. 여기서 자바스크립트를 해석하면서, 이를 실행할 때, 순차적으로 콜스택에 담기게 되고, 실행된다. 실행된 함수 들 중 `setTimeout`, `XMLHttpRequest` 함수 같은 경우 브라우저에게 타이머, AJAX 이벤트를 요청한 후 바로 스택에서 제거 된다. 이 때, 함수에 포함된 콜백 함수들은 즉시 사라지지 않고 `Task Queue`라는, 콜백 함수들이 대기하는 큐 형태의 배열에 들어가게 된다. 그리고 이벤트 루프는 호출 스택이 비워질 때마다 큐에서 콜백 함수를 꺼내와서 실행하는 역할을 한다.

```js
// why event loop?
while(queue.waitForMessage()){
  queue.processNextMessage();
}
```

위 코드의 `waitForMessage()` 메소드는 현재 실행중인 태스크가 없을 때, 다음 태스크가 큐에 추가될 때 까지 대기하는 역할을 한다. 이렇게 이벤트 루프는 `현재 실행중인 태스크가 없는지` 와 `태스크 큐에 태스크가 있는지`를 반복적으로 확인한다. 이를 정리하자면

* 모든 비동기 API들은 작업이 완료되면 콜백 함수를 태스크 큐에 추가한다
* 이벤트 루프는 현재 실행중인 태스크가 없을 때(콜 스택이 비워졌을 때) 태스크 큐의 첫 번째 태스크를 꺼내와 실행한다.
* 태스크 큐는 `FIFO`에 의해 동작되므로, 비동기 함수에서(Promise 등 micro task queue를 사용하는 것 제외) 우선적으로 동작하는 함수는 없다.

#### Structure of Event loop

![Structure of Event loop](https://evan-moon.github.io/2019/08/01/nodejs-event-loop-workflow/nodejs-event-loop-phase.png)

위 그림은 이벤트 큐의 구조인데, 각 페이즈들은 각자 하나의 큐를 가지고 있으며 자바스크립트의 실행은 이 페이즈 들 중 `Idle, prepare`페이즈를 제외한 어느 단계에서나 일어날 수 있다.

`nextTickQueue`와 `microTaskQueue`는 이벤트 루프의 일부가 아니며, 이 큐들에 들어있는 작업 또한 어떤 페이즈에서든 실행 될 수 있으며, 이 큐 들에 있는 작업은 가장 높은 우선 실행 순위를 가지고 있다.

* Timer phase
  * 이벤트 루프의 시작을 알리는 페이즈.
  * 이 페이즈가 가지고 있는 큐에서는 `setTimeout`이나 `setInterval`과 같은 타이머들을 콜백에 저장한다.
  * 이 페이즈에서 `타이머들의 콜백`이 큐에 들어가는 것은 아니나, `타이머`들을 `min-heap`으로 가지고 있다가 실행 할 때가 된 타이머들의 콜백을 태스크 큐에 넣고 실행한다.

* Pending i/o callback phase
  * 이벤트 루프의 `pending_queue`에 들어있는 콜백들을 실행한다.
  * 이 queue에 들어와있는 콜백들은 현재 돌고 있는 루프(이벤트 루프) 이전에 한 작업에서 이미 큐에 들어와있던 콜백들이다.
  * 에러 핸들러 callback 및 fileWrite 등

* Idle, Prepare phase
  * Idle phase는 매 Tick 마다 실행되며 Prepare phase는 매 Polling마다 실행된다.

* Poll phase
  * 새로운 수신 커넥션(새로운 소켓 설정 등)과 데이터(파일 읽기 등)을 허용한다. 또한
    * 만약 `watch_queue`(Poll phase가 가지고 있는 queue)가 비어있지 않다면, queue가 비거나, 시스템 최대 실행 한도에 다다를 때 까지 동기적으로 모든 콜백을 실행한다.
    * `watch_queue`가 비어있다면, Node.js는 바로 다음 페이즈로 넘어가는게 아니라 약간 대기 시간을 가지게 된다.
  
* Check phase
  * `setImmediate`의 콜백을 위한 페이즈이다. 

* Close phase
  * `close`이벤트 타입의 핸들러들을 처리한다.

* nextTickQueue & microTaskQueue
  * nextTickQueue는 process.nextTick() API의 콜백들을 가지고 있다.
  * microTaskQueue는 Resolve된 promise의 콜백을 가지고 있다.

![work flow of event loop](https://evan-moon.github.io/2019/08/01/nodejs-event-loop-workflow/nodejs-event-loop-workflow.png)

`test.js`를 콘솔에서 실행시켰을 때, Node.js는 이벤트 루프를 생성한 다음, 이벤트 루프 바깥에서 메인 모듈인 `test.js`를 실행한다.

한번 메인 모듈이 실행되고 나면, JS 환경(Node, Browser)는 이벤트 루프가 활성 상태인지, 이벤트 루프안에서 해야 할 작업이 있는지 확인하다. 만약 이벤트 루프를 돌릴 필요가 없으면 이벤트 루프를 종료 할 것이다. 그러나 이벤트 루프를 돌려야 할 상황이라면 Node.js는 이벤트 루프의 첫 번째 페이즈인 `Timer phase`를 실행한다.

##### Timer Phase

이벤트 루프가 `Timer phase`에 들어가게 되면 실행할 타이머 콜백 큐에 뭐가 있는지 확인하기 시작한다. 타이머 스크립트는 오름차순으로 힙에 저장한다(min heap) 그래서 부모 타이머들을 하나씩 까서 `now - registeredTime === delta` 같은 조건을 통해 타이머의 콜백을 실행할 시간이 되었는지 검사하게 된다.

* delta 는 `setTimeout(() => {}, 10)`에서 `10ms`

만약 조건에 해당되면, 타이머의 콜백을 실행하고 다음 타이머를 확인하며, 조건에 해당하지 않는 타이머가 나올 때 까지 이를 반복한다.이 페이즈는 시스템의 실행 한도에 영향을 받고 있으므로, 실행 되어야 하는 타이머가 남아도 시스템 실행 한도에 도달하면 다음 페이즈로 넘어가게 된다.

##### Pending i/o Phase

타임 페이즈가 종료된 후 이벤트 루프는 Pending i/o에 진입하고, 가장 먼저 이전 작업들의 콜백이 실행 디기 중인지, 즉 `pending_queue`에 들어와 있는지를 체크하게 된다.

실행 대기 중이라면 `pending_queue`가 비거나, 시스템 실행 한도 초과에 도달할 때까지 대기하고 있던 콜백들을 실행한다. 이 과정이 종료되면 이벤트 루프는 `Idle Handler Phase`로 이동 한 후, 내부 처리를 위한 `Prepare phase`를 거쳐 최종적으로 `Poll phase`에 도달하게 된다.

##### Poll Phase

폴링하는 단계로, 이벤트 루프가 Poll Phase에 들어왔을 때, `watcher_queue`내부의 파일 읽기의 응답 콜백, HTTP 응답 콜백 등 수행해야 할 작업들이 있다면 이 작업들을 실행한다. 이 과정 또한 `watcher_queue`가 비거나, 시스템 실행 한도 초과에 다다를 때 까지 계속 된다

만약 더 이상 콜백을 실행할 수 없게 되면 `check_queue`, `pending_queue`, `closing_callbacks_queue`에 해야할 작업이 있는지 확인하고, 있다면 Poll phase가 종료되고 다음 페이지로 넘어간다. 그러나 해야 할 작업이 없다면, Poll phase는 다음 페이즈로 넘어가지 않고 타이머 힙에서 첫번째 타이머를 꺼낸 후, 해당 타이머가 실행 가능한 상태라면 그 타이머의 딜레이 시간만큼만 대기 시간을 결정한다.

Poll Phase에서 다음 Phase로 넘어가는 조건은
* Check phase에 실행할 콜백이 있는 경우
* Check phase에 실행할 콜백이 없고, 타이머를 실행 할 수 있을 시간이 될 때 까지만 대기하다가 바로 Timer phase로 이동
* 없으면 생길 때 까지 대기

##### Check phase

Poll phase가 지나면 이벤트 루프는 `setImmediate`과 관련이 있는 페이즈에 진입한다. 이 페이즈 또한 다른 페이즈와 비슷한 역할을 수행한다.

##### Close callback

`close`나 `destroy` 콜백 타입들을 관리한다. 이벤트 루프가 이 `close callback`과 함께 종료되고 나면, 이벤트 루프는 다음에 돌아야 할 루프가 있는지 확인한다. 아닐 경우 이벤트 루프는 종료되지만 더 수행해야 할 작업들이 남아 있다면 이벤트 루프는 다음 순회를 돌기 시작한다.

##### nextTickQueue & micro task queue

이 두 큐의 콜백들은 어떤 페이즈에서 다음 페이즈로 넘어가기 전 자신이 가지고 있는 콜백들을 최대한 빨리 실행한다(phase에서 phase로 넘어가는 과정을 Tick이라 부름)

다른 페이즈들과 다르게 이 두 큐는 시스템 실행 한도 초과에 영향을 받지 않는다. 그리고 nextTickQueue가 microTaskQueue 보다 높은 우선순위를 가진다.

##### Thread-Pool

비동기 작업을 처리하기 위해 libuv 라이브러리에 포함되어 있다. libuv는 OS커널의 비동기 API만을 사용하여 이벤트 드리븐을 유도한다. 그러나 파일 읽기, DNS lookup등 OS 커널이 비동기 API를 지원하지 않는 작업들의 경우 별도의 스레드 풀을 사용한다. default=4, max_thread = 128(uv_threadpool 환경 변수를 사용 할 경우)

```js
setTimeout(() => {
    console.log('setTimeout')
}, 0);

setImmediate(() => {
    console.log('setImmediate');
});
```

이 경우, setImmediate이 setTimeout보다 우선함을 보장 할 수 없지만, 이 코드를 비동기 처리 코드에 넣는 다면 Immediate이 timeout보다 우선함을 알 수 있다.

```js
fs.readFile('a.txt', () => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
    setImmediate(() => {
        console.log('setImmediate');
    });
});
```

처리순서

1. `fs.readFile`을 만나면 이벤트 루프는 libuv에게 해당 작업을 던짐
2. 파일 읽기는 OS 커널에서 비동기 API를 제공하지 않기에 libuv는 별도 스레드에 해당 작업을 던짐
3. 작업이 완료되면 이벤트 루프는 `Pending i/o callback phase`의 `pending_queue`에 작업 콜백 등록
4. event loop가 `Pending I/O callback phase`를 지날 때 해당 콜백 실행
5. `setTimeout`이 `timer phase`의 큐에 등록됨. 해당 콜백은 다음 `Timer phase`때 실행 됨
6. `setImmediate` 콜백이 `check phase`의 `check_queue`에 등록됨
7. `Poll phase`에서는 딱히 할 일이 없으나, `check phase`의 큐에 작업이 있으므로 바로 `check phase`로 이동
8. `setImmediate`콘솔 출력. `Timer phase`에는 타이머가 등록되어 있으므로 다시 이벤트 루프 시작
9. `Timer phase`에서 타이머 검사, 딜레이가 0 이므로 `setTimeout`의 콜백을 바로 실행
10. setTimeout 콘솔 출력

이 과정을 거치므로 `setImmediate`콜백이 반드시 `setTimeout`보다 실행되는 것을 보장 할 수 있음
   

[참고 블로그](https://evan-moon.github.io/2019/08/01/nodejs-event-loop-workflow/index.html?fbclid=IwAR0p6runAxuIfSqrQm785mH12Zc_OORJ1e8KDtSqbtEp1lnr772LmEEM4cY)

### Try-catch on Async

자바스크립트의 비동기 함수들은 이벤트 루프를 통해 콜백 함수를 실행한다. 그렇기에 에러 처리 관련 코드들도 조금은 다르게 동작하는데,

```js
document.querySelector('.btn').click(() => {
    try {
        $.getJSON('/api/members', (res) => {
            // 에러 발생 코드
        })
    } catch (e) {
        console.log(`Error : ${e.message}`)
    };
});
```

위의 코드에서, 버튼이 클릭되어 콜백 A가 실행될 때, `$.getJSON` 함수는 브라우저의 `XMLHttpRequest` API를 통해 서버로 비동기 요청을 보낸 후 바로 실행을 마치고 호출 스택에서 제거된다.

이후, 서버에서 응답을 받은 브라우저는 콜백을 태스크 큐에 추가하고, 콜백은 이벤트 루프에 의해 실행되어 호출 스택에 추가된다. 그러나 클릭 이벤트 콜백은 이미 호출 스택에서 비워진 상태이므로 호출 스택에는 응답에 대한 콜백만 가지고 있다. 즉, 실행될 때 전혀 다른 독립적인 컨텍스트에서 실행되기 때문에 클릭 이벤트 내부의 try-catch 문의 영향을 받지 않는다.

이런 이유로 Node.js의 비동기 API들은 중첩된 콜백 호출에 대한 에러 처리를 위해 첫 번째 인수는 에러 콜백 함수라는 컨벤션을 따르고 있다.

이 문제를 해결하기 위해, 요청에 대한 응답 콜백에 try-catch를 실행해야 하며, 이렇게 해도 네트워크 에러나 서버 에러는 잡을 수 없기에 이를 위해 에러 콜백을 따로 제공해야 한다.

```js
document.querySelector('.btn').click(() => {
    $.getJSON('/api/members', (res) => {
        try {

        } catch (e) {
            console.log(`Error : ${e.message}`);
        }
    });
});
```

프론트 엔드 환경에서는, 콜백 함수의 실행 순서를 조절하기 위해 `setTimeout(fn, 0)`과 같은 코드를 종종보게 된다. setTimeout 함수는 콜백 함수를 바로 실행하지 않고, 태스크 큐에 추가 후 실행하게 실행 플로우를 변경시키기 때문에 이를 기반으로 다양한 처리를 할 수 있다. 특히 렌더링 엔진과 관련하여 작업을 처리 할 때 용이하게 쓰인다.

```js
document.querySelector('.btn').click(()  => {
    showWaitingMessage();
    longTakingProcess();
    hideWaitingMessage();
    showResult();
});
```

`longTakingProcess`가 오래 걸리는 작업이기에 그 전에 `showWaitingMessage`를 호출해서 로딩중 이라는 메시지를 보여주려고 할 때, 이 메시지가 표시될 일은 없다. showWaitingMessage() 함수의 실행이 끝나고 렌더링 엔진이 렌더링 요청을 보내도 해당 요청은 task queue에서 이미 실행중인 태스크가 끝나기를 기다리고 있기 때문이다.

실행중인 태스크가 끝나는 시점은 호출 스택이 비워지는 시점인데, 그 때는 `showResult()` 까지 실행이 끝나 있을 것이고, 결국 렌더링 되는 시점에서 `hideWaitingMessage`로 인해 로딩 메시지가 숨겨질 상태 일 것이다. 이를 위해 `setTimeout`을 사용하기도 한다.

```js
document.querySelector('.btn').click(() => {
    showWaitingMessage();
    setTimeout(() => {
        longTakingProcess();
        hideWaitingMessage();
        showResult();
    }, 0);
});
```

이 경우, `longTakingProcess`가 바로 실행되지 않고 태스크 큐에 추가 될 것이다. 그러나 `showWaitingMessage`로 인해 태스크 큐에는 렌더링 요청이 먼저 추가되기에 `longTakingProcess`는 그 다음 순서로 태스크 큐에 추가될 것이다. 이로 인해 이벤트 루프는 태스크 큐에 있는 렌더링 요청을 먼저 처리하게 되고, 로딩 메시지가 먼저 화면에 보여지게 된다.

렌더링 관련된 문제 뿐만 아니라, 실행이 오래 걸리는 코드를 `setTimeout`을 사용하여 적절하게 다른 태스크로 나누어 주는 것은 전체 어플리케이션이 멈추는 것을 방지해준다.

자바스크립트의 비동기에 관련이 있는 구조들은 call stack, event loop, task queue만 있는게 아니라, task queue보다 우선 순위에 있는 micro task queue도 존재한다.

프로미스도 비동기 처리가 되는데, 이 때 프로미스는 일반적인 비동기보다 우선적으로 처리된다.

```js
setTimeout(() => console.log('A'), 0);

Promise.resolve()
.then(() => console.log('b');)
.then(() => console.log('c'); )
```

이런 상황에서 콘솔에 찍히는 순서는 B -> C -> A 인데, 그 이유는 Promise가 마이크로 태스크를 사용하기 때문이다.

마이크로 태스크는 일반 태스크보다 더 높은 우선순위를 갖는 태스크이다. 태스크 큐에 대기중인 태스크가 있더라도, 마이크로 태스크가 우선적으로 실행된다. 위에 예제에서, `setTimeout()`은 콜백 A를 태스크 큐에 추가하고, 프라미스의 `then()` 메소드는 콜백 B를 태스크 큐가 아닌 마이크로 태스크 큐에 추가한다. 위의 코드의 실행이 끝나면 태스크 이벤트 루프는 태스크 큐 대신 마이크로 태스크 큐가 비어있는지 먼저 확인하고, 큐에 있는 콜백 B를 실행한다. 

콜백 B가 실행되고 나서 두 번째 `then()` 메소드가 콜백 C를 마이크로 태스크 큐에 추가하고, 이벤트 루프는 다시 마이크로 태스크 큐를 확인하고 큐에 있는 콜백 C를 실행한다. 이후 마이크로 태스크 큐가 비어있음을 확인한 이후 태스크 큐에서 콜백 A를 꺼내와 실행한다.

## 브라우저의 XMLHttpRequest 객체는 무엇이고 어떻게 동작하나요?

## fetch API는 무엇이고 어떻게 동작하나요?

### 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

### 자바스크립트의 async와 await 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?
