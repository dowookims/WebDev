# Quest 12. AJAX(Asynchronous Javascript And XML)

## 어떠한 자바스크립트 코드가 HTTP 응답이나 사용자의 이벤트등에 종속되어 언제 실행되어야 할 지 알기 어려울 때엔 어떻게 해야 할까요?

HTTP응답은 네트워크의 속도와 request의 수신 및 처리, request에 대한 비즈니스 로직 및 서버 내 로직, 이에 대한 응답등으로 인해 언제 클라이언트의 요청에 대한 응답을 받을 수 있는지 알 수 없다.

자바스크립트 코드가 사용자 이벤트에 종속되어 있는 경우, 클라이언트를 구축 할 때 이벤트 리스너 등을 통해 특정 이벤트에 그에 맞는 반응을 등록 해 두고(콜백함수), 사용자가 그 이벤트를 점화 했을 때만 자바스크립트 코드들이 실행되기 때문에 그 시점에 대해 예측한다는 것은 거의 불가능 하다고 볼 수 있다.

그렇기에 자바스크립트는 이 시점을 정확히 예측하기 보다는, 네트워크 및 사용자의 행위에 대해 이벤트를 등록(callback 을 통해) 해 두고, 그 이벤트들이 점화 될 때 특정한 요청들을 처리하는 방식을 이해하는게 위의 질문을 해결하는 키 포인트가 될 것이다.

### Callback

콜백함수는 다른 함수의 인자로 전달되는 함수이다. 이 콜백함수는 외부 함수의 루틴 또는 행동이 완료되고 난 다음에 실행 / 호출된다. 자바스크립트 에서는 `prompt`, `alert`과 같은 동기 함수도 있으나, 수 많은 비동기 함수들이 존재한다. 콜백은 주로 비동기 작업이 끝나고 나서 콜백 함수의 코드가 실행되어진다.

네트워크 처리, 파일 읽기/ 쓰기 등을 비동기 함수로 처리 할 때 자바스크립트는 비동기 작업이 완료될 때 까지 기다리지 않고 나머지 코드를 먼저 실행한다. 그러나 개발자가 비동기 작업이 완료 된 이후 처리해야 할 로직들이 존재한다. 이를 헤걀하기 위한 방법으로써 콜백이 사용된다.

자바스크립트 개발자로써 복잡한 웹 어플리케이션을 개발하다보면 비동기 처리 작업이 중복되거나, 함수 내부에 함수를 호출하여 사용하는 경우가 빈번하다. 이 때 콜백 함수를 등록하면서 개발을 진행하게 되는데, 콜백 들이 중첩이 되면서 코드의 뎁스가 깊어지는 현상을 콜백 지옥이라고 한다.


```javascript
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});

```

### Single Thread Based Javascript

자바스크립트의 경우 싱글 스레드 기반 언어이기 때문에, 네트워크 관련 요청을 비동기적으로 처리하게 된다.
 만약, 동기적으로 처리한다면 즉시 처리되는 요청은 사용자에게 불편함을 주지 않으나 어느 정도 시간이 걸리는 경우에는 클라이언트(브라우저)에서 네트워크 요청 처리하기 위해 다른 작업이 중단 될 것이다. 

그래서 브라우저 에서는 이런 비동기 작업들을 처리하기 위한 장치들로 이벤트 루프와 태스크 큐 등을 가지고 있다.

V8과 같은 자바스크립트 엔진은 단일 호출 스택(Call Stack)을 사용하며, 요청이 들어 올 때마다 해당 요청을 순차적으로 호출 스택에 담아 처리한다. 단일 호출 스택만을 사용한다며, pop을 통해 호출 스택에 있는 요청을 처리하기 때문에 비동기 요청 및 동시성에 대한 처리는 불가능 해 진다. 앞에 언급한 문제는 자바스크립트 엔진 구동 환경인 브라우저나 Node.js의 내부에서 처리한다.

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

자바스크립트의 특징 중 하나는, `Run-to-Completion`이다. 각 태스크는 다른 태스크가 완료된 후에 실행되거나, 명시적으로 스케쥴러에게 컨트롤을 반환하는 스케쥴링 모델을 의미한다. 이는 OS에서 말하는 비선점 스케쥴링과 유사하다. 이는, 자바스크립트 엔진은 하나의 호출 스택을 사용하며, 스택에 쌓여있는 모든 함수들이 실행을 마치고 스택에서 제거되기 전 까지 다른 어떤 함수도 실행 될 수 없음을 의미한다.

여기서 핵심은, 자바스크립트가 `싱글 스레드 기반의 언어` 라는 것은 자바스크립트 엔진이 단일 호출 스택을 사용한다는 관점에서만 사실이라는 것이다. 실제 자바스크립트가 구동되는 환경(Node.js, Browser)의 경우 여러 개의 스레드가 사용되며, 구동 환경이 단일 호출 스택을 사용하는 JS 엔진과 상호 연동하기 위해 사용하는 장치가 `Event Loop`이다.

### Event loop

개발자가 `setTimeout`이나, `XMLHttpRequest`, `fetch`등을 사용하여 비동기 요청을 처리하는 로직을 짰다고 가정하자. 여기서 자바스크립트를 해석하고 이를 실행할 때 순차적으로 콜스택에 담기게 되고, 실행된다. 실행된 함수 들 중 `setTimeout`, `XMLHttpRequest` 함수 같은 경우 브라우저에게 타이머, AJAX 이벤트를 요청한 후 바로 스택에서 제거 된다. 이 때, 함수에 포함된 콜백 함수들은 즉시 사라지지 않고 `Task Queue`라는, 콜백 함수들이 대기하는 큐 형태의 배열에 들어가게 된다. 그리고 이벤트 루프는 호출 스택이 비워질 때마다 큐에서 콜백 함수를 꺼내와서 실행하는 역할을 한다.

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

* setImmediate 은 한번의 Tick 또는 루프가 돌 때마다 관리되고
* process.nextTick() 은 한 페이즈에서 다음 페이즈로 넘어가는 매 Tick 마다 최대한 빨리 호출되도록 작동하고 있다.
* setImmediate와 setTimeout의 실행속도에서 차이가 나는 이유는, immediate는 타이머 관련하여 비교하지 않아도 되지만, setTimeout의 경우 타이머 비교 로직이 추가 되기 때문에 더 오랜 시간이 걸리게 된다.

#### Promise

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

XMLHttpReques(XHR) 객체는 서버와 상호작용하기 위해 사용된다. XMLHttpRequest는 전체 페이지의 새로고침 없이도 URL로 데이터를 받아 올 수 있고, 사용자가 하고 있는 행동을 방해하지 않으면서 페이지의 일부를 업데이트 할 수 있다. 이는 AJAX(Asynchronous Javascript And XML)에 주로 사용된다.

### What is Ajax?

AJAX는 비동기적인 웹 애플리케이션의 제작을 위해 아래와 같은 조합을 이용하는 웹 개발 기법이다.

* 표현 정보를 위한 HTML(XHTML)
* 동적 화면 출력 및 표시 정보와 상호작용을 위한 Javascript
* 웹 서버와 비동기적으로 데이터를 교환하고 조작하기 위한 XML, XSLT, XMLHttpRequest, JSON 등

AJAX는 이미 존재하던 기술이었으나, 2000년도 중반 구글이 Gmail(2004), Google Map(2005)등의 웹 애필르케이션을 만들기 위한 비동기식 통신 기술을 사용하면서 인기를 끌기 시작했다. 공식적인 용어의 사용은 `AJAX: A new approach for a new application` 기사에서 구글이 `Google pages`에서 사용한 기술에 기반하여 나타나기 시작했다. 2006년에는 `W3C`가 공식적인 웹 표준을 만들기 위한 시도로 규격 초안을 발행했다.

AJAX가 기존 기술과의 차이점은, 기존 웹 에플리케이션의 경우 `form`태그를 활용하여 웹 서버로 데이터를 `submit` 하면 하나의 요청으로 웹 서버는 요청된 내용에 따라 데이터를 가공하여 새로운 웹 페이지를 작성하고 응답으로 되돌려준다.

이 때, 최초에 폼을 가지고 있던 페이지와 사용자가 폼을 채워 결과물로서 되돌려 받은 페이지는 유사한 내용을 가지는 경우가 많다. 결과적으로 중복되는 HTML 코드를 받음으로써 많은 대역폭을 낭비하게 되고, 유저와 상호 작용하는 서비스를 만들기 어렵게 된다. 조금 더 구체적인 예시를 들자면, 폼 태그를 통해 특정 데이터를 서버에 전송하는데 이 때 데이터를 서버에 보내고 서버의 응답으로 받은 `HTML`문서를 다시 그림으로써 새로 고침이 일어나게 된다. 이 때 받은 문서의 양이 클 경우 페이지를 다시 그리는데 자원이 많이 들어가는 경우가 있다. 또한, 기존 클라이언트에 기입된 정보들이 새로고침을 통해 리셋되는 경우가 있는데 이 경우에 사용자에게 불편함을 주기도 한다.

그러나 Ajax 애플리케이션은 필요한 데이터만을 웹서버에 요청해서 받은 후, 클라이언트에서 데이터에 대한 처리를 진행한다. 보통 `JSON` 포멧의 데이터를 사용하며, 웹 서버의 응답을 처리하기 위해 클라이언트 측에서는 `Javascrirpt`를 활용한다.

웹 서버에서 전적으로 처리되던 데이터 처리의 일부분이 클라이언트 측에서 처리 되므로 웹 브라우저와 웹 서버 사이에 교환되는 데이터량과 웹 서버의 데이터 처리량도 줄어들기에 애플리케이션의 응답성이 좋아진다.

AJAX를 사용하면서 얻게 되는 이점은
* 페이지 이동없이 고속으로 화면을 전환할 수 있다.
* 수신하는 데이터 양을 줄일 수 있고, 클라이언트에게 위임할 수 있다.
* 클라이언트 측에서 모든 작업을 서버에 요청하지 않고, 비동기 요청을 통해 처리 가능하다.

그러나 단점도 존재하게 되는데
* 페이지 이동을 하지 않은 통신으로 인한 보안상 문제가 생길 수 있다.
* 스크립트 작업으로 디버깅이 복잡해 진다.
* 요청의 남발로 역으로 서버의 부하가 늘 수 있다.
* Cross-origin 이슈로 인해 다른 도메인과 통신시 추가적인 작업을 진행해야 한다.
* Cross-origin 이슈를 해결하기 위한 추가적인 작업을 진행시 보안상 이슈가 생길 수 있다.

[Wiki Ajax](https://ko.wikipedia.org/wiki/Ajax)

### What is XMLHttpRequest?

XMLHttpRequest(XHR)는 웹 브라우저와 웹 서버 간에 데이터를 전송하는 방법을 사용하는 객체 형태의 API이다.

이 객체는 웹 브라우저의 자바스크립트 환경에서 제공된다. 특히, 로드된 웹 페이지를 지속적으로 수정하기 위한 목적으로 XHR에서 데이터를 검색하는 것은 Ajax 설계의 기본 개념이다.

XHR 이라는 이름에도 불구하고 XHR은 HTTP 이외의 프로토콜과 함께 사용할 수 있으며 데이터는 XML뿐만 아니라 JSON, HTML 또는 일반 텍스트의 형태로 사용될 수 있다.

#### XHR의 역사

XMLHttpRequest 객체의 개념은 Microsoft Exchange Server 2000의 Outlook Web Access 개발자들에 의해 만들어졌다.

IXMLHTTPRequest라는 인터페이스가 개발되어 이 개념을 사용하여 MSXML 라이브러리의 두 번째 버전으로 구현되었다. MSXML 라이브러리의 두 번째 버전은 1999년 3월에 Internet Explorer 5.0에 탑재 되어 ActiveX를 통해 MSXML 라이브러리의 XMLHTTP 래퍼를 사용하여 IXMLHTTPRequest 인터페이스에 액세스할 수 있게 되었다. Internet Explorer 버전 5와 6은 XMLHttpRequest 객체 식별자를 스크립트 언어로 정의하지 않았는데 그 이유는 XMLHttpRequest가 해당 릴리스 시 표준이 아니었기 때문이다. 이 당시, MS에서는 XHR이 존재하지 않을 때 역호환성(Backward compatibility)을 달성할 수 있었기 때문이다. Microsoft는 2006년 10월에 발표된 Internet Explorer 7.0의 스크립팅 언어에 XHR 추가했다.

mozila 프로젝트는 gecko 레이아웃 엔진에 nsIXHR 이라는 인터페이스를 개발하여 구현했다. 이 인터페이스는 가능한 한 마이크로소프트의 IXHR 인터페이스에 가깝게 작동하도록 모델링되었다. Mozilla는 인터페이스(nsIXHR)를 사용하기 위한 래퍼인 XHR 객체를 만들었다.

XMLHttpRequest 객체는 2000년 12월 6일 출시된 gecko 버전 0.6부터 사용 할 수 있었으나 2002년 6월 5일에 출시된 gecko 버전 1.0에 완전하게 기능할 수 있었다.

#### cors - same origin

XHR은 브라우저 레벨의 API로써, 수많은 로우 레벨의 detail들(caching, handling redirect, content negotiation, authentication 등)을 자동적으로 설정해준다. 이런 특징은 개발자로 하여금 비즈니스 로직에 집중하게 함으로써 개발을 더 편하게 해주고, 애플리케이션 코드에 일련의 보안 및 정책 제약을 가할 수 있게 한다.

XHR interface는 엄격한 매 요청에 대해 HTTP semantic을 요구한다. application은 data와 url을 제공하고, 브라우저는 요청을 포맷하고 각 연결의 전체 라이프사이클을 처리한다. 그리고 `setRequestHeader()` 메서드를 통하여 커스텀 HTTP header를 추가하여 특정 정보 및 보안, 인가에 대한 헤더 정보들을 담을 수 있다.

브라우저는 애플리케이션이 fake user, agent, user 또는 요청이 만들어진 원본을 faking하는 것을 방지하기 위해 안전하지 않은 헤더를 무시할 것이다. origin header를 보호하는게 특히 중요하기 때문에,모든 XHR 요청에 적용되는 "same-origin policy"는 이에 대한 중요한 키가 될 것이다.

`origin`은 `application protocol`, `domain name`, `port number`로 정의된다.
`http://www.naver.com:80`, `https://www.knowre.com:443`

same-origin policy의 동기는 브라우저가 authentication token, cookie, 기타 privacy metadata와 같은 사용자 데이터를 저장하므로, 서로 다른 애플리케이션에서 유출되지 않기 위해 지정 된 것이다.

이 문제를 해결하기 위해, XHR의 초기 버전은 same-origin requests가 요청된 자원의 origin과 일치해야 하는 것으로만 제한되었다. example.com에서 시작된 XHR은 동일한 example.com origin에서만 다른 자원을 요청할 수 있었다. 또는 same-origin 전제조건이 실패하면 브라우저는 XHR 요청의 시작을 거부하고 오류를 발생시켰다.

그러나, same-origin policy는 XHR의 유용성에 심각한 제약을 가한다. 서버가 다른 origin에서 실행되는 스크립트에 resource를 제공할 때 문제가 생기기 때문이다. 이문제를 해결하끼 위해 CORS(Cross-Origin Resource Sharing)가 도입되었다. CORS는 클라이언트측 cross-origin request에 대한 안전한 opt-in 메커니즘을 제공한다.

CORS 요청도 XHR API를 활용하여 작업이 진행한다. same-origin과 다르다는 것은, request와 response의 URL이 다르다는 것이다. CORS에 대한 opt-in authentication은 더 낮은 layer를 다룬다. request가 만들어 질 때, 브라우저는 자동적으로 protected된 Origin HTTP Header를 추가하는데, 요청이 어디에서 만들어졌는지를 알려주는 내용을 header에 추가한다.

결과적으로, remote server는 Origin header를 검사 할 수 있고, 응답 시 Access-Control-Allow-Origin 헤더를 반환하여 요청을 허용할지 여부를 결정할 수 있다.

W3C CORS spec은 preflight 요청을 사용해야 하는 시기와 장소를 규정한다. 단순한 요청은 이를 건너뛸 수 있지만, 다양한 조건으로 CORS를 트리거 하기도 한다. preflight 요청이 이루어지면, 클라이언트가 각각의 요청에 대해 same-origin 검증을 피하도록 cache할 수 있다.

## fetch API는 무엇이고 어떻게 동작하나요?

fetch API는 자원을 fetching하는데 사용되는 간단한 interface로써 웹 요청과 응답을 XMLHttpRequest보다 편하게 만든 특징을 가지고 있다. fetch는 native Javascipt API로 `XMLHttpReuqest` API를 향상시킨 API이고, Promise 기반에 콜백 헬을 탈출했다는 것이 특징이다.

```javascript
fetch('examples/example.json)
.then((res) => {
    // Do stuff with the response
})
.catch((err) => { console.log(`Look kike there was a problemn: ${err}`)});
```

fetch API는 파라미터로 요청할 자원의 경로를 입력받는다. 그러면 fetch는 `promise` 객체를 리턴한다. 이때, 경로에 대한 text url 뿐만 아니라, `Request`객체를 생성하고, url과 option을 넣어서 `fetch()`를 사용 할 수도 있다.

promise 객체가 resolve되면, 응답은 .then 으로 전달된다. 여기서 response와 관련된 처리를 진행하면 되며, 요청이 성공하지 못한경우 `.catch`를 통해 에러를 처리 할 수 있다.

fetch API에서 Response 객체는 요청에 대한 응답으로 나타나지며, 이 객체는 요청에 대한 자원과 다양한 property와 메서드가 존재한다.

예를들어, `response.ok`, `response.status`, `response.statusText`는 응답에 대한 상태를 평가하는데 사용된다.

응답 성공에 대한 평가가 중요한 이유는, fetch를 사용할 때, bad response(404와 같은) 또한 resolve를 통해 작업이 진행된다. fetch promise에서 reject가 되는 경우는 요청에 대한 완료가 불가능한 경우에만 나타나기 때문이다. 즉, `.catch`로 요청에 대한 응답과 관련된 에러 핸들링이 이루어지지 않기 때문이다.

```javascript
fetch('examples/example.json)
.then(res => {
    if (!res.ok) {
        throw Error(res.statusText);
    }
    // Do stuff with the res
})
.catch(err => {console.log(err)});
```

위의 코드에서 res.ok 값이 200 대가 아닐 경우, throw 함수가 res.statusText를 나타내며 에러를 던지게 되며, catch에서 error를 처리하게 된다. 이는 bad response를 fetch로 chaining 하는 방법 중 하나이다.

Response 객체는 response body에서 접근해야만 한다. Response object는 이를 위한 메서드를 제공하는데, `Response.json()`은 응답을 읽고 resolve된 JSON을 가진 promise를 반환한다.

```javascript
fetch('examples/example.json')
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(function(responseAsJson) {
  // Do stuff with the JSON
  console.log(responseAsJson);
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
```

이 요청에서, response객체의 body는 `ReadableStream`으로 되어있기에, 이를 resolve하기 위해 `response.json()`이 필요하다.

### fetch의 두번째 인자

`fetch()`는 second optinoal parameter인 `init`을 받을 수 있는데, 요청에 대한 custom setting을 가능하게 만든다.

fetch는 default로 GET method를 사용한다. 그 외의 메소드를 사용하기 위해서는

```javascript
fetch('examples/words.txt', {
    method: 'POST',
    body: 'title=hello&message=world'
});
```

이렇게 사용 될 수 있으며, form data를 활용하기 위해

```javascript
fetch('someurl/comment', {
  method: 'POST',
  body: new FormData(document.getElementById('myForm')
})
```

위처럼 쓰이기도 하며, 커스텀 헤더를 사용하려면

```javascript

const newHeaders = new Headers({
    'Content-type': 'text/plain',
    'X-Custom-Header': 'hello world'
});
```

이렇게 활용 할 수 있다.

### fetch의 Cross-origin requests

Fetch와 XHR은 same-origin policy를 따른다. 이는 브라우저가 스크립트 내에서 발신되는 cross HTTP request를 제한한다는 것을 의미한다. cross origin request는 하나의 도메인(예: domain)이 별도의 도메인(예: requests)에서 리소스를 요청할 때 발생한다.

cross-origin request의 제한은 복잡한 부분이다. 이미지, 스타일시트, 스크립트와 같은 많은 리소스는 cross origin에서 가져온다. 그러나, 이 자원들은 same-origin policy에 대한 예외들이다. cross-origin request는 스크립트 내에서 제한된다.

[Working with the Fetch API](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api)



**참고자료**

[Wiki XMLHttpRequest](https://en.wikipedia.org/wiki/XMLHttpRequest)

[Browser APIs and Protocols: XMLHttpRequest - High Performance Browser Networking](https://hpbn.co/xmlhttprequest/)

[w3 XMLHttpRequest](https://www.w3.org/TR/XMLHttpRequest/)

[XMLHttpRequest Living Standard](https://xhr.spec.whatwg.org/)

## Promise

### 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

Promise는 미래에 단일 값을 생성할 수 있는 객체로써, resolve된 값 또는 resolve되지 않은 이유(에러)를 반환한다. 주로 비동기 작업의 최종 완료 또는 실패를 나타내는 객체이다. Promise는 함수에 콜백을 전달하는 대신에, 콜백을 첨부하는 방식의 객체이다.

Promise는 3가지의 상태를 가질 수 있는데, `fulfilled`, `rejected`, `pending`을 가질 수 있다. Promise를 사용하는 개발자는 Promise가 `Pending`에서 `Settle`되어 `fulfilled`된 값 또는 `rejection` 에 대해 `callback`을 붙일 수 있다.

Promise는 콜백 함수를 전달해주는 이전 방식과는 달리 아래와 같은 특징을 보장하는데

* Callback은 자바스크립트 Event Loop가 현재 실행중인 콜 스택을 완료하기 이전에는 절대 호출되지 않는다.
* 비동기 작업이 성공하거나 실패한 뒤 `then()`을 이용하여 추가한 콜백의 경우도 위와 마찬가지이다.
* `.then()`을 여러번 사용하여 여러개의 콜백을 추가 할 수 있다. 그리고 각각의 콜백은 주어진 순서대로 실행하게 된다.

### How Promises Work

Promise 비동기 함수로부터 동기적으로 리턴되는 객체이다. 위에서 언급했듯이, Promise는 3가지 상태를 가질 수 있는데

* **Fulfilled**: `resolve()`가 호출 되었을 때 `onFulfilled()`가 호출된다.
* **Rejected**: `reject()`가 호출 되었을 때 `onRejected()` 가 호출된다.
* **Pending**: 아직 `fulfiled`나 `rejected`되지 않았다.

Promise는 pending이 아닐 때(resolve나 reject 되었을 때) 값이 결정되고, resolve 또는 reject전의 상태를 Pending이라고 한다. `resolved`와 `settled`은 같은 것이 아님을 유의해야 한다.

Promise가 settle되면, Promise는 resettle되지 않으며, `resolve()`나 `reject()`를 호출 했을 때 어떤 효력도 없다. settled된 Promise의 불변성은 중요한 특징이다.

Native Javascript에서는 promise의 상태를 노출하지 않는다. 프로미스를 생성하는 함수만이 프로미스의 상태와 `resolve`, `reject`에 대해 접근 할 수 있다.

```javascript
const wait = time => new Promise((resolve) => setTimeout(resolve, time));

wait(3000).then(() => console.log('Hello!')); // 'Hello!'
```

모든 Promise 객체는 `.then()` 메서드를 가지는데, `resolved`된 값들을 다룰 수 있게 하는 메서드이다.
ES6 에서 Promise constructor는 두개의 파라미터 `resolve()`와 `reject()`를 갖는다. 두 파라미터 모두 내부의 값을 가질 수 있다.

```js
function getData() {
      return new Promise((resolve, reject) => {
          $.get('https://jsonplaceholder.typicode.com/todos/1', res => {
              if(res.ok){
                  resolve(res)
              } else {
                  reject(new Error("Request is failed"))
              }
          })
      })
};

    getData().then(res => console.log("GET_DATA", res));
```

### Important Promise Rules

Promise의 표준은 [Promises/A+ specification](https://promisesaplus.com/implementations) community에 정의되어 있다. Promise 스펙은 다음과 같은 규칙을 따르게 되는데,

* Promise 또는 "thenable"은 표준인 `.then()`메서드를 제공하는 객체여야 한다.
* Pending Promise는 fulfilled 또는 rejected 상태로 변환되어야 한다.
* fulfiled 또는 rejected 상태가 되면, 다른 상태로 변경될 수 없다.
* Promise가 settleed되고 나면, 그 Promise는 값을 가져야 하고, 그 값은 변할 수 없다.

```js
promise.then(
    onFulfilled?: Function,
    onRejected?: Function
) => Promise
```

`.then()` 메서드는 다음과 같은 규칙을 따르게 되는데

* `onFulfilled`와 `onRejected`는 optional이다.
* 인자가 함수가 아니라면, 그 값은 무시된다.
* `onFulfilled()`는 promise가 fulfilled된 이후 호출되고, Promise의 값을 첫번째 인자로 사용한다.
* `onRejected()` 는 Promise가 reject된 이후 호출되고, rejection에 대한 이유가 첫번째 인자로 들어간다. rejection에 대한 이유는 valid한 JS 값이고, exception과 본질적으로 유의하기 때문에 이를 컨트롤 하기 위해 Error 객체를 사용하는게 좋다.
* `onFulfilled()`와 `onRejected()` 둘다 한번을 초과하여 호출 될 수 없다.
* `then()`은 같은 promise객체에서 여러번 호출 될 수 있다. 
* `.then()`은 반드시 새로운 `promise`를 반환해야 한다.
* 만약 `onFulfilled()` 또는 `onRejected()`가 exception `e`를 throw 한다면, 그 이후에 나오는 promise는 반드시 에러 객체인 `e`를 가지고 `rejected` 된다.
* 만약 `onFulfilled`가 함수가 아니고, `promise1`이 fulfilled되면, `promise2` 또한 반드시 `promise1`과 같은 값을 가지게 된다.


### Chaining

보통 하나나 두 개 이상의 비동기 작업을 순차적으로 실행해야 하는 상황들을 흔하게 볼 수 있다. 순차적으로 각각 작업이 이전 단계의 비동기 작업이 성공하고 나서 그 결과값을 이용하여 다음 비동기 작업을 실행하는데, 콜백을 이용하면 콜백 함수 내에서 콜백이 들어가 콜백의 뎁스가 깊어지게 된다. 그러나 Promise를 활용한 Promise chaining은 이를 쉽게 해결 해 주는데, `.then()`은 새로운 promise를 반환하기 때문이다. 이때 반환되는 Promise객체는 처음에 만들었던 Promise 객체와는 다른 Promise객체이다.

```javascript
const promise = doSomething();
const promise2 = prmise.then(successCb, failureCb);

or //#endregion
const promise2 = doSomething().then(successCallback, failureCallback);
```

```javascript
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

`.then()`에 넘겨지는 인자는 선택적이고, `catch(failureCb)`는 `.then(null, failureCallback)`의 축약이다.

Promise에서 반환값이 반드시 있어야 하는데, 없다면 콜백 함수가 이전의 Promise의 결과를 받지 못하기 때문이다.

### Error handling

Promise가 reject될 때마다 두 가지 이벤트 중 하나가 전역 스코프에서 발생한다.

`rejectionhandled`
executor의 `reject` 함수에 의해 `reject`가 처리 된 후 `promise` 가 `reject` 될 때 발생한다.

`unhandledrejection`
promise가 reject되었으나 사용할 수 있는 reject 핸들러가 없을 때 발생한다.

`PromiseRejectionEvent`유형인 두 이벤트에는 멤버 변수인 `promise`와 `reason`속성이 있다. `promise`는 reject된 promise를 가리키는 속성이고, `reason`은 promise가 reject된 이유를 알려준다.

이들을 이용해 프로미스에 대한 에러 처리를 대체하는 것이 가능해지며, 프로미스 관리시 발생하는 이슈들을 디버깅 하는데 도움을 얻을 수 있다.

```js
save()
.then(
  handleSuccess,
  handleError
)
```
`.then()` 메서드는 인자를 2개 받을 수 있는데, 성공 했을 때와 실패했을 때를 다룬다.
위에 있는 코드처럼 작업을 하게 되면, `reject`가 되었을 때 이벤트 핸들링이 안되기 때문에 anti pattern이다.

```js
save()
  .then(handleSuccess)
  .catch(handleError)
;
```

그렇기에 Promise에서는 이렇게 에러 핸들링을 해야하는데, 만약 네트워크 에러 같은 경우 .catch에서 잡을 수 없기 때문에 추가적인 작업이 필요하다. `catch()`는 syntatic sugar로써, `then(undefined, func)`를 간단히 한 문법이다.

```js
save()
  .then(
    handleSuccess,
    handleNetworkError
  )
  .catch(handleProgrammerError)
;
```

결과적으로, 이런식으로 Promise를 활용한 비동기 처리 및 에러 핸들링을 하는게 개발자들이 더 튼튼한 웹 어플리케이션을 만들기 좋은 패턴이다.

### Composition

`Promise.all()`과 `Promise.race()`는 비동기 작업을 병렬로 실행하기 위한 함수이다. 병렬로 작업을 시작하고 모든 작업이 끝날 때 까지 다음과 같이 처리를 하면 된다.

```javascript
Promise.All([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { })
```

```javascript
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve())
.then(result3 => { /* use result3 */ });

// Promise.resolve().then(func1).then(func2).then(func3);

const applyAsync = (acc,val) => acc.then(val);
const composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));



```

[Using Promises](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises)


[출처 : Master the JavaScrirpt Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

[JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)

### 자바스크립트의 async와 await 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

`async`, `await`은 Promise 객체를 더 편리하게 사용하기 위해서 나온 키워드 이다. `async / await`의 목적은 promise를 동기적으로 더 간단하게 사용하기 위함이면서, Promise 객체를 그룹화하여 특정 행동들을 수행하기 위함이다.

MDN에서는 `async / await`을 비동기 함수로써 이벤트 루프를 통하여 비동기적으로 작동하며, 내부적으로 result를 Promise로  반환하는 함수이며, `async / await` 함수를 활용한 코드의 문법과 구조는 표준 동기 함수와 유사하다고 이야기 하고 있다. 또한 `async function`은 `await` expression을 포함하고 있는데 이 `await` 키워드는 `async function`의 실행을 중단하고 Promise의 `resolve`된 결과를 기다리며, async function의 실행을 재개한 후, resolved된 결과를 반환한다고 나와있다.

`async / await`은 `generators`와 `promise`의 조합과 유사하다.

#### async

async는 함수 앞에 위치하며 이 함수는 항상 Promise 객체를 리턴하는 것을 의미한다. 리턴되는 값들은 `resolved promise`에 자동적으로 wrapping되며, `async` 키워드는 다음과 같이 쓰인다. 

```js
async function f() {
    return 1
}

const f = async () => {
    return 1
}
```

#### await

`await`키워드는 Promise가 settle되고, 그 결과를 리턴할때 까지 기다리게 하는 키워드 이다.

```js
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });
    
    let result = await promise;

    alert(result);
}
```

`await`은 문자 그대로 자바스크립트가 Promise객체가 settle되고 result를 반환할 때 까지 기다리게 만든다. 이 일련의 과정은 어떤 CPU resource를 소비하지 않는데, 그 이유는 자바스크립트 엔진이 그동안 다른 스크립트를 실행하거나 이벤트를 핸들링 하기 때문이다.

```js
async function getTodo(num) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${num}`);
    let data = await res.json();
    console.log(data);
}
```

#### Error Handling

`async`, `await` 키워드를 활용하여 작업을 할 때, 일반적으로 promise가 resolve되면, await promise가 결과로 리턴될 것이다. 그러나 rejection이 일어날 경우, 그 해당 라인에 `throw`문이 있는 것처럼 동작한다.

```js
async function f() {
    await Promise.reject(new Error("Oops"));
}

async function f() {
    throw new Error("Oops");
}
```

실제 개발 환경에서 Promise객체는 reject하기 전에 약간의 시간이 걸릴 수 있다. 이 경우, await이 에러를 던지기 전에 약간의 딜레이가 있을 것이다. 이런 에러를 처리하기 위해 `try..catch`문을 사용하게 된다.

```js
async function f() {
    try {
        let res = await fetch('http://no-such-url');
        let user = await res.json();
    } catch (err) {
        console.log(err);
    }
}
```

위의 경우 catch문은 res 뿐만 아니라 user와 관련된 `await` 키워드의 에러도 핸들링 할 수 있다.

만약 `try ... catch`구문을 쓰지 않은경우, async function f()가 rejected된 상태로 Promise객체가 생성되어 진다. 이 경우, `f()` 함수에 `.catch()`를 활용하여 에러를 핸들링 할 수 있다.

#### return await promiseValue vs return promiseValue

```js
async function getProcessedData(url) {
  let v
  try {
    v = await downloadData(url)
  } catch(e) {
    v = await downloadFallbackData(url)
  }
  return processDataInWorker(v)
}
```

```js
async function getProcessedData(url) {
  let v
  try {
    v = await downloadData(url)
  } catch(e) {
    v = await downloadFallbackData(url)
  }
  try {
    return await processDataInWorker(v) 
  } catch (e) {
    return null
  }
}
```

위 두가지 예시를 보면, v를 선언하고, 에러에 따라서 v 값이 변하면서 이를 바탕으로 다른 처리를 해준다.
첫번째 예시에서, `return processDataInWorker(v)`의 경우는 Promise를 리턴한다. 물론 밑에 있는 예시 또한 resolved 된 경우 Promise를 반환하지만 그렇지 않은 경우 `null`이 반환될 것이다.

여기서 주목해야 할 점은 `v`로 리턴되는 값이다. 첫번째 예시의 경우에 Promise의 특성상 `resolve`되든 `reject`가 되든 `Promise`가 반환된다. 그러나 Promise 객체가 개발자가 원하는 값을 가진 Promise가 아닐수도 있다. 이와 다르게, 아래 예시에 있는 `v`의 경우 `resolve`시 v가 개발자가 원하는 값이 들어간 Promise객체이기 때문에 원하는 방향으로 이끌어 갈 것이며, `reject`시에도 따로 에러 핸들링을 통해 `null`값을 할당하였기 때문에 `reject` 상황에도 개발자가 원하는 방향으로 이끌어 갈 수 있다.


[javascript info / async-await](https://javascript.info/async-await)
[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### Iterator

Iterator는 시퀀스를 정의하고, 종료시 값을 반환하는 객체이다. 특히, 이터레이터는 `value`와 `done` 프로퍼티를 가진 객체를 반환하는 `next()`메서드를 사용하여 `Iterator protocol`을 실행할 수 있는 객체들을 의미한다.

Iterator 객체가 생성되면, iterator 객체는 `next()` 메서드를 반복적으로 호출하여 iterate 할 수 있다. iterator를 Iterating 하는 것은 iterator를 소모하는 것인데, 일반적으로 iterating 하는 것은 각 단계당 한번만 할 수 있기 때문이다. `next()`메서드로 마지막 값이 yield되면, 그 추가적인 `next()` 호출은 `{value: undefined, done: true}` 객체를 반환받게 된다.

자바스크립트에서 가장 흔한 iterator는 배열 iterator로, 손쉽게 array 내부에 있는 시퀀스의 값들을 반환한다. 여기서 조심해야 할 것은, 모든 iterator들이 배열 iterator 처럼 표현될 것이라 생각하는데 이는 사실이 아니다. 배열의 iterator의 경우 배열 전체를 할당되는데(배열 전부를 순회 함) 그러나 일반적인 iterator들은 필요에 의해서 전체가 아닌 일부를 사용한다. (물론 몇몇 경우는 전체도 가능하다.) 예를 들어 integer 범위의 경우 0 과 `Infinity` 인것 처럼, 제한되지 않은 사이즈의 시퀀스들이 존재 할 수 있기 때문이다.

#### Iterables

어떤 객체가 **iterable** 하다는 것은 그 객체가 iteration behavior를 정의하고 있다는 건데, 이는 값들이 `for ...of`와 같은 순회가 가능한 구조라는 것이다. 자바스크립트의 built-in type인 String, Array, TypedArray와 Map, Set은 기본적으로 iteration behavior를 가지고 있으나 Object와 그외의 몇몇 타입들은 가지고 있지 않다.

Iterable하기 위해서는, 객체는 **@@iterator** 메서드를 실행해야만 한다. 간단히 이야기 해서, Iterable하기 위한 객체 또는 객체의 프로토타입이 반드시 `Symbol.iterator`를 가져야 한다.

Iterable한 객체를 단 한번만 순회하는 거나 그 이상 순회하는 것은 개발자의 의도에 따라 달라진다. Generator와 같이 iterate를 단 한번만 하는 객체는 **@@iterator**메서드에서 this를 반환해야 하고, iterate를 여러번 하는 객체의 경우 **@@iterator**의 실행시 새로운 iterator를 반환해야 한다.

```js
const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

for (let value of myIterable) { 
    console.log(value); 
}
// 1
// 2
// 3

[...myIterable]; // [1, 2, 3]
```

### Generator

`function*`선언은 제너레이터 함수를 정의한 것이며, `Generator` 객체를 반환한다. 

제너레이터는 종료되고 이후에 다시 재 진입이 가능한 함수이며 `iterable protocol`과 `iterator protocol`을 따른다. 제너레이터 함수가 중지되고, 재진입시 상태(context)는 내부 처리에 의해 저장되어 있다.

프로미스와 조합하여 사용되는 자바스크립트의 제너레이터는 비동기 프로그래밍을 처리하는 강력한 도구이다. 이 제너레이터를 활용하여 callback hell과 같은 문제를 경감시켜준다. 그리고, `Promise`와 `Generator`의 조합인 `Async / Await`으로 이 문제를 더 간단히 해결하기도 한다.

제너레이터 함수를 호출하는 것은 함수의 본체를 실행하는 것이 아니다. 함수 내부에 있는 `iterator`객체가 대신에 반환되는 것을 의미한다. iterator객체의 `next()`메서드가 호출되면, 제너레이터 함수의 내부 코드 중 첫번째 `yield`를 만날 때 까지의 코드 만을 실행하거나, iterator 또는 `yield*`에서 위임받은 다른 제너레이터 함수에서 리턴된 특정 값들을 만날때 까지 실행한다.

`next()` 메서드는 리턴 값으로 객체를 반환하는데, 그 객체는 yield된 값을 가지고 있는 `value` 프로퍼티와 iterator 객체의 마지막 값이 yield 되었는지를 판단하는 `done`프로퍼티를 가지고 있다.

`next()`메서드에 인자를 넣어서 호출하게 되면 제너레이터 함수의 실행을 재시작하며, 인자 없이 `next()`로 호출된 마지막 실행 이후에서 인자 값을 가지고 `yield` 표현식을 대체한다.

제너레이터 함수 내부에 있는 `return` 선언은 return이 실행 되었을 때 제너레이터의 종료를 의미하며, `done` 프로퍼티의 값이 `true`로 변한다. 제너레이터 함수 내부의 return 선언문에서 값을 반환하면, `next()`메서드를 통해 반환되는 객체에 값으로 나타나게 된다. `{value: returnValue, done: true}`

제너레이터 함수 내부의 return 처럼, 제너레이터 함수 내부의 에러를 던지는 것 또한 제너레이터 함수를 종료한다. 제너레이터 함수가 종료되면, `next()`메서드를 실행 했을 때 어떤 제너레이터 코드도 작동하지 않고 `{value: undefined, done: true}`의 object만 반환한다.

```js
function* testGen() {
    yield 1;
    yield 2;
    yield 3;
}

const test = testGen()
test.next() // {value: 1, done: false};
test.next() // {value: 2, done: false};
test.next() // {value: 3, done: false};
test.next() // {value: undefined, done: true};
```

```js
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

var gen = logGenerator();

gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise
```

```js
function* testGen2() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

function* testGen3() {
    yield 'a';
    yield 'b';
    yield 'c';
    yield* testGen2();
    return 'd';
};

const test2 = testGen2();
test2.next(); // {value: 1, done: false};
test2.next(); // {value: 2, done: false};
test2.next(); // {value: 3, done: false};
test2.next(); // {value: 4, done: true};
test2.next(); // {value: undefined, done: true};

const test3 = testGen3();
test3.next(); // {value: 'a', done: false};
test3.next(); // {value: 'b', done: false};
test3.next(); // {value: 'c', done: false};
test3.next(); // {value: 1, done: false};
test3.next(); // {value: 2, done: false};
test3.next(); // {value: 3, done: false};
test3.next(); // {value: 'd', done: true}; testGen2에서 return 값이 아님을 유의해야 한다.

test3.next(); // {value: undefined, done: true};
```

`yield*`는 선언문이 아닌 표현식이기 때문에, yield*를 활용할 때 generator의 `next()`를 활용한 경우 yield로 산출된 것만 사용 가능하고, iterator 문의 return value는 `yield*` 표현에 저장된다. 그렇기에 iterator의 return value를 사용하고 싶다면

```js
function* testGen4() {
  yield "aaa";
  yield "bbb";
  const tg2 = yield* testGen2();
  return tg2;
  // return yield* testGen2();
}

const test4 = testGen4();
test4.next(); // {value: 'aaa', done: false};
test4.next(); // {value: 'bbb', done: false};
test4.next(); // {value: '1', done: false};
test4.next(); // {value: '2', done: false};
test4.next(); // {value: '3', done: false};
test4.next(); // {value: '4', done: true};
test4.next(); // {value: undefined, done: true};
```

[Iterators and generators - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

***
Additional

Observable

Proxy


```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { 
    try { 
        var info = gen[key](arg); 
        var value = info.value; 
    } catch (error) {
         reject(error); 
         return; 
    } if (info.done) {
         resolve(value); 
    } else {
         Promise.resolve(value).then(_next, _throw); 
    }
}

function _asyncToGenerator(fn) {
     return function () {
          var self = this, args = arguments; 
          return new Promise(function (resolve, reject) {
                var gen = fn.apply(self, args); 
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); 
                } 
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); 
                } 
                _next(undefined); 
        }); 
    }; 
}

function getProcessedData(_x) {
  return _getProcessedData.apply(this, arguments);
}

function _getProcessedData() {
  _getProcessedData = _asyncToGenerator(function* (url) {
    let v;

    try {
      v = yield downloadData(url);
    } catch (e) {
      v = yield downloadFallbackData(url);
    }

    return processDataInWorker(v);
  });
  return _getProcessedData.apply(this, arguments);
}
```