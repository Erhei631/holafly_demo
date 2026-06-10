Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    channels: [
      { id: 'chat', icon: '💬', title: '在线客服', desc: '24 小时中文客服，平均 5 分钟响应' },
      { id: 'wechat', icon: '📱', title: '微信客服', desc: '添加企业微信，获取安装协助' },
    ],
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

  onChannelTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({ title: `${id === 'chat' ? '在线客服' : '微信客服'}（待接入）`, icon: 'none' });
  },
});
