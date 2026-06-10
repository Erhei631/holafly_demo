Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      safeBottom: sys.safeAreaInsets ? sys.safeAreaInsets.bottom : 0,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onRefundRequest() {
    wx.showToast({ title: '退款申请（待开发）', icon: 'none' });
  },
});
