/** 日本 eSIM 详情 — Figma 144:147 */
const JAPAN_PLAN = {
  id: 'jp',
  name: '日本',
  title: '日本eSIM',
  flag: '/images/detail/flag-jp.png',
  hero: '/images/detail/hero-jp.png',
  dayOptions: [1, 3, 5, 7, 10, 15],
  prices: { 1: 15, 3: 35, 5: 48, 7: 63, 10: 85, 15: 120 },
  originalDaily: 15,
  features: [
    { id: 'data', label: '无限流量', icon: '/images/detail/tag-data.svg' },
    { id: 'speed', label: '高速稳网', icon: '/images/detail/tag-speed.svg' },
    { id: 'roam', label: '无漫游费', icon: '/images/detail/tag-roam.svg' },
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Tina',
      rating: '4.7',
      text: '到机场出关 30 秒装好就有信号，比租 Wifi 划算太多了，客服回得也快！',
      meta: '6小时前 | 日本7天',
    },
    {
      id: 'r2',
      name: 'Tina',
      rating: '4.7',
      text: '到机场出关 30 秒装好就有信号，比租 Wifi 划算太多了，客服回得也快！',
      meta: '6小时前 | 日本7天',
    },
  ],
  faqItems: [
    {
      id: 'compat',
      type: 'highlight',
      title: '我的手机手机是否支持 eSIM？',
      subtitle: '支持大陆版与国际版机型查询',
      action: 'compat',
    },
    {
      id: 'install',
      title: 'eSIM 如何安装, 到了会自动连接吗？',
      answer: '建议出发前在有 Wi-Fi 的环境扫码安装 eSIM。抵达日本后开启蜂窝数据与数据漫游，系统会自动连接当地网络，无需手动选运营商。',
    },
    {
      id: 'hotspot',
      title: '可以热点共享给其他设备吗？',
      answer: '支持。安装并激活后，可在手机设置中开启个人热点，将流量共享给平板、电脑或其他设备（具体入口因机型系统略有差异）。',
    },
    {
      id: 'refund',
      title: '购买后可以退款吗？',
      answer: '未安装或未激活的订单可申请全额退款；已激活订单将按平台退款政策处理，详情可联系 7×24 小时在线客服。',
    },
  ],
  networkItems: [
    {
      id: 'speed',
      label: '网速',
      icon: '/images/detail/icon-network.svg',
      text: '我们的日本国际 eSIM 提供高速 4G LTE 与 5G 网路服务（视当地覆盖情况而定）',
    },
    {
      id: 'coverage',
      label: '覆盖范围',
      icon: '/images/detail/icon-coverage.svg',
      text: '您可在市区享有良好的讯号涵盖率，然而在山区、沙漠或森林地区，可能会有讯号不稳定的情况。',
    },
    {
      id: 'carrier',
      label: '网络运营商',
      icon: '/images/detail/icon-carrier.svg',
      text: 'KDDI / Softbank',
    },
  ],
  appIcons: [
    '/images/detail/app-1.png',
    '/images/detail/app-2.png',
    '/images/detail/app-3.png',
    '/images/detail/app-4.png',
    '/images/detail/app-5.png',
    '/images/detail/app-6.png',
    '/images/detail/app-7.png',
  ],
  servicePromises: [
    { id: 'refund', icon: '/images/detail/promise-1.svg', lines: ['未激活', '全额退款'] },
    { id: 'support', icon: '/images/detail/promise-2.svg', lines: ['7×24', '小时客服'] },
    { id: 'privacy', icon: '/images/detail/promise-3.svg', lines: ['全程加密', '保护隐私'] },
    { id: 'invoice', icon: '/images/detail/promise-4.svg', lines: ['下单后', '支持开票'] },
  ],
};

function getJapanPlan() {
  return JAPAN_PLAN;
}

function formatChipDaily(daily) {
  const rounded = Math.round(daily * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function buildDayChipOptions(prices) {
  return Object.keys(prices)
    .map(Number)
    .sort((a, b) => a - b)
    .map((days) => {
      const total = prices[days];
      const daily = total / days;
      if (days === 1) {
        return {
          days,
          priceLabel: `¥${total.toFixed(2)}/天`,
          badge: false,
        };
      }
      return {
        days,
        priceLabel: `低至¥${formatChipDaily(daily)}/天`,
        badge: true,
      };
    });
}

function calcPricing(prices, days, quantity, originalDaily) {
  const presetTotal = prices[days];
  const unitTotal = presetTotal != null
    ? presetTotal
    : Math.round((prices[7] / 7) * days);
  const total = unitTotal * quantity;
  const dailyAvg = Math.round((total / days / quantity) * 10) / 10;
  const savePercent = Math.max(0, Math.round((1 - dailyAvg / originalDaily) * 100));

  return {
    total,
    dailyAvg,
    originalDaily,
    savePercent,
    totalLabel: String(total),
    dailyAvgLabel: String(dailyAvg),
    footerMeta: `/ ${days}天`,
  };
}

module.exports = {
  getJapanPlan,
  buildDayChipOptions,
  calcPricing,
};
