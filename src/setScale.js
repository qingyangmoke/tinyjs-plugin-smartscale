import ScaleMode from './ScaleMode';

import eventEmitter from './event';

let prefix = '';
['-webkit-', '-moz-', '-ms-', '-o-'].forEach((e) => {
  if (`${e}transform` in document.documentElement.style) {
    prefix = e;
  }
});

function setTransform(view, scaleX = 1, scaleY = 1, x = 0, y = 0) {
  view.style[`${prefix}transform-origin`] = '0 0';
  view.style[`${prefix}transform`] = `translate(${x}px,${y}px) scale(${scaleX},${scaleY})`;
}

/**
 * fixedWidth  模式是保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器窗口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
 * @private
 * @param {Tiny.Application} app
 */
function fixedWidth(app) {
  const APP_WIDTH = Tiny.config.width;
  const scale = (window.innerWidth * 1.0 / APP_WIDTH);
  const APP_HEIGHT = window.innerHeight / scale;
  Tiny.config.height = APP_HEIGHT;
  app.resize();
  app.renderer.resize(Tiny.config.newWidth, Tiny.config.newHeight);
  setTransform(app.view, scale, scale, 0, 0);
}

/**
 * fixedHeight 模式保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器窗口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
 * @private
 * @param {Tiny.Application} app
 */
function fixedHeight(app) {
  const APP_HEIGHT = Tiny.config.height;
  const scale = (window.innerHeight * 1.0 / APP_HEIGHT);
  const APP_WIDTH = window.innerWidth / scale;
  Tiny.config.width = APP_WIDTH;
  app.resize();
  app.renderer.resize(Tiny.config.newWidth, Tiny.config.newHeight);
  setTransform(app.view, scale, scale, 0, 0);
}

/**
 * exactFit 模式是不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器窗口。简单的说就是不按照原来内容的比例，直接拉伸，暴力填充整个屏幕。
 * @private
 * @param {Tiny.Application} app
 */
function exactFit(app) {
  const scaleX = window.innerWidth / Tiny.config.width;
  const scaleY = window.innerHeight / Tiny.config.height;
  setTransform(app.view, scaleX, scaleY, 0, 0);
}

/**
 * showAll 模式是保持宽高比，显示全部内容。缩放后应用程序内容向较窄方向填满播放器窗口，另一个方向的两侧可能会不够宽而留有黑边。
 * @private
 * @param {Tiny.Application} app
 */
function showAll(app) {
  const scaleX = window.innerWidth / Tiny.config.width;
  const scaleY = window.innerHeight / Tiny.config.height;
  const scale = Math.min(scaleX, scaleY);
  const x = (window.innerWidth - Tiny.config.width * scale) / 2;
  const y = (window.innerHeight - Tiny.config.height * scale) / 2;
  setTransform(app.view, scale, scale, x, y);
}

/**
 * noBorder 模式会根据屏幕的尺寸等比缩放内容，缩放后应用程序内容向较宽方向填满播放器窗口，不会有黑边存在，另一个方向的两侧可能会超出播放器窗口而被裁切，只显示中间的部分。
 * @private
 * @param {Tiny.Application} app
 */
function noBorder(app) {
  const scaleX = window.innerWidth / Tiny.config.width;
  const scaleY = window.innerHeight / Tiny.config.height;
  const scale = Math.max(scaleX, scaleY);
  const x = (window.innerWidth - Tiny.config.width * scale) / 2;
  const y = (window.innerHeight - Tiny.config.height * scale) / 2;
  setTransform(app.view, scale, scale, x, y);
}

/**
 * @private
 * @param {Tiny.Application} app - app
 * @param {Tiny.SmartScale.ScaleMode} scaleMode - 智能适配模式
 */
export default function setScale(app, scaleMode) {
  if (!scaleMode) return;
  switch (scaleMode) {
    case ScaleMode.FIXED_WIDTH: {
      fixedWidth(app);
    } break;
    case ScaleMode.FIXED_HEIGHT: {
      fixedHeight(app);
    } break;
    case ScaleMode.SHOW_ALL: {
      showAll(app);
    } break;
    case ScaleMode.NO_BORDER: {
      noBorder(app);
    } break;
    case ScaleMode.EXACT_FIT: {
      exactFit(app);
    } break;
    default:
      return;
  }
  eventEmitter.emit('change', {
    app,
    scaleMode,
    width: Tiny.config.newWidth,
    height: Tiny.config.newHeight,
  });
};
