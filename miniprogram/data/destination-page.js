const { POPULAR_COUNTRIES, MULTI_REGIONS } = require('./destinations');

const ALL_COUNTRIES = [
  { id: 'ae', name: '阿联酋', initial: 'A', icon: '/images/home/drawer-region-global.png' },
  { id: 'au', name: '澳大利亚', initial: 'A', icon: '/images/home/drawer-flag-uk.png' },
  { id: 'de', name: '德国', initial: 'D', icon: '/images/home/drawer-region-eu.png' },
  { id: 'ru', name: '俄罗斯', initial: 'E', flagStyle: 'linear-gradient(180deg, #fff 0%, #fff 33%, #0039a6 33%, #0039a6 66%, #d52b1e 66%, #d52b1e 100%)' },
  { id: 'fr', name: '法国', initial: 'F', flagStyle: 'linear-gradient(90deg, #002654 0%, #002654 33%, #fff 33%, #fff 66%, #ed2939 66%, #ed2939 100%)' },
  { id: 'ph', name: '菲律宾', initial: 'F', flagStyle: 'linear-gradient(180deg, #0038a8 0%, #0038a8 50%, #ce1126 50%, #ce1126 100%)' },
  { id: 'kr', name: '韩国', initial: 'H', icon: '/images/home/drawer-flag-jp.png' },
  { id: 'kh', name: '柬埔寨', initial: 'J', icon: '/images/home/drawer-flag-th.png' },
  { id: 'my', name: '马来西亚', initial: 'M', icon: '/images/home/drawer-flag-sg.png' },
  { id: 'us', name: '美国', initial: 'M', icon: '/images/home/drawer-flag-us.png' },
  { id: 'jp', name: '日本', initial: 'R', icon: '/images/home/drawer-flag-jp.png' },
  { id: 'th', name: '泰国', initial: 'T', icon: '/images/home/drawer-flag-th.png' },
  { id: 'sg', name: '新加坡', initial: 'X', icon: '/images/home/drawer-flag-sg.png' },
  { id: 'uk', name: '英国', initial: 'Y', icon: '/images/home/drawer-flag-uk.png' },
  { id: 'vn', name: '越南', initial: 'Y', icon: '/images/home/drawer-flag-th.png' },
  { id: 'hk', name: '香港', initial: 'X', icon: '/images/home/drawer-flag-hk.png' },
];

const INDEX_LETTERS = ['A', 'D', 'E', 'F', 'H', 'J', 'M', 'R', 'T', 'X', 'Y'];

function filterByKeyword(list, keyword) {
  const q = (keyword || '').trim().toLowerCase();
  if (!q) return list;
  return list.filter((item) => item.name.toLowerCase().includes(q));
}

function groupCountriesByInitial(countries) {
  const map = {};
  countries.forEach((item) => {
    if (!map[item.initial]) map[item.initial] = [];
    map[item.initial].push(item);
  });
  return INDEX_LETTERS
    .filter((letter) => map[letter] && map[letter].length)
    .map((letter) => ({ letter, items: map[letter] }));
}

function buildCountryView(keyword) {
  const filtered = filterByKeyword(ALL_COUNTRIES, keyword);
  return {
    popular: filterByKeyword(POPULAR_COUNTRIES, keyword),
    groups: groupCountriesByInitial(filtered),
    indexLetters: groupCountriesByInitial(filtered).map((g) => g.letter),
    empty: filtered.length === 0 && filterByKeyword(POPULAR_COUNTRIES, keyword).length === 0,
  };
}

function buildRegionView(keyword) {
  const regions = filterByKeyword(MULTI_REGIONS, keyword);
  return {
    regions,
    empty: regions.length === 0,
  };
}

module.exports = {
  POPULAR_RECOMMENDATIONS: POPULAR_COUNTRIES,
  ALL_COUNTRIES,
  MULTI_REGIONS,
  INDEX_LETTERS,
  filterByKeyword,
  groupCountriesByInitial,
  buildCountryView,
  buildRegionView,
};
