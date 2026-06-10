const { getSafeAreaBottom } = require('../utils/safe-area');

Component({
  data: {
    selected: 0,
    safeBottom: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: '/images/home/tab-home-inactive.svg',
        iconActive: '/images/home/tab-home.svg',
      },
      {
        pagePath: '/pages/orders/index',
        text: '订单',
        icon: '/images/home/tab-orders.svg',
        iconActive: '/images/home/tab-orders-active.svg',
      },
      {
        pagePath: '/pages/profile/index',
        text: '我的',
        icon: '/images/home/tab-profile.svg',
        iconActive: '/images/home/tab-profile-active.svg',
      },
    ],
  },

  lifetimes: {
    attached() {
      this.setData({ safeBottom: getSafeAreaBottom() });
    },
  },

  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset;
      if (this.data.selected === index) return;
      wx.switchTab({ url: path });
    },
  },
});
