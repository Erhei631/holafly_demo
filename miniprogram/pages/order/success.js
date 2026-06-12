const { getJapanPlan, calcPricing } = require('../../data/plan-detail');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    days: 7,
    quantity: 1,
    totalPriceLabel: '¥63',
    planLabel: '日本eSIM·7天',
    successTitle: '支付成功 ¥63',
    dailyAvgLabel: '9',
    esimReady: false,
  },

  onLoad(options) {
    const plan = getJapanPlan();
    const days = Math.max(1, Number(options.days) || 7);
    const quantity = Math.max(1, Number(options.quantity) || 1);
    const totalPriceLabel = decodeURIComponent(options.totalPriceLabel || '¥63');
    const pricing = calcPricing(plan.prices, days, quantity, plan.originalDaily);

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      days,
      quantity,
      totalPriceLabel,
      planLabel: `${plan.name}eSIM·${days}天`,
      successTitle: `支付成功 ${totalPriceLabel}`,
      dailyAvgLabel: pricing.dailyAvgLabel,
    });
  },

  onBack() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onSupportTap() {
    wx.navigateTo({ url: '/pages/support/index' });
  },

  onEnableNotify() {
    wx.showToast({ title: '已开启微信通知', icon: 'success' });
  },

  onEsimReady() {
    this.setData({ esimReady: true });
  },

  onShare() {
    wx.showToast({ title: '分享功能开发中', icon: 'none' });
  },

  onSaveQr() {
    const qrSrc = '/images/success/esim-qr.png';

    const saveToAlbum = (filePath) => {
      wx.saveImageToPhotosAlbum({
        filePath,
        success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
        fail: (err) => {
          const denied = err.errMsg && (
            err.errMsg.includes('auth deny')
            || err.errMsg.includes('authorize')
            || err.errMsg.includes('permission')
          );
          if (denied) {
            wx.showModal({
              title: '提示',
              content: '需要您授权保存图片到相册',
              confirmText: '去设置',
              success: (res) => {
                if (res.confirm) wx.openSetting();
              },
            });
            return;
          }
          wx.showToast({ title: '保存失败', icon: 'none' });
        },
      });
    };

    wx.getImageInfo({
      src: qrSrc,
      success: (res) => saveToAlbum(res.path),
      fail: () => wx.showToast({ title: '保存失败', icon: 'none' }),
    });
  },

  onInstallGuide() {
    wx.navigateTo({ url: '/pages/guide/install' });
  },
});
