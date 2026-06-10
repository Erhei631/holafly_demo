const { PREFACE, IOS_STEPS, ANDROID_STEPS } = require('../../data/install-guide');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    orderId: '',
    platform: 'ios',
    preface: PREFACE,
    iosSteps: IOS_STEPS,
    androidSteps: ANDROID_STEPS,
    activeSteps: IOS_STEPS,
  },

  onLoad(options) {
    const sys = wx.getSystemInfoSync();
    const platform = (sys.platform || '').toLowerCase().includes('ios') ? 'ios' : 'android';
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      orderId: options.orderId || '',
      platform,
      activeSteps: platform === 'ios' ? IOS_STEPS : ANDROID_STEPS,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onPlatformChange(e) {
    const { platform } = e.currentTarget.dataset;
    if (!platform || platform === this.data.platform) return;
    this.setData({
      platform,
      activeSteps: platform === 'ios' ? IOS_STEPS : ANDROID_STEPS,
    });
  },
});
