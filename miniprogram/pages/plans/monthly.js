const PLANS = [
  {
    id: 'light',
    name: 'Light 方案',
    badge: '首发限时特惠价',
    popular: false,
    headline: '25GB 流量',
    services: '流量、热点',
    features: [
      '25GB 流量',
      '支持热点分享',
      '网络涵盖全球',
      '可随时取消',
      '内含 Always On',
    ],
    price: '¥387.95',
    cta: '立即购买 Light 方案',
  },
  {
    id: 'unlimited',
    name: 'Unlimited 方案',
    badge: '首发限时特惠价',
    popular: true,
    popularLabel: '热门之选',
    headline: '无限流量',
    services: '流量、热点、短信',
    features: [
      '无需流量与热点分享限制',
      '网络涵盖全球',
      '可随时取消',
      '含当地门号以接收短信',
      '内含 Always On',
    ],
    price: '¥504.90',
    cta: '立即购买 Unlimited 方案',
  },
];

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    plans: PLANS,
    currentIndex: 0,
    currentPlan: PLANS[0],
    footerCta: PLANS[0].cta,
  },

  onLoad(options) {
    const sys = wx.getSystemInfoSync();
    this._fromHome = options.from === 'home';
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      safeBottom: sys.safeAreaInsets ? sys.safeAreaInsets.bottom : 0,
    });
  },

  onBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
      return;
    }
    if (this._fromHome) {
      wx.redirectTo({ url: '/pages/index/index' });
      return;
    }
    wx.navigateBack();
  },

  onSwiperChange(e) {
    const currentIndex = e.detail.current;
    const currentPlan = PLANS[currentIndex];
    this.setData({
      currentIndex,
      currentPlan,
      footerCta: currentPlan.cta,
    });
  },

  onBuy() {
    const { currentPlan } = this.data;
    wx.showToast({ title: `${currentPlan.name}（待开发）`, icon: 'none' });
  },
});
