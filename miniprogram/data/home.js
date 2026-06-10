const HOME_POPULAR = [
  { id: 'jp', name: '日本', flag: '/images/detail/flag-jp.png' },
  { id: 'th', name: '泰国', flag: '/images/home/drawer-flag-th.png' },
  { id: 'us', name: '美国', flag: '/images/home/drawer-flag-us.png' },
  { id: 'uk', name: '英国', flag: '/images/home/drawer-flag-uk.png' },
  { id: 'jp-2', name: '日本', flag: '/images/detail/flag-jp.png' },
  { id: 'sg', name: '新加坡', flag: '/images/home/drawer-flag-sg.png' },
];

const ACTIVITY_FEED = [
  { id: 'a1', prefix: '王** 2分钟前购买了 ', product: '日本7天eSIM' },
  { id: 'a2', prefix: '李** 5分钟前购买了 ', product: '泰国15天eSIM' },
  { id: 'a3', prefix: '张** 8分钟前购买了 ', product: '韩国7天eSIM' },
  { id: 'a4', prefix: '陈** 3分钟前购买了 ', product: '新加坡10天eSIM' },
  { id: 'a5', prefix: '刘** 1分钟前购买了 ', product: '美国30天eSIM' },
];

const HOME_REVIEWS = [
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
];

const HOME_COMPARE = {
  columns: [
    { id: 'holafly', name: 'Holafly', sub: 'eSIM', primary: true },
    { id: 'sim', name: '实体卡', sub: 'SIM' },
    { id: 'roaming', name: '漫游', sub: '运营商' },
    { id: 'wifi', name: '随身', sub: 'WiFi' },
    { id: 'other', name: '其他', sub: 'eSIM' },
  ],
  rows: [
    {
      id: 'data',
      label: '流量',
      cells: [
        { text: '无限不限速', tone: 'primary' },
        { text: 'GB 限额', tone: 'muted' },
        { text: '降速', tone: 'muted' },
        { text: '共享', tone: 'muted' },
        { text: 'GB 限额', tone: 'muted' },
      ],
    },
    {
      id: 'price',
      label: '价格',
      cells: [
        { text: '¥6/天起', tone: 'primary' },
        { text: '¥15+', tone: 'muted' },
        { text: '¥25-60', tone: 'muted' },
        { text: '¥15-35', tone: 'muted' },
        { text: '美元', tone: 'muted' },
      ],
    },
    {
      id: 'activation',
      label: '激活',
      cells: [
        { text: '30 秒', tone: 'primary' },
        { text: '物流', tone: 'muted' },
        { text: '电话', tone: 'muted' },
        { text: '取还', tone: 'muted' },
        { text: '扫码', tone: 'muted' },
      ],
    },
    {
      id: 'number',
      label: '国内号',
      cells: [
        { text: '保留', tone: 'primary' },
        { text: '换卡', tone: 'muted' },
        { text: '保留', tone: 'muted' },
        { text: '保留', tone: 'muted' },
        { text: '保留', tone: 'muted' },
      ],
    },
    {
      id: 'support',
      label: '客服',
      cells: [
        { text: '中文 7×24', tone: 'primary' },
        { text: '商家', tone: 'muted' },
        { text: '运营商', tone: 'muted' },
        { text: '租赁商', tone: 'muted' },
        { text: '英文', tone: 'muted' },
      ],
    },
  ],
};

module.exports = {
  HOME_POPULAR,
  ACTIVITY_FEED,
  HOME_REVIEWS,
  HOME_COMPARE,
};
