const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

function isValidPhone(phone) {
  return /^1\d{10}$/.test(phone);
}

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    agreed: false,
    phone: '',
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

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value.replace(/\D/g, '').slice(0, 11) });
  },

  onGetSmsCode() {
    const { phone, agreed } = this.data;

    if (!isValidPhone(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    if (!agreed) {
      wx.showToast({ title: '请先阅读并同意服务协议及隐私协议', icon: 'none' });
      return;
    }

    let url = `/pages/auth/login-verify?phone=${phone}&redirect=${this.data.redirect}`;
    if (this.data.checkoutQuery) url += `&${this.data.checkoutQuery}`;
    wx.navigateTo({ url });
  },
});
