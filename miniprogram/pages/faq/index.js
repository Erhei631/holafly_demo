const FAQ_ITEMS = [
  {
    id: 'esim',
    q: '什么是 eSIM？',
    a: 'eSIM 是嵌入手机的数字 SIM，无需更换实体卡即可购买并激活境外流量套餐。',
  },
  {
    id: 'when',
    q: '什么时候安装最合适？',
    a: '建议出发前在有 Wi-Fi 的环境完成安装；抵达目的地后再开启数据漫游使用流量。',
  },
  {
    id: 'unlimited',
    q: '「无限流量」如何理解？',
    a: '套餐在公平使用政策（FUP）内提供充足高速流量，极端高用量可能限速，详见套餐说明。',
  },
  {
    id: 'refund',
    q: '买错了可以退款吗？',
    a: '未安装或未激活的订单可申请退款，已激活订单按退款政策处理，详见「退款说明」。',
  },
];

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    items: FAQ_ITEMS,
    expandedId: 'esim',
  },

  onLoad(options) {
    const sys = wx.getSystemInfoSync();
    const topic = options.topic || '';
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      safeBottom: sys.safeAreaInsets ? sys.safeAreaInsets.bottom : 0,
      expandedId: topic === 'esim' ? 'esim' : 'esim',
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onToggle(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      expandedId: this.data.expandedId === id ? '' : id,
    });
  },
});
