const { createOrder } = require('./orders');

/** 商户后端统一下单接口，返回 wx.requestPayment 所需参数 */
const PREPAY_API = '';

function parsePayError(err) {
  const msg = err?.errMsg || err?.message || '';
  if (msg.includes('cancel')) {
    return { cancelled: true, message: '已取消支付' };
  }
  return { cancelled: false, message: '支付失败，请重试' };
}

function fetchPrepayParams(payload) {
  if (PREPAY_API) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: PREPAY_API,
        method: 'POST',
        data: payload,
        success(res) {
          const data = res.data || {};
          if (res.statusCode >= 200 && res.statusCode < 300 && data.timeStamp) {
            resolve(data);
            return;
          }
          reject(new Error(data.message || '下单失败'));
        },
        fail: () => reject(new Error('网络异常，请稍后重试')),
      });
    });
  }

  return Promise.resolve({
    timeStamp: String(Math.floor(Date.now() / 1000)),
    nonceStr: `hf_${Date.now()}`,
    package: 'prepay_id=wx_prepay_demo',
    signType: 'RSA',
    paySign: 'demo_pay_sign',
  });
}

function requestWeChatPay(orderPayload) {
  const { description, amountFen, orderMeta } = orderPayload;

  return fetchPrepayParams({
    description,
    amountFen,
    orderMeta,
  }).then((params) => new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType || 'RSA',
      paySign: params.paySign,
      success: resolve,
      fail: (err) => reject(parsePayError(err)),
    });
  }));
}

function payAndCreateOrder(orderPayload) {
  return requestWeChatPay(orderPayload).then(() => createOrder(orderPayload.orderMeta));
}

module.exports = {
  requestWeChatPay,
  payAndCreateOrder,
};
