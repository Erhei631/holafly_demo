const { buildCountryView, buildRegionView } = require('../../data/destination-page');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    tab: 'country',
    keyword: '',
    selectedId: '',
    popular: [],
    groups: [],
    indexLetters: [],
    regions: [],
    empty: false,
    scrollIntoView: '',
  },

  onLoad(options) {
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      selectedId: options.selected || '',
    });
    this.refreshView();
  },

  refreshView() {
    const { tab, keyword } = this.data;
    if (tab === 'region') {
      const view = buildRegionView(keyword);
      this.setData({
        popular: [],
        groups: [],
        indexLetters: [],
        regions: view.regions,
        empty: view.empty,
      });
      return;
    }

    const view = buildCountryView(keyword);
    this.setData({
      popular: view.popular,
      groups: view.groups,
      indexLetters: view.indexLetters,
      regions: [],
      empty: view.empty,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onTabChange(e) {
    const { tab } = e.currentTarget.dataset;
    if (tab === this.data.tab) return;
    this.setData({ tab, scrollIntoView: '' });
    this.refreshView();
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value, scrollIntoView: '' });
    this.refreshView();
  },

  onIndexTap(e) {
    const { letter } = e.currentTarget.dataset;
    this.setData({ scrollIntoView: `section-${letter}` });
  },

  onSelectDestination(e) {
    const { name } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/search/result?destination=${encodeURIComponent(name)}&days=7`,
    });
  },
});
