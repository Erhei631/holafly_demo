const esimAbout = require('../../data/esim-about');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    intro: esimAbout.intro,
    stats: esimAbout.stats,
    compare: esimAbout.compare,
    benefits: esimAbout.benefits,
  },

  onLoad() {
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
    });
  },

  onBack() {
    wx.navigateBack();
  },
});
