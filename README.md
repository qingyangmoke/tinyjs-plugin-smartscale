# tinyjs-plugin-smartscale

> 智能屏幕适配，是可以让开发者按照设计稿在固定的尺寸(如750x1334)下进行开发，不用过多的考虑屏幕适配

## 查看demo

`demo/index.html`

## 引用方法

- 推荐作为依赖使用

  - 安装依赖

  `npm install tinyjs-plugin-smartscale --save`

  - js中引用

  `require('tinyjs-plugin-smartscale');`


## 起步

### 1、最简单的例子

引用 Tiny.js 源码
``` html
<script src="https://gw.alipayobjects.com/as/g/tiny/tiny/1.1.5/tiny.js"></script>
```

``` js
 var config = {
      showFPS: false, // 显示帧频
      width: 750, // 设计稿宽度
      height: 1334, // 设计稿高度
      renderOptions: {
        backgroundColor: 0x2a3145 // 画布背景色
      }
 };
var app = new Tiny.Application(config);
// 只需要设置下面一行就可以了 So Easy！
app.scaleMode = Tiny.SmartScale.ScaleMode.FIXED_WIDTH;

```

## 适配模式
### FIXED_WIDTH
```
  该模式是保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满屏幕，但只保持应用程序内容的原始宽度不变，高度可能会改变。#竖屏应用推荐使用#
```

### FIXED_HEIGHT
```
  该模式保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满屏幕，但只保持应用程序内容的原始高度不变，宽度可能会改变。#横屏应用推荐使用#
```


### SHOW_ALL
```
  该模式是保持宽高比，显示全部内容。缩放后应用程序内容向较窄方向填满屏幕，另一个方向的两侧可能会不够宽而留有黑边。#最简单最常用的一个模式#
```

### EXACT_FIT
```
  该模式是不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满屏幕。简单的说就是不按照原来内容的比例，直接拉伸，暴力填充整个屏幕。#该模式下图像会发生扭曲变形#
```

## API文档
``` js
  // 项目基于jsdoc自动生成API文档
  git clone https://github.com/qingyangmoke/tinyjs-plugin-smartscale.git
  cd tinyjs-plugin-smartscale
  npm i
  npm run doc
```
