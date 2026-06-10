const { getJapanPlan, buildDayChipOptions, calcPricing } = require('../../data/plan-detail');
const {
  VERSION_OPTIONS,
  METHOD_OPTIONS,
  POPULAR_MODELS,
  DIAL_HINT,
} = require('../../data/compat-check');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');
const {
  tripDays,
  formatShortLabel,
  formatLongLabel,
  formatRangeLabel,
  compareDate,
  getDateBounds,
  getDefaultTripDates,
  buildYears,
  buildMonths,
  buildDays,
  indicesFromDate,
  dateFromIndices,
  clampPickerValue,
} = require('../../utils/trip');

const MAX_QUANTITY = 9;
const MAX_CUSTOM_DAYS = 90;

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    plan: getJapanPlan(),
    dayChipOptionsRow1: buildDayChipOptions(getJapanPlan().prices).slice(0, 3),
    dayChipOptionsRow2: buildDayChipOptions(getJapanPlan().prices).slice(3),
    selectedDays: 7,
    isCustomDays: false,
    customDaysLabel: '',
    quantity: 1,
    maxQuantity: MAX_QUANTITY,
    totalLabel: '63',
    dailyAvgLabel: '9',
    originalDaily: 15,
    savePercent: 40,
    footerMeta: '/ 7天',
    showDateRangeSheet: false,
    startDate: '',
    endDate: '',
    startDateLabel: '请选择',
    endDateLabel: '请选择',
    startDateLongLabel: '请选择',
    endDateLongLabel: '请选择',
    minDate: '',
    maxDate: '',
    endMinDate: '',
    pickerYears: [],
    pickerMonths: [],
    startPickerDays: [],
    endPickerDays: [],
    startPickerValue: [0, 0, 0],
    endPickerValue: [0, 0, 0],
    customDaysPreview: 0,
    expandedFaqId: '',
    showCompatSheet: false,
    compatVersions: VERSION_OPTIONS,
    compatMethods: METHOD_OPTIONS,
    compatModels: POPULAR_MODELS,
    compatDialHint: DIAL_HINT,
    compatVersion: 'global',
    compatMethod: 'model',
    compatSearch: '',
    filteredCompatModels: POPULAR_MODELS,
  },

  onLoad(options) {
    const selectedDays = Number(options.days) || 7;
    const plan = getJapanPlan();
    const dayOptions = plan.dayOptions;
    const bounds = getDateBounds();
    const defaultDates = getDefaultTripDates(selectedDays);

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      plan,
      selectedDays: dayOptions.includes(selectedDays) ? selectedDays : 7,
      quantity: Math.max(1, Math.min(MAX_QUANTITY, Number(options.quantity) || 1)),
      minDate: bounds.minDate,
      maxDate: bounds.maxDate,
      endMinDate: bounds.minDate,
      startDate: defaultDates.startDate,
      endDate: defaultDates.endDate,
      startDateLabel: formatShortLabel(defaultDates.startDate),
      endDateLabel: formatShortLabel(defaultDates.endDate),
      ...this.buildPickerPatch(defaultDates.startDate, defaultDates.endDate, bounds),
    }, () => this.syncPricing());
  },

  buildPickerPatch(startDate, endDate, boundsOverride) {
    const { minDate, maxDate } = boundsOverride || this.data;
    const pickerYears = buildYears(minDate, maxDate);
    const pickerMonths = buildMonths();

    const startPickerValue = clampPickerValue(
      indicesFromDate(startDate, pickerYears),
      pickerYears,
      minDate,
      maxDate,
    );
    const startYear = pickerYears[startPickerValue[0]];
    const startMonth = pickerMonths[startPickerValue[1]];
    const startPickerDays = buildDays(startYear, startMonth);
    const safeStartValue = [...startPickerValue];
    if (safeStartValue[2] >= startPickerDays.length) {
      safeStartValue[2] = startPickerDays.length - 1;
    }
    const safeStartDate = dateFromIndices(pickerYears, safeStartValue);

    const endPickerValue = clampPickerValue(
      indicesFromDate(endDate, pickerYears),
      pickerYears,
      safeStartDate,
      maxDate,
    );
    const endYear = pickerYears[endPickerValue[0]];
    const endMonth = pickerMonths[endPickerValue[1]];
    const endPickerDays = buildDays(endYear, endMonth);
    const safeEndValue = [...endPickerValue];
    if (safeEndValue[2] >= endPickerDays.length) {
      safeEndValue[2] = endPickerDays.length - 1;
    }
    const safeEndDate = dateFromIndices(pickerYears, safeEndValue);

    return {
      pickerYears,
      pickerMonths,
      startPickerDays,
      endPickerDays,
      startPickerValue: safeStartValue,
      endPickerValue: safeEndValue,
      startDate: safeStartDate,
      endDate: safeEndDate,
      startDateLabel: formatShortLabel(safeStartDate),
      endDateLabel: formatShortLabel(safeEndDate),
      startDateLongLabel: formatLongLabel(safeStartDate),
      endDateLongLabel: formatLongLabel(safeEndDate),
      endMinDate: safeStartDate,
    };
  },

  getPricingPatch(overrides = {}) {
    const { plan, selectedDays, quantity } = { ...this.data, ...overrides };
    const pricing = calcPricing(
      plan.prices,
      selectedDays,
      quantity,
      plan.originalDaily,
    );

    return {
      totalLabel: pricing.totalLabel,
      dailyAvgLabel: pricing.dailyAvgLabel,
      originalDaily: pricing.originalDaily,
      savePercent: pricing.savePercent,
      footerMeta: pricing.footerMeta,
    };
  },

  syncPricing() {
    this.setData(this.getPricingPatch());
  },

  noop() {},

  onBack() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onSupportTap() {
    wx.navigateTo({ url: '/pages/support/index' });
  },

  onDaySelect(e) {
    const { days } = e.currentTarget.dataset;
    const selectedDays = Number(days);
    const defaultDates = getDefaultTripDates(selectedDays);

    this.setData({
      selectedDays,
      isCustomDays: false,
      customDaysLabel: '',
      startDate: defaultDates.startDate,
      endDate: defaultDates.endDate,
      startDateLabel: formatShortLabel(defaultDates.startDate),
      endDateLabel: formatShortLabel(defaultDates.endDate),
      endMinDate: defaultDates.startDate,
      customDaysPreview: selectedDays,
      ...this.getPricingPatch({ selectedDays }),
    });
  },

  onCustomDaysTap() {
    const { startDate, endDate } = this.data;
    const pickerPatch = this.buildPickerPatch(startDate, endDate);
    const customDaysPreview = tripDays(pickerPatch.startDate, pickerPatch.endDate);

    this.setData({
      showDateRangeSheet: true,
      customDaysPreview,
      ...pickerPatch,
    });
  },

  onCloseDateSheet() {
    this.setData({ showDateRangeSheet: false });
  },

  onStartPickerChange(e) {
    const { pickerYears, minDate, maxDate, endDate } = this.data;
    const startPickerValue = clampPickerValue(e.detail.value, pickerYears, minDate, maxDate);
    const startDate = dateFromIndices(pickerYears, startPickerValue);
    let nextEndDate = endDate;
    if (!nextEndDate || compareDate(nextEndDate, startDate) < 0) {
      nextEndDate = startDate;
    }
    const patch = this.buildPickerPatch(startDate, nextEndDate);
    patch.customDaysPreview = tripDays(patch.startDate, patch.endDate);
    this.setData(patch);
  },

  onEndPickerChange(e) {
    const { pickerYears, startDate, maxDate } = this.data;
    const endPickerValue = clampPickerValue(e.detail.value, pickerYears, startDate, maxDate);
    const endDate = dateFromIndices(pickerYears, endPickerValue);
    const patch = this.buildPickerPatch(startDate, endDate);
    patch.customDaysPreview = tripDays(patch.startDate, patch.endDate);
    this.setData(patch);
  },

  onConfirmDateRange() {
    const { startDate, endDate } = this.data;

    if (!startDate || !endDate) {
      wx.showToast({ title: '请选择出发与返回日期', icon: 'none' });
      return;
    }

    if (compareDate(endDate, startDate) < 0) {
      wx.showToast({ title: '返回日期不能早于出发', icon: 'none' });
      return;
    }

    const days = tripDays(startDate, endDate);
    if (days > MAX_CUSTOM_DAYS) {
      wx.showToast({ title: `最多支持 ${MAX_CUSTOM_DAYS} 天`, icon: 'none' });
      return;
    }

    this.setData({
      selectedDays: days,
      isCustomDays: true,
      customDaysLabel: formatRangeLabel(startDate, endDate),
      showDateRangeSheet: false,
      customDaysPreview: days,
      ...this.getPricingPatch({ selectedDays: days }),
    });
  },

  onQtyMinus() {
    const { quantity } = this.data;
    if (quantity <= 1) return;
    this.setData({
      quantity: quantity - 1,
      ...this.getPricingPatch({ quantity: quantity - 1 }),
    });
  },

  onQtyPlus() {
    const { quantity, maxQuantity } = this.data;
    if (quantity >= maxQuantity) return;
    this.setData({
      quantity: quantity + 1,
      ...this.getPricingPatch({ quantity: quantity + 1 }),
    });
  },

  onCheckout() {
    const { plan, selectedDays, quantity } = this.data;
    const unitPrice = plan.prices[selectedDays]
      || Math.round((plan.prices[7] / 7) * selectedDays);
    const totalPrice = unitPrice * quantity;
    const query = [
      `destination=${encodeURIComponent(plan.name)}`,
      `days=${selectedDays}`,
      `quantity=${quantity}`,
      `unitPrice=${unitPrice}`,
      `totalPrice=${totalPrice}`,
    ].join('&');

    wx.navigateTo({ url: `/pages/auth/login?redirect=checkout&${query}` });
  },

  onFaqTap(e) {
    const { action, id } = e.currentTarget.dataset;
    if (action === 'compat') {
      this.setData({ showCompatSheet: true });
      return;
    }
    this.setData({
      expandedFaqId: this.data.expandedFaqId === id ? '' : id,
    });
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

  onReviewsAllTap() {
    wx.showToast({ title: '全部评价（待开发）', icon: 'none' });
  },
});
