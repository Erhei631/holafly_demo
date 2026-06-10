function readSystemInfo() {
  if (typeof wx.getWindowInfo === 'function') {
    return wx.getWindowInfo();
  }
  return wx.getSystemInfoSync();
}

function getSafeAreaInsets() {
  const info = readSystemInfo();
  if (info.safeAreaInsets && info.safeAreaInsets.bottom != null) {
    return {
      top: info.safeAreaInsets.top || 0,
      bottom: info.safeAreaInsets.bottom || 0,
      left: info.safeAreaInsets.left || 0,
      right: info.safeAreaInsets.right || 0,
    };
  }

  if (info.safeArea && info.screenHeight != null) {
    return {
      top: info.safeArea.top || 0,
      bottom: Math.max(0, info.screenHeight - info.safeArea.bottom),
      left: info.safeArea.left || 0,
      right: Math.max(0, (info.screenWidth || 0) - info.safeArea.right),
    };
  }

  return { top: 0, bottom: 0, left: 0, right: 0 };
}

function getSafeAreaBottom() {
  return getSafeAreaInsets().bottom;
}

function getStatusBarHeight() {
  const info = readSystemInfo();
  return info.statusBarHeight || 20;
}

module.exports = {
  getSafeAreaInsets,
  getSafeAreaBottom,
  getStatusBarHeight,
};
