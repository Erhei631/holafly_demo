module.exports = {
  intro: {
    before: 'eSIM（Embedded SIM，嵌入式 SIM 卡）是一种',
    highlight: '内嵌在手机硬件里的数字 SIM 卡',
    after: '，无需实体卡槽，也不用插拔，只要扫一个二维码或下载配置文件，几分钟内就能开通网络。',
  },
  stats: [
    { value: '200+', label: '国家与地区可用' },
    { value: '30s', label: '扫码激活' },
    { value: '20个', label: 'iPhone可存配置' },
  ],
  compare: [
    {
      id: 'esim',
      icon: '/images/esim-about/icon-esim.svg',
      title: 'eSIM',
      desc: '数字芯片 · 内置在手机里 · 扫码即装',
    },
    {
      id: 'sim',
      icon: '/images/esim-about/icon-sim.svg',
      title: '实体 SIM 卡',
      desc: '塑料卡片 · 需邮寄 · 拔插原卡',
    },
  ],
  benefits: [
    {
      id: 'instant',
      icon: '/images/esim-about/icon-instant.svg',
      title: '即买即用',
      desc: '无需邮寄等待，购买后秒发，扫码 30 秒激活',
    },
    {
      id: 'secure',
      icon: '/images/esim-about/icon-secure.svg',
      title: '更安全',
      desc: 'eSIM 绑定设备，丢手机也不会被复制盗用',
    },
    {
      id: 'dual',
      icon: '/images/esim-about/icon-dual.svg',
      title: '不占卡槽',
      desc: '保留原卡原号、双卡并用，国内号继续收验证码',
    },
    {
      id: 'global',
      icon: '/images/esim-about/icon-global.svg',
      title: '一卡多国',
      desc: '一份套餐覆盖多国，无需为每个目的地换卡',
    },
    {
      id: 'eco',
      icon: '/images/esim-about/icon-eco.svg',
      title: '更环保',
      desc: '纯虚拟卡，减少塑料卡片浪费',
    },
    {
      id: 'save',
      icon: '/images/esim-about/icon-save.svg',
      title: '更便宜',
      desc: '比国际漫游便宜数倍，省下的钱花在旅程上',
    },
  ],
};
