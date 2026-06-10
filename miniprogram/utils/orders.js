const STORAGE_KEY = 'holafly_orders_v1';

const STATUS = {
  pending_install: {
    label: '待安装',
    tone: 'warning',
  },
  active: {
    label: '使用中',
    tone: 'success',
  },
  expired: {
    label: '已过期',
    tone: 'muted',
  },
};

const FLAG_BY_DESTINATION = {
  日本: '/images/orders/flag-jp.png',
  泰国: '/images/orders/flag-th.png',
  美国: '/images/home/drawer-flag-us.png',
  英国: '/images/home/drawer-flag-uk.png',
  新加坡: '/images/home/drawer-flag-sg.png',
};

function getFlagForDestination(destination) {
  return FLAG_BY_DESTINATION[destination] || '/images/orders/flag-jp.png';
}

const DEMO_ORDERS = [
  {
    id: 'demo_1',
    orderNo: 'HF20260602001',
    destination: '日本',
    days: 7,
    dateRange: '6月10日 — 6月16日',
    quantity: 1,
    totalPriceLabel: '¥358.40',
    status: 'pending_install',
    esim: {
      iccid: '8988 **** **** 4521',
      planLabel: '7 天 · 畅享无限流量',
    },
    createdAt: '2026-06-01 14:32',
  },
  {
    id: 'demo_2',
    orderNo: 'HF20260518002',
    destination: '泰国',
    days: 5,
    dateRange: '5月20日 — 5月24日',
    quantity: 3,
    totalPriceLabel: '¥256.00',
    status: 'active',
    esimSlots: [
      { label: '待激活', tone: 'pending', used: false },
      { label: '已激活', tone: 'installed', used: true },
      { label: '待激活', tone: 'pending', used: false },
    ],
    esim: {
      iccid: '8988 **** **** 8834',
      planLabel: '5 天 · 畅享无限流量',
    },
    createdAt: '2026-05-18 09:15',
  },
];

function readStoredOrders() {
  try {
    const raw = wx.getStorageSync(STORAGE_KEY);
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    return [];
  }
}

function writeStoredOrders(orders) {
  wx.setStorageSync(STORAGE_KEY, orders);
}

function withStatusMeta(order) {
  const meta = STATUS[order.status] || STATUS.pending_install;
  return {
    ...order,
    statusLabel: meta.label,
    statusTone: meta.tone,
    flag: order.flag || getFlagForDestination(order.destination),
  };
}

function getOrders() {
  const stored = readStoredOrders().map(withStatusMeta);
  const demo = DEMO_ORDERS.map(withStatusMeta);
  const storedIds = new Set(stored.map((o) => o.id));
  const merged = [...stored, ...demo.filter((o) => !storedIds.has(o.id))];
  return merged.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
}

function getOrderById(id) {
  return getOrders().find((order) => order.id === id) || null;
}

function filterOrders(orders, tab) {
  if (tab === 'all') return orders;
  return orders.filter((o) => o.status === tab);
}

function createOrder(payload) {
  const id = `ord_${Date.now()}`;
  const order = {
    id,
    orderNo: `HF${Date.now().toString().slice(-10)}`,
    destination: payload.destination || '',
    days: payload.days || 1,
    dateRange: payload.dateRange || '',
    quantity: payload.quantity || 1,
    totalPriceLabel: payload.totalPriceLabel || '¥0.00',
    status: 'pending_install',
    esim: {
      iccid: '8988 **** **** ' + String(Math.floor(Math.random() * 9000) + 1000),
      planLabel: `${payload.days || 1} 天 · 畅享无限流量`,
    },
    createdAt: formatNow(),
  };
  const orders = readStoredOrders();
  orders.unshift(order);
  writeStoredOrders(orders);
  return withStatusMeta(order);
}

function formatNow() {
  const d = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

module.exports = {
  STATUS,
  STORAGE_KEY,
  getOrders,
  filterOrders,
  createOrder,
  getOrderById,
  getFlagForDestination,
  withStatusMeta,
};
