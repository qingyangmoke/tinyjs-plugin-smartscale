/**
* Tiny.js
* @external Tiny
* @see {@link http://tinyjs.net/}
*/

/**
 * @namespace SmartScale
 * @memberof Tiny
 */

/**
* 全局配置对象
* @typedef smartScaleConfig
* @type {object}
* @property {boolean} autoResize - 是否跟着窗口尺寸的变化自动智能适配
*/

/**
* 全局配置对象
* @typedef on
* @type {object}
* @property {boolean} autoResize - 是否跟着窗口尺寸的变化自动智能适配
*/

import setScale from './setScale';
import eventEmitter from './event';
import ScaleMode from './ScaleMode';

const smartScaleConfig = Object.assign({
  autoResize: true,
}, window.smartScaleConfig || {});

/**
 * 锁死dpi=1 不允许修改
 */
Object.defineProperty(Tiny.config, 'dpi', {
  get() {
    return 1;
  },
  set(newValue) {
    console.log('dpi is locked to 1');
  },
  enumerable: true,
  configurable: true,
});

/**
 * 锁死listenRotation=false 不允许修改
 */
Object.defineProperty(Tiny.config, 'listenRotation', {
  get() {
    return false;
  },
  set(newValue) {
    console.log('listenRotation is locked to false');
  },
  enumerable: true,
  configurable: true,
});

/**
 * 锁死fixSize=true 不允许修改
 */
Object.defineProperty(Tiny.config, 'fixSize', {
  get() {
    return true;
  },
  set(newValue) {
    console.log('fixSize is locked to true');
  },
  enumerable: true,
  configurable: true,
});

const apps = [];
/**
 * inject 注入到 Application
 */
Object.defineProperty(Tiny.Application.prototype, 'scaleMode', {
  get() {
    return this.$scaleMode || ScaleMode.NO_SCALE;
  },
  set(newValue) {
    if (this.$scaleMode === newValue) return;
    if (apps.indexOf(this) === -1) {
      apps.push(this);
    }
    this.$scaleMode = newValue;
    setScale(this, this.$scaleMode);
  },
  enumerable: true,
  configurable: true,
});

function on(event, fn, context) {
  eventEmitter.on(event, fn, context);
}

function off(event, fn, context, once) {
  eventEmitter.off(event, fn, context, once);
}

function update() {
  if (smartScaleConfig.autoResize) {
    apps.forEach((e) => {
      e.$scaleMode && setScale(e, e.$scaleMode);
    });
  }
}

window.addEventListener('resize', update, false);
window.addEventListener('orientationchange', update, false);

const SmartScale = {
  ScaleMode,
  update,
  on,
  off,
};

/**
 * 是否根据窗口的尺寸变化自动适配
 */
Object.defineProperty(SmartScale, 'autoResize', {
  get() {
    return smartScaleConfig.autoResize;
  },
  set(newValue) {
    smartScaleConfig.autoResize = newValue;
    update();
  },
  enumerable: true,
  configurable: true,
});

/**
 * 这里直接给Tiny.SmartScale赋值
 * 可以在require('tinyjs-plugin-smartscale');
 * 是直接使用Tiny.SmartScale的方式去访问
 * 保持 script引入和require引入在使用上保持一致
 **/
Tiny.SmartScale = SmartScale;

module.exports = SmartScale;
