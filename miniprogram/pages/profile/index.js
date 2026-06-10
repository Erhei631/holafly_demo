const { MENU_ITEMS } = require('../../data/profile');
const { getAuthSession, isLoggedIn, maskPhone } = require('../../utils/auth');
const { getStatusBarHeight } = require('../../utils/safe-area');

Page({
  data: {
    statusBarHeight: 20,
    phoneLabel: '点击登录',
    menuItems: MENU_ITEMS,
  },

  onLoad() {
    this.setData({ statusBarHeight: getStatusBarHeight() });
    this.syncUser();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    this.syncUser();
  },

  syncUser() {
    if (!isLoggedIn()) {
      this.setData({ phoneLabel: '点击登录' });
      return;
    }
    const session = getAuthSession();
    const phone = session && session.phone;
    this.setData({
      phoneLabel: phone ? maskPhone(phone) : '138****8888',
    });
  },

  onUserTap() {
    if (isLoggedIn()) return;
    wx.navigateTo({ url: '/pages/auth/login' });
  },

  onMenuTap(e) {
    const { url, tab, action } = e.currentTarget.dataset;
    if (tab) {
      wx.switchTab({ url: tab });
      return;
    }
    if (url) {
      wx.navigateTo({ url });
      return;
    }
    if (action === 'terms') {
      wx.showToast({ title: '服务条款（待上线）', icon: 'none' });
      return;
    }
    if (action === 'privacy') {
      wx.showToast({ title: '隐私政策（待上线）', icon: 'none' });
    }
  },
});
