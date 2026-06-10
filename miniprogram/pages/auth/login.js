const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');
const { setPhoneSession } = require('../../utils/auth');

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    agreed: false,
    showAgreeModal: false,
    redirect: 'checkout',
    checkoutQuery: '',
  },

  onLoad(options) {
    const { redirect, ...checkoutOptions } = options;
    const checkoutQuery = Object.keys(checkoutOptions)
      .map((key) => `${key}=${encodeURIComponent(checkoutOptions[key])}`)
      .join('&');

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      redirect: redirect || 'checkout',
      checkoutQuery,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  onToggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },

  onShowAgreeModal() {
    this.setData({ showAgreeModal: true });
  },

  onAgreeModalCancel() {
    this.setData({ showAgreeModal: false });
  },

  onAgreeModalConfirm() {
    this.setData({ agreed: true, showAgreeModal: false });
  },

  onGetPhoneNumber(e) {
    this.setData({ agreed: true, showAgreeModal: false });
    const { errMsg, code } = e.detail;

    if (errMsg === 'getPhoneNumber:fail user deny' || errMsg.includes('user deny')) {
      wx.showToast({ title: '已取消授权', icon: 'none' });
      return;
    }

    if (errMsg !== 'getPhoneNumber:ok' || !code) {
      wx.showToast({ title: '获取手机号失败', icon: 'none' });
      return;
    }

    setPhoneSession({ phoneCode: code, method: 'wechatPhone' });
    wx.showToast({ title: '登录成功', icon: 'success', duration: 800 });
    setTimeout(() => this.goNext(), 800);
  },

  onSmsLogin() {
    const { redirect, checkoutQuery } = this.data;
    let url = `/pages/auth/login-sms?redirect=${redirect}`;
    if (checkoutQuery) url += `&${checkoutQuery}`;
    wx.navigateTo({ url });
  },

  onSkipLogin() {
    wx.navigateBack();
  },

  goNext() {
    const { redirect, checkoutQuery } = this.data;
    if (redirect === 'checkout' && checkoutQuery) {
      wx.redirectTo({ url: `/pages/order/checkout?${checkoutQuery}` });
      return;
    }
    wx.navigateBack();
  },
});
