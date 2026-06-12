const { getJapanPlan, calcPricing } = require('../../data/plan-detail');
const { formatYuan } = require('../../utils/trip');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');
const { payAndCreateOrder } = require('../../utils/payment');

const MAX_QUANTITY = 9;
const PROMO_DISCOUNT_RATE = 0.2;

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    productTitle: '日本 eSIM·无限流量',
    productFlag: '',
    days: 7,
    quantity: 1,
    dailyAvgLabel: '0',
    originalTotalLabel: '¥0',
    discountLabel: '暂无',
    totalPrice: 0,
    totalPriceLabel: '¥0',
    payLabel: '立即支付 ¥0',
    promoCode: '',
    promoApplied: false,
    promoDiscountLabel: '',
    agreed: false,
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
    const { days, quantity, promoApplied } = this.data;
    const plan = this.plan;
    const pricing = calcPricing(plan.prices, days, quantity, plan.originalDaily);
    const promoDiscount = promoApplied
      ? Math.round(pricing.total * PROMO_DISCOUNT_RATE)
      : 0;
    const finalTotal = Math.max(0, pricing.total - promoDiscount);
    const totalPriceLabel = formatYuan(finalTotal);

    this.setData({
      dailyAvgLabel: pricing.dailyAvgLabel,
      originalTotalLabel: formatYuan(pricing.total),
      discountLabel: promoApplied ? `-${formatYuan(promoDiscount)}` : '暂无',
      promoDiscountLabel: promoApplied ? `-${formatYuan(promoDiscount)}` : '',
      totalPrice: finalTotal,
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

  onPromoInput(e) {
    this.setData({ promoCode: e.detail.value, promoApplied: false }, () => this.syncPricing());
  },

  onApplyPromo() {
    const code = (this.data.promoCode || '').trim();
    if (!code) {
      wx.showToast({ title: '请输入折扣码', icon: 'none' });
      return;
    }
    this.setData({ promoApplied: true }, () => this.syncPricing());
  },

  onRemovePromo() {
    this.setData({ promoApplied: false, promoCode: '' }, () => this.syncPricing());
  },

  onToggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },

  onConfirmPay() {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意协议', icon: 'none' });
      return;
    }
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
