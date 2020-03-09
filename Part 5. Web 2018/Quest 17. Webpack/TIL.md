# Quest 17. Webpack

Webpack의 구조와 사용 방법에 대해 알아보는 것을 목표로 합니다.

## What is Webpack

### 1. What is webpack

Webpack은 현대 자바스크립트 어플리케이션의 static module bundler이다. 웹팩이 어플리케이션을 처리 할 때, 내부적으로 의존성 그래프를 만들며, 프로젝트에 필요한 모든 모듈을 매핑하여 하나 또는 그 이상의 번들 파일들을 만든다.  
웹팩의 기본 컨셉은 다음과 같은 구조로 이루어져있다.

* Entry : **Entry Point**는 내부 의존성 그래프가 만들어지기 위해 시작될 위치를 이야기한다. 웹팩은 다른 모듈과 라이브러리들을 Entry point가 직접, 간접적으로 의존하는 구조를 파악한다.  
  Default value는 `./src/index.js` 이지만, `entry` propery로 시작점을 변경 할 수 있다.
* Output : `output` 프로퍼티는 웹팩이 번들링한 파일들을 어디에 저장 할지 지정하는 것이다. default는 `./dist/main.js`로 주 output된 파일들이 번들링 되고, `./dist` 폴더는 다른 생성되는 파일들을 위한 폴더이다.

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

* Loaders : 웹팩은 Javascript file과 JSON 파일 만을 인식한다. **Loaders**는 웹팩이 다른 타입의 파일을 처리하거나 그 파일들을 모듈에 유효한 파일로 변환시켜 어플리케이션에서 사용될 수 있게 만들고, 의존성 그래프에 추가 한다.
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

config위에 정의된 single module의 `rules` 프로퍼티는 2개의 프로퍼티(use, test)를 필요로 한다. 이는 웹팩에게 내부에 `require() / import`를 통해 불러오는 .txt 파일을 `raw-loader`를 활용해서 bundle되서 추가 되기 전에 변환 하라는 작업을 지시한다.

* Plugins : loaders는 특정 유형의 모듈을 변환하는 데 사용되지만, 번들 최적화, asset 관리 및 환경 변수 주입과 같은 광범위한 작업을 수행하기 위해 플러그인을 활용할 수 있다.  
  plugin을 사용하기 위해 `require()`을 통해 plugin을 불러오고, `plugins` array에 추가하여 활용할 수 있다. 대부분의 플로거인은 options을 통해 customize할 수 있다. 플러그인을 다른 목적으로 여러번 활용 할 수 있으나, 이 때 `new` 키워드를 활용하여 새로운 인스턴스로 추가 해 주어야 한다.

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

### 2. What is Bundling

### 3. What is Image Sprite

### 4. What is Transpiling

#### Sourcemap

### 5. Hot Module Replacement
