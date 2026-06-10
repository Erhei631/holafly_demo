const { getOrderById } = require('../../utils/orders');
const { getSafeAreaBottom, getStatusBarHeight } = require('../../utils/safe-area');

const STATUS_DETAIL = {
  pending_install: { label: '待激活', tone: 'pending' },
  active: { label: '使用中', tone: 'active' },
  expired: { label: '已完成', tone: 'done' },
};

function getEsimSlot(order, index) {
  const slots = order.esimSlots;
  if (slots && slots[index - 1]) return slots[index - 1];
  const fallback = STATUS_DETAIL[order.status] || STATUS_DETAIL.pending_install;
  return { label: fallback.label, tone: fallback.tone, used: false };
}

function getEsimView(order, index) {
  const slot = getEsimSlot(order, index);
  return {
    esimBadgeLabel: slot.label,
    esimBadgeTone: slot.tone,
    esimQrUsed: Boolean(slot.used),
  };
}

Page({
  data: {
    statusBarHeight: 20,
    safeBottom: 0,
    order: null,
    planLabel: '',
    badgeLabel: '',
    badgeTone: 'pending',
    showQr: false,
    esimIndex: 1,
    esimTotal: 1,
    esimBadgeLabel: '',
    esimBadgeTone: 'pending',
    esimQrUsed: false,
  },

  onLoad(options) {
    const order = getOrderById(options.id);
    if (!order) {
      wx.showToast({ title: '订单不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    const detailStatus = STATUS_DETAIL[order.status] || STATUS_DETAIL.pending_install;
    const planLabel = `${order.destination}eSIM·${order.days}天`;

    const esimTotal = Math.max(1, order.quantity || 1);
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      safeBottom: getSafeAreaBottom(),
      order,
      planLabel,
      badgeLabel: detailStatus.label,
      badgeTone: detailStatus.tone,
      showQr: order.status === 'pending_install' || order.status === 'active',
      esimIndex: 1,
      esimTotal,
      ...getEsimView(order, 1),
    });
  },

  syncEsimView(index) {
    const { order } = this.data;
    if (!order) return;
    this.setData({
      esimIndex: index,
      ...getEsimView(order, index),
    });
  },

  onPrevEsim() {
    const { esimIndex } = this.data;
    if (esimIndex <= 1) return;
    this.syncEsimView(esimIndex - 1);
  },

  onNextEsim() {
    const { esimIndex, esimTotal } = this.data;
    if (esimIndex >= esimTotal) return;
    this.syncEsimView(esimIndex + 1);
  },

  onBack() {
    wx.navigateBack();
  },

  onSupportTap() {
    wx.navigateTo({ url: '/pages/support/index' });
  },

  onInstallGuide() {
    const { order } = this.data;
    wx.navigateTo({
      url: `/pages/guide/install?orderId=${encodeURIComponent(order ? order.id : '')}`,
    });
  },

  onSaveQr() {
    wx.showToast({ title: '长按二维码保存', icon: 'none' });
  },

  onCopyOrderNo() {
    const { order } = this.data;
    if (!order) return;
    wx.setClipboardData({
      data: order.orderNo,
      success: () => wx.showToast({ title: '已复制', icon: 'success' }),
    });
  },

  onInvoice() {
    wx.showToast({ title: '申请开票（待开发）', icon: 'none' });
  },

  onRefund() {
    const { order } = this.data;
    wx.navigateTo({
      url: `/pages/support/refund?orderId=${encodeURIComponent(order ? order.id : '')}`,
    });
  },
});
