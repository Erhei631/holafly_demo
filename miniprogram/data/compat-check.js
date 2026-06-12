const VERSION_OPTIONS = [
  {
    id: 'cn',
    title: '中国大陆版',
    subtitle: '国货·行货',
    icon: '/images/compat/flag-cn.png',
  },
  {
    id: 'global',
    title: '海外/港版',
    subtitle: '国际版·全球版',
    icon: '/images/compat/flag-global.png',
  },
];

const METHOD_OPTIONS = [
  { id: 'model', label: '按机型' },
  { id: 'dial', label: '拨号检查' },
];

const POPULAR_MODELS = [
  { id: 'iphone-17e', name: 'iPhone 17e', supported: true },
  { id: 'iphone-air', name: 'iPhone Air', supported: true },
  { id: 'galaxy-s26', name: 'Galaxy S26 / S26+ / S26 Ultra', supported: true },
  { id: 'oppo-x9', name: 'OPPO Find X9', supported: true },
];

const DIAL_INTRO_TITLE = '拨号查看 EID — 最准确的检测方法';

const DIAL_STEPS = [
  {
    title: '打开手机「拨号」应用',
    desc: 'iPhone 为「电话」，安卓为「拨号」 / 「电话」',
  },
  {
    title: '输入 *#06#',
    desc: '不需点拨打，输完即会自动弹出设备信息',
  },
  {
    title: '查看是否出现 EID',
    desc: '出现则支持；只有 IMEI / MEID 则不支持',
  },
];

const DIAL_RESULTS = [
  { id: 'eid', title: '✓ 看到 EID', desc: '支持 eSIM', type: 'success' },
  { id: 'imei', title: '✕ 只有 IMEI / MEID', desc: '未配备 eSIM 硬件', type: 'neutral' },
];

const DEVICE_INFO = {
  name: 'iPhone 17e',
  supported: true,
};

module.exports = {
  VERSION_OPTIONS,
  METHOD_OPTIONS,
  POPULAR_MODELS,
  DIAL_INTRO_TITLE,
  DIAL_STEPS,
  DIAL_RESULTS,
  DEVICE_INFO,
};
