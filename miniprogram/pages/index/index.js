const {
  HOME_POPULAR,
  ACTIVITY_FEED,
  HOME_REVIEWS,
  WHY_CHOOSE,
  HOME_COMPARE,
  HOME_USAGE_STEPS,
} = require('../../data/home');
const {
  VERSION_OPTIONS,
  METHOD_OPTIONS,
  POPULAR_MODELS,
  DIAL_INTRO_TITLE,
  DIAL_STEPS,
  DIAL_RESULTS,
  DEVICE_INFO,
} = require('../../data/compat-check');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDateStr(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    destinationQuery: '',
    destinationDisplay: '去选择',
    destinationSelected: false,
    selectedDestinationId: '',
    popularRecommendations: HOME_POPULAR,
    activityFeed: ACTIVITY_FEED,
    reviews: HOME_REVIEWS,
    whyChoose: WHY_CHOOSE,
    compare: HOME_COMPARE,
    usageSteps: HOME_USAGE_STEPS,
    showCompatSheet: false,
    compatVersions: VERSION_OPTIONS,
    compatMethods: METHOD_OPTIONS,
    compatModels: POPULAR_MODELS,
    compatDialIntroTitle: DIAL_INTRO_TITLE,
    compatDialSteps: DIAL_STEPS,
    compatDialResults: DIAL_RESULTS,
    compatDevice: DEVICE_INFO,
    compatVersion: 'global',
    compatMethod: 'model',
    compatSearch: '',
    filteredCompatModels: POPULAR_MODELS,
    promoIndex: 0,
  },

  onLoad() {
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
  },

  noop() {},

  openDestinationDrawer() {
    wx.navigateTo({ url: '/pages/destination/index' });
  },

  onDestinationPicked({ id, name }) {
    this.setData({
      selectedDestinationId: id,
      destinationQuery: name,
      destinationDisplay: name,
      destinationSelected: true,
    });
  },

  onPopularRecommendTap(e) {
    const { id, name } = e.currentTarget.dataset;
    const baseId = id.replace(/-2$/, '');
    this.setData({
      selectedDestinationId: baseId,
      destinationQuery: name,
      destinationDisplay: name,
      destinationSelected: true,
    });
    this.navigateToPlans();
  },

  navigateToPlans() {
    wx.navigateTo({
      url: '/pages/search/result?destination=日本&days=7',
    });
  },

  onPromoChange(e) {
    this.setData({ promoIndex: e.detail.current });
  },

  onClaimPromoTap() {
    wx.showToast({ title: '折扣码已复制', icon: 'success' });
  },

  onEsimCardTap() {
    wx.navigateTo({ url: '/pages/guide/esim' });
  },

  onUsageGuideTap() {
    wx.navigateTo({ url: '/pages/guide/install' });
  },

  onCompatCardTap() {
    this.setData({ showCompatSheet: true });
  },

  onCloseCompatSheet() {
    this.setData({ showCompatSheet: false });
  },

  onCompatVersionTap(e) {
    const { version } = e.currentTarget.dataset;
    this.setData({ compatVersion: version });
  },

  onCompatMethodTap(e) {
    const { method } = e.currentTarget.dataset;
    this.setData({ compatMethod: method });
  },

  onCompatSearchInput(e) {
    const compatSearch = e.detail.value.trim();
    const keyword = compatSearch.toLowerCase();
    const filteredCompatModels = keyword
      ? POPULAR_MODELS.filter((item) => item.name.toLowerCase().includes(keyword))
      : POPULAR_MODELS;

    this.setData({ compatSearch, filteredCompatModels });
  },

  onCompatDialResultTap(e) {
    const { result } = e.currentTarget.dataset;
    const message = result === 'eid' ? '您的设备支持 eSIM' : '您的设备可能不支持 eSIM';
    wx.showToast({ title: message, icon: 'none' });
    this.setData({ showCompatSheet: false });
  },
});
