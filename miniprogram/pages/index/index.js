const {
  POPULAR_COUNTRIES,
  MULTI_REGIONS,
  filterChips,
} = require('../../data/destinations');
const {
  HOME_POPULAR,
  ACTIVITY_FEED,
  HOME_REVIEWS,
  WHY_CHOOSE,
  HOME_COMPARE,
} = require('../../data/home');
const {
  VERSION_OPTIONS,
  METHOD_OPTIONS,
  POPULAR_MODELS,
  DIAL_HINT,
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
    destinationQuery: '香港',
    destinationDisplay: '香港',
    selectedDestinationId: 'hk',
    showDestinationDrawer: false,
    drawerKeyword: '',
    popularCountries: POPULAR_COUNTRIES,
    multiRegions: MULTI_REGIONS,
    filteredPopularCountries: POPULAR_COUNTRIES,
    filteredMultiRegions: MULTI_REGIONS,
    popularRecommendations: HOME_POPULAR,
    activityFeed: ACTIVITY_FEED,
    reviews: HOME_REVIEWS,
    whyChoose: WHY_CHOOSE,
    compare: HOME_COMPARE,
    showCompatSheet: false,
    compatVersions: VERSION_OPTIONS,
    compatMethods: METHOD_OPTIONS,
    compatModels: POPULAR_MODELS,
    compatDialHint: DIAL_HINT,
    compatDevice: DEVICE_INFO,
    compatVersion: 'global',
    compatMethod: 'model',
    compatSearch: '',
    filteredCompatModels: POPULAR_MODELS,
  },

  onLoad() {
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
    });
    this.refreshDrawerLists();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
  },

  noop() {},

  refreshDrawerLists() {
    const { drawerKeyword } = this.data;
    this.setData({
      filteredPopularCountries: filterChips(POPULAR_COUNTRIES, drawerKeyword),
      filteredMultiRegions: filterChips(MULTI_REGIONS, drawerKeyword),
    });
  },

  openDestinationDrawer() {
    this.setData({ showDestinationDrawer: true });
    this.refreshDrawerLists();
  },

  closeDestinationDrawer() {
    this.setData({ showDestinationDrawer: false, drawerKeyword: '' });
    this.refreshDrawerLists();
  },

  onDrawerSearchInput(e) {
    this.setData({ drawerKeyword: e.detail.value });
    this.refreshDrawerLists();
  },

  onSelectDestinationChip(e) {
    const { id, name } = e.currentTarget.dataset;
    this.setData({
      selectedDestinationId: id,
      destinationQuery: name,
      destinationDisplay: name,
      showDestinationDrawer: false,
      drawerKeyword: '',
    });
    this.refreshDrawerLists();
  },

  onPopularRecommendTap(e) {
    const { id, name } = e.currentTarget.dataset;
    const baseId = id.replace(/-2$/, '');
    this.setData({
      selectedDestinationId: baseId,
      destinationQuery: name,
      destinationDisplay: name,
    });
    this.navigateToPlans();
  },

  onViewPlansTap() {
    this.navigateToPlans();
  },

  navigateToPlans() {
    wx.navigateTo({
      url: '/pages/search/result?destination=日本&days=7',
    });
  },

  onClaimPromoTap() {
    wx.showToast({ title: '折扣码已复制', icon: 'success' });
  },

  onEsimCardTap() {
    wx.navigateTo({ url: '/pages/guide/esim' });
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
});
