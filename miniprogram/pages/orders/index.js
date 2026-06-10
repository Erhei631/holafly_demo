const { getOrders, filterOrders } = require('../../utils/orders');

const TABS = [
  { id: 'all', name: '全部' },
  { id: 'pending_install', name: '待安装' },
  { id: 'active', name: '使用中' },
];

Page({
  data: {
    statusBarHeight: 20,
    tabs: TABS,
    activeTab: 'all',
    orders: [],
    isEmpty: true,
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    this.setData({ statusBarHeight: sys.statusBarHeight });
    this.refreshOrders();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    this.refreshOrders();
  },

  refreshOrders() {
    const all = getOrders();
    const orders = filterOrders(all, this.data.activeTab);
    this.setData({
      orders,
      isEmpty: orders.length === 0,
    });
  },

  onTabChange(e) {
    const activeTab = e.currentTarget.dataset.id;
    this.setData({ activeTab }, () => this.refreshOrders());
  },

  onGoHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onInstallGuide(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/guide/install?orderId=${encodeURIComponent(id || '')}`,
    });
  },

  onSupport() {
    wx.navigateTo({ url: '/pages/support/index' });
  },

  onOrderDetail(e) {
    const { id } = e.currentTarget.dataset;
    if (!id) return;
    wx.navigateTo({ url: `/pages/orders/detail?id=${encodeURIComponent(id)}` });
  },

  stopBubble() {},
});
