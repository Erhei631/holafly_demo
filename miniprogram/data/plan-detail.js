/** 日本 eSIM 详情 — Figma 592:12346 */
const JAPAN_PLAN = {
  id: 'jp',
  name: '日本',
  title: '日本 eSIM·无限流量',
  flag: '/images/detail/flag-jp.png',
  dayOptions: [1, 3, 5, 7, 10, 15],
  prices: { 1: 15, 3: 35, 5: 48, 7: 63, 10: 85, 15: 120 },
  originalDaily: 15,
  features: [
    { id: 'data5g', label: '无限5G流量', icon: '/images/detail/tag-5g.svg' },
    { id: 'refund', label: '退款无忧', icon: '/images/detail/tag-refund.svg' },
  ],
  compatCard: {
    icon: '/images/detail/compat-device.svg',
    title: '我的设备支持吗？',
    subtitle: '支持大陆版与国际版机型查询',
  },
  reviewSummary: {
    rating: '4.7',
    total: '95,304',
  },
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
    {
      id: 'r3',
      name: 'Tina',
      rating: '4.7',
      text: '到机场出关 30 秒装好就有信号，比租 Wifi 划算太多了，客服回得也快！',
      meta: '6小时前 | 日本7天',
    },
  ],
  faqTabs: [
    { id: 'install', label: '安装使用' },
    { id: 'plan', label: '套餐流量' },
    { id: 'device', label: '设备兼容' },
    { id: 'hotspot', label: '热点共享' },
    { id: 'other', label: '其他问题' },
  ],
  faqItems: [
    {
      id: 'install',
      tab: 'install',
      title: 'eSIM 如何安装, 到了目的地会自动连接吗？',
      answer: '建议出发前在有 Wi-Fi 的环境扫码安装 eSIM。抵达日本后开启蜂窝数据与数据漫游，系统会自动连接当地网络，无需手动选运营商。',
    },
    {
      id: 'plan-data',
      tab: 'plan',
      title: '流量真的是无限吗？会限速吗？',
      answer: '日本套餐为无限流量且全程不限速，可流畅使用 4K 视频、直播与导航，具体网速视当地网络覆盖情况而定。',
    },
    {
      id: 'device-check',
      tab: 'device',
      title: '如何确认我的手机支持 eSIM？',
      answer: '可在本页点击「我的设备支持吗？」，按机型或拨号 *#06# 查询；若出现 EID 号码，通常表示设备支持 eSIM。',
    },
    {
      id: 'hotspot',
      tab: 'hotspot',
      title: '可以热点共享给其他设备吗？',
      answer: '支持。安装并激活后，可在手机设置中开启个人热点，将流量共享给平板、电脑或其他设备（具体入口因机型系统略有差异）。',
    },
    {
      id: 'refund',
      tab: 'other',
      title: '购买后可以退款吗？',
      answer: '未安装或未激活的订单可申请全额退款；已激活订单将按平台退款政策处理，详情可联系 7×24 小时在线客服。',
    },
  ],
  appIntro: '足够4K视频、直播、视频通话与实时导航，全程不降速、不限量。',
  appSections: [
    {
      id: 'overseas',
      title: '海外应用 · 直连无忧',
      apps: [
        { id: 'maps', name: '谷歌地图', subtitle: '实时导航不卡顿', icon: '/images/detail/app-maps.png' },
        { id: 'youtube', name: 'YouTube', subtitle: '畅看 4K 视频', icon: '/images/detail/app-youtube.png' },
        { id: 'instagram', name: 'Instagram', subtitle: '刷图发限时动态', icon: '/images/detail/app-instagram.png' },
        { id: 'more-apps', name: '更多应用', subtitle: '海外应用畅行无阻', icon: '/images/detail/app-more-apps.svg?v=2', fullIcon: true },
      ],
    },
    {
      id: 'domestic',
      title: '国内应用 · 照常使用',
      apps: [
        { id: 'wechat', name: '微信', subtitle: '视频通话报平安', icon: '/images/detail/app-wechat.png' },
        { id: 'xhs', name: '小红书', subtitle: '边玩边直播', icon: '/images/detail/app-xhs.png' },
        { id: 'douyin', name: '抖音', subtitle: '直播 / 发高清视频', icon: '/images/detail/app-douyin.png' },
        { id: 'more-apps-domestic', name: '更多应用', subtitle: '国内应用不受影响', icon: '/images/detail/app-more-apps.svg?v=2', fullIcon: true },
      ],
    },
  ],
  usageSteps: [
    { id: 'pay', icon: '/images/detail/usage-pay.svg', label: '微信购买一键支付' },
    { id: 'wifi', icon: '/images/detail/usage-wifi.svg', label: '落地连机场Wi-Fi' },
    { id: 'qr', icon: '/images/detail/usage-qr.svg', label: '订单页面扫码安装设置' },
  ],
  networkCarriers: [
    { id: 'kddi', icon: '/images/detail/carrier-kddi.png', width: 102 },
    { id: 'softbank', icon: '/images/detail/carrier-softbank.png', width: 218 },
  ],
  networkSpeedText: '我们的日本国际 eSIM 提供高速 4G LTE 与 5G 网路服务（视当地覆盖情况而定）',
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

function buildDayChipOptions(prices) {
  return Object.keys(prices)
    .map(Number)
    .sort((a, b) => a - b)
    .map((days) => ({ days }));
}

function calcPricing(prices, days, quantity, originalDaily) {
  const presetTotal = prices[days];
  const unitTotal = presetTotal != null
    ? presetTotal
    : Math.round((prices[7] / 7) * days);
  const total = unitTotal * quantity;
  const dailyAvg = Math.round((unitTotal / days) * 10) / 10;
  const savePercent = Math.max(0, Math.round((1 - dailyAvg / originalDaily) * 100));
  const originalUnitTotal = originalDaily * days;
  const totalSave = Math.max(0, Math.round((originalUnitTotal - unitTotal) * quantity));

  return {
    total,
    dailyAvg,
    originalDaily,
    savePercent,
    saveAmount: totalSave,
    totalLabel: String(total),
    dailyAvgLabel: Number.isInteger(dailyAvg) ? String(dailyAvg) : dailyAvg.toFixed(1),
    saveLabel: `官方立减${savePercent}%省${totalSave}元`,
    footerMeta: ` / ${days}天`,
  };
}

module.exports = {
  getJapanPlan,
  buildDayChipOptions,
  calcPricing,
};
