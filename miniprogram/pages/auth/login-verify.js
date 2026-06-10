const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');
const { setPhoneSession, maskPhone } = require('../../utils/auth');

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    phone: '',
    phoneMasked: '',
    code: '',
    codeDigits: [],
    activeIndex: 0,
    canSubmit: false,
    countdown: RESEND_SECONDS,
    canResend: false,
    redirect: 'checkout',
    checkoutQuery: '',
  },

  onLoad(options) {
    const { phone, redirect, ...checkoutOptions } = options;
    const checkoutQuery = Object.keys(checkoutOptions)
      .map((key) => `${key}=${encodeURIComponent(checkoutOptions[key])}`)
      .join('&');

    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      phone: phone || '',
      phoneMasked: maskPhone(phone || ''),
      redirect: redirect || 'checkout',
      checkoutQuery,
      codeDigits: Array(CODE_LENGTH).fill(''),
    }, () => this.startCountdown());
  },

  onUnload() {
    this.clearCountdown();
  },

  startCountdown() {
    this.clearCountdown();
    this.setData({ countdown: RESEND_SECONDS, canResend: false });
    this.countdownTimer = setInterval(() => {
      const next = this.data.countdown - 1;
      if (next <= 0) {
        this.clearCountdown();
        this.setData({ countdown: 0, canResend: true });
        return;
      }
      this.setData({ countdown: next });
    }, 1000);
  },

  clearCountdown() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  },

  onBack() {
    wx.navigateBack();
  },

  onFocusCode() {
    this.setData({ activeIndex: this.data.code.length });
  },

  onCodeInput(e) {
    const code = e.detail.value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    const codeDigits = Array(CODE_LENGTH).fill('');
    code.split('').forEach((digit, index) => {
      codeDigits[index] = digit;
    });

    this.setData({
      code,
      codeDigits,
      activeIndex: Math.min(code.length, CODE_LENGTH - 1),
      canSubmit: code.length === CODE_LENGTH,
    });
  },

  onResend() {
    if (!this.data.canResend) return;
    wx.showToast({ title: '验证码已重新发送', icon: 'success' });
    this.startCountdown();
  },

  onSubmit() {
    const { code, phone, canSubmit } = this.data;
    if (!canSubmit) return;

    if (code.length !== CODE_LENGTH) {
      wx.showToast({ title: '请输入完整验证码', icon: 'none' });
      return;
    }

    setPhoneSession({ phone, code, method: 'sms' });
    wx.showToast({ title: '登录成功', icon: 'success', duration: 800 });
    setTimeout(() => this.goNext(), 800);
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
