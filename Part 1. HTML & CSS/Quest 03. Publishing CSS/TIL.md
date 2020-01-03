# Quest 03. Publishing CSS

## 퍼블리싱 할 때 중요한 몇 가지 속성들

* `font-*` : `font: font-style font-variant font-weight font-size/line-height font-family`
  * font-style : 이탤릭체 등의 글꼴의 스타일 지정
  * font-weight : 글자 두께
  * font-variant : 글꼴 변형 (소문자를 대문자로 바꾸는 등의).
  * font-size : 글자 크기
  * line-height : 줄 단격
  * font-family : 글꼴 (굴림, 돋움, …)
  * @font-face : 웹 폰트를 사용하기 위한 속성으로, 서버에 업로드 할 경우 직접 입력해 주어야 한다. CDN으로 업로드 할 시 이를 직접 입력 해 줄 필요는 없으나, 제대로 업로드 되지 않을 경우 웹폰트를 제공받지 못하는 경우도 존재함.
  * @font-face {
    font-family: "", src: "", font-style:"", font-weight:"", unicode-range:""
  }
* `text-*`
  * text-decoration : 글자의 밑, 위, 중앙에 글자와 같은 색상의 선을 넣는다
  * text-align : 글자를 정렬하는 것.
  * text-indent : 첫 줄 들여쓰기를 설정한다.
  * text-transform : 글자 렌더링을 설정한다.



[웹폰트 참고 사이트](https://wit.nts-corp.com/2017/02/13/4258)