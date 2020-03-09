# Quest 17. Webpack

Webpack의 구조와 사용 방법에 대해 알아보는 것을 목표로 합니다.

## What is Webpack

### 0. Why we should use module bundler

1. `<script></script>`로 스크립트 불러올 때마다 한번의 http 요청이 들어간다. 만약 이 내부에서 `reuiqre() / import`를 했을 때 추가적으로 요청이 들어가는데, 이러면 대규모 웹 어플리케이션에서는 많은 오버헤드가 발생하며, 화면을 그리기 위해 소요되는 시간이 많아진다. 이를 해결하기 위해, 자바스크립트 파일 하나에 필요한 모듈들을 다 추가해 놓아서 한번의 요청으로 불러올 수 있게 한다.
2. 여러개의 자바스크립트 파일을 불러올 때 생기는 naming space문제를 해결하는데 도와준다.
3. 여러 자바스크립트 파일들을 최적화 하고 압축하여 로딩 속도를 높인다.
4. 라이브러리 종속 순서를 신경 쓰지 않아도 된다.

### 1. What is webpack

Webpack은 현대 자바스크립트 어플리케이션의 static module bundler이다. 웹팩이 어플리케이션을 처리 할 때, 내부적으로 의존성 그래프를 만들며, 프로젝트에 필요한 모든 모듈을 매핑하여 하나 또는 그 이상의 번들 파일들을 만든다.  

**module** 은 프로그램을 구성하는 일부요소 또는 기능별로 나뉘어지는 프로그램  
**bundler** 는 여러개의 나누어져 있는 파일들을 지정한 단위에 하나의 파일로 만들어주는 역할을 수행  
**resolve** 모듈을 분해하는 것.
웹팩의 기본 컨셉은 다음과 같은 구조로 이루어져있다.

* Entry : **Entry Point**는 내부 의존성 그래프가 만들어지기 위한 시작점 이야기한다. 웹팩은 다른 모듈과 라이브러리들을 Entry point가 직접, 간접적으로 의존하는 구조를 파악한다.  
  Default value는 `./src/index.js` 이지만, `entry` propery로 시작점을 변경 할 수 있다.  

  * Single Entry (Short hand) Syntax
  
  ```js
  module.exports = {
      entry: './path/to/my/entry/file.js
  };
  /*
    module.exports = {
        main: './path/to/my/entry/file.js
    }
  */
  ```

  * Object Syntax

    ```js
    module.exports = {
        entry: {
            app: './src/app.js',
            adminApp: './src/adminApp.js'
        }
    };
    ```

  * entry에 array로 값을 주는 경우, multi-main entry가 생성된다. 여러개의 의존성 파일을 하나의 chunk 로 모으고 이들의 의존성 그래프를 생성하고 싶을때 유용하다.

* Output  
`output` 프로퍼티는 웹팩이 번들링한 파일들을 어디에 저장 할지 지정하는 것이다. default는 `./dist/main.js`로 주 output된 파일들이 번들링 되고, `./dist` 폴더는 다른 생성되는 파일들을 위한 폴더이다.

  output 설정은 웹팩이 어떻게 컴파일 된 파일을 디스크에 생성할지 표현한다. entry point는 여러개 존재할 수 있지만, output은 오직 하나만 지정될 수 있다.

  ```js
    const path = require('path);

    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        }
    };
  ```

  * Multi Entry Points  
  만약 여러개의 엔트리 포인트를 구성하거나 CommonsChunkPlugin 같은 플러그인을 사용해서 여러개의 chunk 를 만들고 싶다면, 각 파일들이 고유한 이름을 가질 수 있도록 substitutions를 사용해야 한다.

  ```js
    module.exports = {
        entry: {
            app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist'
        }
    };

    // writes to disk: ./dist/app.js, ./dist/search.js
  ```

* Loaders  
웹팩은 Javascript file과 JSON 파일 만을 인식한다. **Loaders**는 웹팩이 다른 타입의 파일(이미지, css, font)을 처리하거나 그 파일들을 모듈에 유효한 파일(JS, JSON)로 변환시켜 어플리케이션에서 사용될 수 있게 만들고, 의존성 그래프에 추가 한다.  

  로더는 모듈의 소스 코드에서 적용되는 변환이다. import나 로드를 통해 파일들을 전처리 할 수 있다. 그러므로 로더는 다른 빌드 툴들의 "tasks" 와 유사하며, 프론트엔드 빌드 과정을 처리하는 강력한 방법을 제공한다. 로더는 (TypeScript 같은) 다른 언어를 자바스크립트로 변경하거나 인라인 이미지를 data URL로 변경할 수 있다. 심지어 로더는 CSS파일을 자바스크립트 모듈에서 직접 import 할 수 있는 방법도 제공한다.

  * `loaders`는 웹팩 configuration에서 두 프로퍼티를 갖는데,
    * `test` 프로퍼티는 어떤 파일들이 변환 되는지 알려주는 것이고
    * `use`프로퍼티는 변환 될 때 사용되는 로더를 의미한다.

```js
const path = require('path');

module.exports = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$, use: 'raw-loader'}
        ]
    }
};
```

```js
module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    }
};
```

config위에 정의된 single module의 `rules` 프로퍼티는 2개의 프로퍼티(use, test)를 필요로 한다. 이는 웹팩에게 내부에 `require() / import`를 통해 불러오는 .txt 파일을 `raw-loader`를 활용해서 bundle되서 추가 되기 전에 변환 하라는 작업을 지시한다.

로더는 오른쪽에서 왼쪽으로 평가, 실행된다. 아래의 예시에서 sass-loader 로 시작, css-loader를 거쳐 마지막으로 style-loader로 끝난다

* Plugins : loaders는 특정 유형의 모듈을 변환하는 데 사용되지만, 번들 최적화, asset 관리 및 환경 변수 주입과 같은 광범위한 작업을 수행하기 위해 플러그인을 활용할 수 있다. 즉, 웹팩의 기본적인 동작에 추가적인 기능을 제공한다. 번들링한 결과물이 의존성 그래프에 주입되기 전에 추가적인 기능을 사용한다고 생각하면 좋다.  
  
  plugin을 사용하기 위해 `require()`을 통해 plugin을 불러오고, `plugins` array에 추가하여 활용할 수 있다. 대부분의 플로거인은 options을 통해 customize할 수 있다. 플러그인을 다른 목적으로 여러번 활용 할 수 있으나, 이 때 `new` 키워드를 활용하여 새로운 인스턴스로 추가 해 주어야 한다.  

  웹팩 플러그인은 `apply`메서드를 가지고 있는 자바스크립트 객체이다. 이 apply 메서드는 웹팩 컴파일러에 의해 호출되며, 엔트리 컴파일 라이프사이클에 접근 할 수 있도록ㄱ 한다.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            { test: /\.txt$, use: 'raw-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};
```

* Mode : `mode` 파라미터를 `development`, `production`, `none`으로 설정해서, 개발자들은 웹팩의 built-in 최적화를 각 환경에 맞게끔 설정할 수 있다. default 값은 `production`이다.

```js
module.exports  = {
    mode: 'production'
};
```

* Browser Compatibility : Webpack은 ES5를 준수하는 모든 브라우저를 지원한다. webpack은 `import()`와 `require.ensure()`를 위해 `Promise`가 필요하다. 만약 더 오래된 버전의 브라우저를 지원하려면, `load polyfill`이 필요하다.

### 2. What is Modules

Modular programming에서, 개발자들은 프로그램을 모듈이라는 별개의 기능들을 chunk로 분해한다.  
각 모듈들은 전체 프로그램보다 작은 규몰르 가지고 있는데, verification을 만들거나, 디버깅 하거나, 테스팅 하는 등의 기능들로 나뉘게 된다. 잘 작성된 모듈은 견고한 추상화 및 캡슐화를 제공하여 일관성 있는 디자인을 세울수 있게한다.  

Node.js는 modular programming을 지원하고 있으나, 웹에서는 module을 사용하는데 제한이 있다. 이를위해 다양한 툴들이 modular JS를 웹에서 지원하기 위해 존재하나 각기 장단점이 존재한다. 웹팩은 다양한 모듈 시스템을 지원하고 있다.  
* ES 2015 `import`
* CommonJS `require()`
* AMD `define`, `require`
* `@import`
* `url(...)`, HTML `<img src=...>`

### 3. Manifest

웹팩으로 만들어진 일반적인 어플리케이션 또는 웹 사이트는 3개의 타입의 코드들이 있다.

1. 개발자가 작성한 코드
2. third-party-library 또는 벤더 코드로, `1`에서 의존하는 코드
3. 모든 모듈의 인터랙션이 실행된 웹팩 런타임과 `manifest`

#### Runtime

런타임은 매니페스트 데이터와 함께 모듈화된 애플리케이션을 웹팩에 연결하는 데 필요한 모든 코드이다. 런타임은 모듈들이 상호작용을 할 때 연결하기 위한 loading 및 resolve logic를 포함하고 있다. 여기에는 브라우저에 이미 로드된 모듈을 연결하는 것과 그렇지 않은 모듈을 lazy load하는 논리가 포함된다.

#### Manifest

webpack compiler는 어플리케이션을 입력, 확인 및 매핑할 때, 모든 모듈에 대한 상세한 정보를 저장한다. 이 데이터 모음을 **manifest**라고 하며, 모듈을 묶어서 브라우저로 보내면 런타임에서 해결하고 로딩하는 데 사용된다. 어떤 모듈 구문(import, require)을 선택했든 간에,  구문을 가져오거나 요구하는 것은 모듈 식별자를 가리키는 __webpack_require__ 메서드로 되었다. 매니페스트에 있는 데이터를 사용하여 런타임은 식별자 뒤에 있는 모듈을 검색할 위치를 알아낼 수 있다.

### 4. Hot Module Replacement

Hot Module Replacement(HMR)은 어플리케이션이 동작하는 중에 어떤 변화, 추가, 삭제가 이루어졌을 때 full reload를 하지 않고 반영하는 기술이다. 이 HMR은 개발속도를 명확이 빠르게 해준다.

* full reload시에 잃게 되는 application의 state를 유지한다.
* 업데이트 되는 부분만 변경하여 개발 시간을 단축시킨다.
* 소스코드에 CSS/JS로 되어 있는 부분들을 즉시 업데이트 한다.

### 5. What is Transpiling

#### Sourcemap

웹팩이 소스코드들을 번들하게 되면 하나의 파일로 합쳐지게 된다. 이 경우 에러나 경고가 어디에서 뜨는지 파악하기 어렵게 된다. 이 문제를 해결하기 위해 사용되는게 소스맵이다.  
sourcemap은 webpack엣서 `devtool` 프로퍼티에 값으로 지정 할 수 있다. sourcemap은 다양한 값들이 존재한다.
