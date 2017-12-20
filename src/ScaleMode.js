/**
 * 智能适配模式
 * @typedef ScaleMode
 * @type {object}
 * @property {string} NO_SCALE - noScale 不进行适配
 * @property {string} SHOW_ALL - showAll 模式是保持宽高比，显示全部内容。缩放后应用程序内容向较窄方向填满屏幕，另一个方向的两侧可能会不够宽而留有黑边。
 * @property {string} FIXED_WIDTH - fixedWidth  模式是保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满屏幕，但只保持应用程序内容的原始宽度不变，高度可能会改变。<strong>竖屏应用推荐使用</strong>
 * @property {string} FIXED_HEIGHT - fixedHeight 模式保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满屏幕，但只保持应用程序内容的原始高度不变，宽度可能会改变。<strong>横屏应用推荐使用</strong>
 * @property {string} EXACT_FIT - exactFit 模式是不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满屏幕。简单的说就是不按照原来内容的比例，直接拉伸，暴力填充整个屏幕。
 * @property {string} NO_BORDER - noBorder 模式会根据屏幕的尺寸等比缩放内容，缩放后应用程序内容向较宽方向填满屏幕，不会有黑边存在，另一个方向的两侧可能会超出播放器窗口而被裁切，只显示中间的部分。
 */

/**
 * 智能适配模式
 * @type ScaleMode
 * @memberof Tiny.SmartScale
 */
const ScaleMode = {
  NO_SCALE: 'noScale',
  SHOW_ALL: 'showAll',
  FIXED_WIDTH: 'fixedWidth',
  FIXED_HEIGHT: 'fixedHeight',
  EXACT_FIT: 'exactFit',
  NO_BORDER: 'noBorder',
};

export default ScaleMode;
