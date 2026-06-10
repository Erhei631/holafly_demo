Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    orderId: '',
    platform: 'ios',
  },

  onLoad(options) {
    const sys = wx.getSystemInfoSync();
    const platform = (sys.platform || '').toLowerCase().includes('ios') ? 'ios' : 'android';
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      safeBottom: sys.safeAreaInsets ? sys.safeAreaInsets.bottom : 0,
      orderId: options.orderId || '',
      platform,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onPlatformChange(e) {
    this.setData({ platform: e.currentTarget.dataset.platform });
  },

  onSupport() {
    wx.navigateTo({ url: '/pages/support/index' });
  },
});
