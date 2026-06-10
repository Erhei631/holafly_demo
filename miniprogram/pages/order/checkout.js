const { getJapanPlan } = require('../../data/plan-detail');
const { formatYuan } = require('../../utils/trip');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');
const { payAndCreateOrder } = require('../../utils/payment');

const MAX_QUANTITY = 9;

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    productTitle: '日本eSIM',
    productFlag: '',
    days: 7,
    quantity: 1,
    maxQuantity: MAX_QUANTITY,
    originalTotalLabel: '¥0',
    totalPrice: 0,
    totalPriceLabel: '¥0',
    payLabel: '立即支付 ¥0',
    showPromoDrawer: false,
    promoCode: '',
  },

  onLoad(options) {
    const plan = getJapanPlan();
    const days = Math.max(1, Number(options.days) || 7);
    const quantity = Math.max(1, Number(options.quantity) || 1);

    this.plan = plan;
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      productTitle: plan.title,
      productFlag: plan.flag,
      days,
      quantity: Math.min(quantity, MAX_QUANTITY),
    }, () => this.syncPricing());
  },

  syncPricing() {
    const { days, quantity } = this.data;
    const plan = this.plan;
    const unitTotal = plan.prices[days]
      || Math.round((plan.prices[7] / 7) * days);
    const totalPrice = unitTotal * quantity;
    const originalTotal = totalPrice;
    const totalPriceLabel = formatYuan(totalPrice);

    this.setData({
      originalTotalLabel: formatYuan(originalTotal),
      totalPrice,
      totalPriceLabel,
      payLabel: `立即支付 ${totalPriceLabel}`,
    });
  },

  onBack() {
    const { days, quantity } = this.data;
    const destination = this.plan?.name || '日本';
    wx.redirectTo({
      url: `/pages/search/result?destination=${encodeURIComponent(destination)}&days=${days}&quantity=${quantity}`,
    });
  },

  noop() {},

  onPromoTap() {
    this.setData({ showPromoDrawer: true });
  },

  closePromoDrawer() {
    this.setData({ showPromoDrawer: false });
  },

  onPromoInput(e) {
    this.setData({ promoCode: e.detail.value });
  },

  onApplyPromo() {
    const code = (this.data.promoCode || '').trim();
    if (!code) {
      wx.showToast({ title: '请输入折扣码', icon: 'none' });
      return;
    }
    this.setData({ showPromoDrawer: false });
    wx.showToast({ title: '折扣码已提交', icon: 'none' });
  },

  onConfirmPay() {
    if (this.paying) return;
    this.paying = true;

    const {
      productTitle, days, quantity, totalPriceLabel, totalPrice,
    } = this.data;
    const orderMeta = {
      destination: productTitle,
      days,
      quantity,
      totalPriceLabel,
      dateRange: `${days} 天行程`,
    };

    wx.showLoading({ title: '发起支付...', mask: true });

    payAndCreateOrder({
      description: `${productTitle} · ${days}天`,
      amountFen: Math.round(totalPrice * 100),
      orderMeta,
    })
      .then(() => {
        wx.hideLoading();
        const query = [
          `productTitle=${encodeURIComponent(productTitle)}`,
          `days=${days}`,
          `quantity=${quantity}`,
          `totalPriceLabel=${encodeURIComponent(totalPriceLabel)}`,
        ].join('&');
        wx.redirectTo({ url: `/pages/order/success?${query}` });
      })
      .catch((err) => {
        wx.hideLoading();
        if (!err.cancelled) {
          wx.showToast({ title: err.message || '支付失败', icon: 'none' });
        }
      })
      .finally(() => {
        this.paying = false;
      });
  },
});
