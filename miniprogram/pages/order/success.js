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

  onContinueBuy() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onGoOrders() {
    wx.switchTab({ url: '/pages/orders/index' });
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
