const TABS = [{ id: 'international', name: '国际/中国港澳台' }];

const SIDEBAR = [
  { id: 'hot', name: '历史/热门' },
  { id: 'hkmo', name: '中国港澳台' },
  { id: 'jpkr', name: '日韩' },
  { id: 'sea', name: '东南亚' },
  { id: 'europe', name: '欧洲' },
  { id: 'americas', name: '美洲' },
  { id: 'oceania', name: '大洋洲' },
  { id: 'visa', name: '免签/落地签', badge: '免签' },
];

const DESTINATIONS = [
  { id: 'jp-tyo', city: '东京', country: '日本', category: 'jpkr', scope: 'international', hot: true },
  { id: 'jp-osa', city: '大阪', country: '日本', category: 'jpkr', scope: 'international', hot: true },
  { id: 'kr-seo', city: '首尔', country: '韩国', category: 'jpkr', scope: 'international', hot: true },
  { id: 'kr-bus', city: '釜山', country: '韩国', category: 'jpkr', scope: 'international' },
  { id: 'th-bkk', city: '曼谷', country: '泰国', category: 'sea', scope: 'international', hot: true, visaFree: true },
  { id: 'th-hkt', city: '普吉岛', country: '泰国', category: 'sea', scope: 'international', visaFree: true },
  { id: 'sg-sin', city: '新加坡', country: '新加坡', category: 'sea', scope: 'international', hot: true },
  { id: 'my-kul', city: '吉隆坡', country: '马来西亚', category: 'sea', scope: 'international', visaFree: true },
  { id: 'vn-sgn', city: '胡志明市', country: '越南', category: 'sea', scope: 'international', visaFree: true },
  { id: 'hk-hkg', city: '香港', country: '中国', category: 'hkmo', scope: 'international', hot: true },
  { id: 'mo-mfm', city: '澳门', country: '中国', category: 'hkmo', scope: 'international' },
  { id: 'tw-tpe', city: '台北', country: '中国', category: 'hkmo', scope: 'international' },
  { id: 'eu-fra', city: '法兰克福', country: '德国', category: 'europe', scope: 'international' },
  { id: 'eu-par', city: '巴黎', country: '法国', category: 'europe', scope: 'international', hot: true },
  { id: 'eu-lon', city: '伦敦', country: '英国', category: 'europe', scope: 'international', hot: true },
  { id: 'eu-rom', city: '罗马', country: '意大利', category: 'europe', scope: 'international' },
  { id: 'us-nyc', city: '纽约', country: '美国', category: 'americas', scope: 'international', hot: true },
  { id: 'us-lax', city: '洛杉矶', country: '美国', category: 'americas', scope: 'international' },
  { id: 'us-hnl', city: '檀香山', country: '美国', category: 'americas', scope: 'international', visaFree: true },
  { id: 'au-syd', city: '悉尼', country: '澳大利亚', category: 'oceania', scope: 'international', hot: true },
  { id: 'au-mel', city: '墨尔本', country: '澳大利亚', category: 'oceania', scope: 'international' },
  { id: 'cn-sha', city: '上海', country: '中国', category: 'hot', scope: 'domestic' },
  { id: 'cn-bjs', city: '北京', country: '中国', category: 'hot', scope: 'domestic' },
];

const POPULAR_REGIONS = [
  { id: 'region-jp', name: '日本', category: 'jpkr', tone: 'rose' },
  { id: 'region-th', name: '泰国', category: 'sea', tone: 'peach' },
  { id: 'region-eu', name: '欧洲', category: 'europe', tone: 'blue' },
  { id: 'region-us', name: '美国', category: 'americas', tone: 'yellow' },
];

/** 目的地抽屉 — 热门国家/地区 */
const POPULAR_COUNTRIES = [
  { id: 'jp', name: '日本', icon: '/images/home/drawer-flag-jp.png' },
  { id: 'hk', name: '香港', icon: '/images/home/drawer-flag-hk.png' },
  { id: 'th', name: '泰国', icon: '/images/home/drawer-flag-th.png' },
  { id: 'us', name: '美国', icon: '/images/home/drawer-flag-us.png' },
  { id: 'uk', name: '英国', icon: '/images/home/drawer-flag-uk.png' },
  { id: 'sg', name: '新加坡', icon: '/images/home/drawer-flag-sg.png' },
];

/** 目的地抽屉 — 多国通用 */
const MULTI_REGIONS = [
  { id: 'eu-multi', name: '欧洲', icon: '/images/home/drawer-region-eu.png' },
  { id: 'asia-multi', name: '亚洲', icon: '/images/home/drawer-region-asia.png' },
  { id: 'global', name: '全球', icon: '/images/home/drawer-region-global.png' },
];

function filterChips(list, keyword) {
  const q = (keyword || '').trim().toLowerCase();
  if (!q) return list;
  return list.filter((item) => item.name.toLowerCase().includes(q));
}

function filterDestinations(list, { tab, category, keyword }) {
  let result = list.filter((item) => item.scope === tab);

  if (category === 'hot') {
    result = list.filter((item) => item.hot && item.scope === tab);
  } else if (category === 'visa') {
    result = list.filter((item) => item.visaFree && item.scope === tab);
  } else if (category) {
    result = result.filter((item) => item.category === category);
  }

  const q = (keyword || '').trim().toLowerCase();
  if (!q) return result;

  return list.filter((item) => {
    if (item.scope !== tab) return false;
    const hay = `${item.city}${item.country}`.toLowerCase();
    return hay.includes(q);
  });
}

module.exports = {
  TABS,
  SIDEBAR,
  DESTINATIONS,
  POPULAR_REGIONS,
  POPULAR_COUNTRIES,
  MULTI_REGIONS,
  filterDestinations,
  filterChips,
};
