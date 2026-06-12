const { getJapanPlan, buildDayChipOptions, calcPricing } = require('../../data/plan-detail');
const { WHY_CHOOSE } = require('../../data/home');
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
const {
  tripDays,
  formatShortLabel,
  formatRangeLabel,
  compareDate,
  getDateBounds,
  getDefaultTripDates,
} = require('../../utils/trip');
const {
  WEEKDAY_LABELS,
  buildCalendarMonths,
  decorateCalendarMonths,
  applyRangeTap,
  formatFooterDate,
} = require('../../utils/calendar-range');

const MAX_QUANTITY = 9;
const MAX_CUSTOM_DAYS = 90;

function buildAppSectionRows(sections) {
  return sections.map((section) => ({
    ...section,
    rows: Array.from({ length: Math.ceil(section.apps.length / 2) }, (_, index) =>
      section.apps.slice(index * 2, index * 2 + 2),
    ),
  }));
}

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    plan: getJapanPlan(),
    appSections: buildAppSectionRows(getJapanPlan().appSections),
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
    saveLabel: '官方立减40%省6元',
    footerMeta: ' / 7天',
    footerDaysLabel: '7天',
    footerQtyLabel: '× 1 eSIM',
    whyChoose: WHY_CHOOSE,
    selectedFaqTab: 'plan',
    filteredFaqItems: [],
    countdownH: '02',
    countdownM: '49',
    countdownS: '16',
    showDateRangeSheet: false,
    startDate: '',
    endDate: '',
    startDateLabel: '请选择',
    endDateLabel: '请选择',
    minDate: '',
    maxDate: '',
    weekdayLabels: WEEKDAY_LABELS,
    calendarMonths: [],
    customDaysPreview: 0,
    expandedFaqId: '',
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
  },

  onLoad(options) {
    const selectedDays = Number(options.days) || 7;
    const plan = getJapanPlan();
    const dayOptions = plan.dayOptions;
    const bounds = getDateBounds();
    const defaultDates = getDefaultTripDates(selectedDays);

    const resolvedDays = dayOptions.includes(selectedDays) ? selectedDays : 7;
    const resolvedQty = Math.max(1, Math.min(MAX_QUANTITY, Number(options.quantity) || 1));

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      plan,
      selectedDays: resolvedDays,
      quantity: resolvedQty,
      minDate: bounds.minDate,
      maxDate: bounds.maxDate,
      startDate: defaultDates.startDate,
      endDate: defaultDates.endDate,
      startDateLabel: formatShortLabel(defaultDates.startDate),
      endDateLabel: formatShortLabel(defaultDates.endDate),
      filteredFaqItems: this.filterFaqItems(plan.faqItems, 'plan'),
      ...this.buildCalendarPatch(defaultDates.startDate, defaultDates.endDate, bounds),
    }, () => {
      this.syncPricing();
      this.startCountdown();
    });
  },

  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  },

  startCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    let remaining = 2 * 3600 + 49 * 60 + 16;
    const tick = () => {
      if (remaining <= 0) remaining = 2 * 3600 + 49 * 60 + 16;
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      this.setData({
        countdownH: String(h).padStart(2, '0'),
        countdownM: String(m).padStart(2, '0'),
        countdownS: String(s).padStart(2, '0'),
      });
      remaining -= 1;
    };
    tick();
    this.countdownTimer = setInterval(tick, 1000);
  },

  buildCalendarPatch(startDate, endDate, boundsOverride) {
    const { minDate, maxDate } = boundsOverride || this.data;
    this.calendarMonthsBase = buildCalendarMonths(minDate, maxDate);
    const calendarMonths = decorateCalendarMonths(this.calendarMonthsBase, startDate, endDate);

    return {
      calendarMonths,
      startDate,
      endDate,
      startDateLabel: formatShortLabel(startDate),
      endDateLabel: formatShortLabel(endDate),
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

    const days = overrides.selectedDays != null ? overrides.selectedDays : selectedDays;
    const qty = overrides.quantity != null ? overrides.quantity : quantity;

    return {
      totalLabel: pricing.totalLabel,
      dailyAvgLabel: pricing.dailyAvgLabel,
      originalDaily: pricing.originalDaily,
      savePercent: pricing.savePercent,
      saveLabel: pricing.saveLabel,
      footerMeta: pricing.footerMeta,
      footerDaysLabel: `${days}天`,
      footerQtyLabel: `× ${qty} eSIM`,
    };
  },

  filterFaqItems(faqItems, tab) {
    return (faqItems || []).filter((item) => item.tab === tab);
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
      customDaysPreview: selectedDays,
      ...this.getPricingPatch({ selectedDays }),
    });
  },

  onCustomDaysTap() {
    const { startDate, endDate } = this.data;
    const calendarPatch = this.buildCalendarPatch(startDate, endDate);
    const customDaysPreview = calendarPatch.endDate
      ? tripDays(calendarPatch.startDate, calendarPatch.endDate)
      : 0;

    this.setData({
      showDateRangeSheet: true,
      customDaysPreview,
      ...calendarPatch,
    });
  },

  onCloseDateSheet() {
    this.setData({ showDateRangeSheet: false });
  },

  onCalendarDayTap(e) {
    const { date, disabled } = e.currentTarget.dataset;
    if (!date || Number(disabled)) return;

    const { startDate, endDate } = this.data;
    const next = applyRangeTap(date, startDate, endDate);
    const calendarMonths = decorateCalendarMonths(this.calendarMonthsBase, next.startDate, next.endDate);
    const customDaysPreview = next.endDate ? tripDays(next.startDate, next.endDate) : 0;

    this.setData({
      startDate: next.startDate,
      endDate: next.endDate,
      calendarMonths,
      customDaysPreview,
    });
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

  onCompatCardTap() {
    this.setData({ showCompatSheet: true });
  },

  onFaqTabTap(e) {
    const { tab } = e.currentTarget.dataset;
    if (!tab || tab === this.data.selectedFaqTab) return;
    this.setData({
      selectedFaqTab: tab,
      expandedFaqId: '',
      filteredFaqItems: this.filterFaqItems(this.data.plan.faqItems, tab),
    });
  },

  onFaqTap(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      expandedFaqId: this.data.expandedFaqId === id ? '' : id,
    });
  },

  onUsageGuideTap() {
    wx.navigateTo({ url: '/pages/guide/install' });
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

  onReviewsAllTap() {
    wx.showToast({ title: '全部评价（待开发）', icon: 'none' });
  },
});
