# Quest 02, CSS

## Topics

- CSS 기초 문법

- CSS를 HTML에 적용하는 세 가지 방법
  - Inline Style
  - `<style>`
  - `<link rel="stylesheet" href="...">`

- 레이아웃을 위해 몇 가지 중요한 속성들
  - `position`

  - `left`/`top`

  - `display`

  - `width`/`height`

  - `display: flex;`

  - `display: grid;`

  - Float

    - float 속성을 사용해 박스를 왼쪽(left) 또는 오른쪽(right)으로 "부유"시키는 레이아웃 기법

    - 이미지에 텍스트를 둘러싸게 만드려는 목표로 나온 기법

    - 플로팅된 요소는 그 요소의 종류에 상관없이 블럭 박스가 된다.

    - 인라인 요소를 플로팅시키는 인라인 블럭 박스처럼 렌더링된다.

      출처:  [Web Club](https://webclub.tistory.com/606)

      

  - CSS Box Model

    - Box Model은 position, margin, border, padding, content 순으로 구성된 모델
    - Box Size(width, height) = content(width, height) + (border + padding) * 2
    - 사용자가 지정한 width 값보다 초과하는 경우가 있기 때문에, `box-sizing : border-box` 를 활용하여 padding 과 border 값을 포함하여 계산하는 방법이 있음.
    - Block
      - width값을 100%를 가지고, line break를 한다.
      - block은 height, width, margin, padding 지정 가능
    - Inline
      - 텍스트 주입.
      - width 값은 컨텐츠 영역만큼 자동으로 잡히며, line break를 하지 않음
      - margin, padding은 위아래에 적용되지 않음
    - Inline-block
      - inline + block
      - line break 되지 않음
      - block 처럼 width와 height 지정 가능하며, 지정하지 않을 시 inline 처럼 컨텐츠만큼 영역이 잡힌다.

- 브라우저별 Developer tools

## Checklist

* CSS를 HTML에 적용하는 세 가지 방법의 장단점은 무엇인가요?

  * Inline Style

    * 태그에 직접 스타일을 지정 할 때 용이하다
    * 태그 안에 직접 지정하여 HTML과 섞어서 사용하기 때문에 코드가 지저분해 지고, 나중에 어느 곳에 있는지 찾기 힘들다.
    * 스타일 일괄변경이 어렵고, 효율성 측면에서 떨어진다.

  * 내부 스타일 시트(Internal Style Sheet)

    * HTML 문서 하나가 고유한 CSS를 가진다.
    * 페이지 안의 태그에만 영향을 미친다.
    * 똑같은 내용을 다른 HTML에 사용하려고 하면 복사해서 사용해야 한다.

  * 외부 스타일 시트(External Style Sheet)
    * 하나의 스타일로 여러 개의 HTML 페이지에 적용하여 사용할 때 편리
    * 유지 보수 용이
    * 외부 스타일 시트 파일(.css)를 계속 만들어 가야 하는 번거로움
    * 규모가 커질수록 복잡해지고, 많은 파일이 생성될 수 있으니 효율적인 관리가 필요




* 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?

```
1. 속성 값 뒤에 !important를 붙인 속성
2. inline style > InternalStyle Sheet > ExternalStyle Sheet
3. #id 로 지정한 속성
4. .클래스, :추상클래스 로 지정한 속성
5. 태그 이름으로 지정한 속성
6. 상위 객체에 의해 상속된 속성
```

* 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?

```
부모, 또는 조상 중 relative로 position이 주어진 태그를 기준점으로 삼으며, 없는 경우 body 태그가 기준점이 된다.
```

* 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?

```
* calc() 함수 사용
* float : float 요소에 길이에 고정 값을 주고, float 이 아닌 요소에 width: auto를 준다.
* flex : 개별 item에 flex-grow, flex-flow-shrink 등을 활용한다.
* grid : grid에서 행, 열의 길이 값을 줄 때, fr 값과 고정 상수 값 등을 활용한다.
```

* `float` 속성은 왜 좋지 않을까요?

```
float 속성은 자신의 위치를 주변의 컨텐츠로부터 상대적으로 배치하는 속성입니다.
float을 사용하게 되면, float 속성을 갖는 요소는 html 문서에서 공간은 차지하되, 문서의 흐름에서 제외되어 둥둥 떠다니게 됩니다. 이는, 기본적인 문서 배치의 흐름에서 벗어나기 때문에 레이아웃을 구성할 때 의도치 않은 문제들을 야기시키며, 비효율적인 문서 작성의 원인이 되기도 합니다.
```

* Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?

```
1. FlexBox는 열 혹은, 행 레이아웃과 같은 1차원 레이아웃을 염두에 두고 설계 되었다면 
   Grid는 2차원 레이아웃을 고려하여 설계 되었습니다.

2. FlexBox는 콘텐츠에 초점이 맞춰져 있습니다. 그리드는 레이아웃을 만드는 것에 더 초점을 맞추고 있습니다.

3. flex는 IE10 에서 일부 스펙만 지원하고, IE 11 이상부터 대부분 지원하나, 
   IE에서 수많은 버그가 일어난다고 보고되고 있다.
   GRID의 경우 최신 기술이기에 IE에서는 일부 기능이 지원되지 않는다.
```