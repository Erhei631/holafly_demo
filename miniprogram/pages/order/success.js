const { getJapanPlan } = require('../../data/plan-detail');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    productTitle: '日本eSIM',
    days: 7,
    quantity: 1,
    totalPriceLabel: '¥63',
    planLabel: '日本eSIM·7天',
    successTitle: '支付成功 ¥63',
    esimReady: false,
  },

  onLoad(options) {
    const plan = getJapanPlan();
    const days = Math.max(1, Number(options.days) || 7);
    const quantity = Math.max(1, Number(options.quantity) || 1);
    const totalPriceLabel = decodeURIComponent(options.totalPriceLabel || '¥63');
    const productTitle = decodeURIComponent(options.productTitle || plan.title);

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      productTitle,
      days,
      quantity,
      totalPriceLabel,
      planLabel: `${productTitle}·${days}天`,
      successTitle: `支付成功 ${totalPriceLabel}`,
    });
  },

  onBack() {
    wx.switchTab({ url: '/pages/orders/index' });
  },

  onSupportTap() {
    wx.navigateTo({ url: '/pages/support/index' });
  },

  onEnableNotify() {
    wx.showToast({ title: '已开启微信通知', icon: 'success' });
  },

  onQrTap() {
    if (this.data.esimReady) return;
    this.setData({ esimReady: true });
  },

  onSaveQr() {
    wx.saveImageToPhotosAlbum({
      filePath: '/images/success/esim-qr.png',
      success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
      fail: () => wx.showToast({ title: '保存失败', icon: 'none' }),
    });
  },

  onInstallGuide() {
    wx.navigateTo({ url: '/pages/guide/install' });
  },
});
