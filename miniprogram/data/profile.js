const MENU_ITEMS = [
  {
    id: 'info',
    label: '个人信息',
    icon: '/images/profile/icon-profile.svg',
    url: '/pages/auth/login',
  },
  {
    id: 'orders',
    label: '订单',
    icon: '/images/profile/icon-orders.svg',
    tab: '/pages/orders/index',
  },
  {
    id: 'support',
    label: '联系客服',
    icon: '/images/profile/icon-support.svg?v=2',
    url: '/pages/support/index',
  },
  {
    id: 'terms',
    label: '服务条款',
    icon: '/images/profile/icon-terms.svg',
    action: 'terms',
  },
  {
    id: 'privacy',
    label: '隐私政策',
    icon: '/images/profile/icon-privacy.svg',
    action: 'privacy',
  },
];

module.exports = {
  MENU_ITEMS,
};
