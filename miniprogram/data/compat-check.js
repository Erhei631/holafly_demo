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

const DIAL_HINT = '在拨号界面输入 *#06#，若出现 EID 号码则通常支持 eSIM。不同版本机型结果可能不同，建议结合机型列表核对。';

module.exports = {
  VERSION_OPTIONS,
  METHOD_OPTIONS,
  POPULAR_MODELS,
  DIAL_HINT,
};
