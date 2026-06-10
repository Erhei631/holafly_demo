const PREFACE = [
  {
    id: 'save-qr',
    icon: '/images/install-guide/icon-save-qr.svg',
    text: '请提前在出发前进入订单详情，将二维码保存至本地相册',
  },
  {
    id: 'wifi',
    icon: '/images/install-guide/icon-wifi.svg',
    text: '降落后，请连接机场 Wi-Fi 进行安装激活。',
  },
];

const IOS_STEPS = [
  {
    id: 's1',
    text: '1.在订单页面找到你的二维码，保存至手机相册。（请在出发前完成此步骤）',
    image: '/images/install-guide/step-order-qr.png',
    imageMode: 'widthFix',
    imageCompact: true,
  },
  {
    id: 's2',
    text: '2.落地后，连接机场Wi-Fi，打开手机相册，长按保存的二维码跳转手机设置页面，安装过程将自动开始。',
    image: '/images/install-guide/step-ios-2.png',
    imageMode: 'widthFix',
  },
  {
    id: 's3',
    text: '3. 移动配置完成后点击完成。',
    image: '/images/install-guide/step-ios-3.png',
    imageMode: 'widthFix',
  },
  {
    id: 's4',
    text: '4. 给您的新 Holafly 线路起个名字来识别它，比如 “Holafly Spain”。',
    image: '/images/install-guide/step-ios-4.png',
    imageMode: 'widthFix',
  },
];

const ANDROID_STEPS = [
  {
    id: 'a1',
    text: '1. 出发前在订单详情保存二维码至相册，或记下激活码。',
    image: '',
  },
  {
    id: 'a2',
    text: '2. 落地后连接机场 Wi-Fi，打开「设置」→「网络与互联网」→「SIM 卡管理」。',
    image: '',
  },
  {
    id: 'a3',
    text: '3. 选择添加 eSIM / 下载 SIM，扫描相册中的二维码完成安装。',
    image: '',
  },
  {
    id: 'a4',
    text: '4. 启用 Holafly eSIM 并开启移动数据，抵达目的地后即可使用。',
    image: '',
  },
];

module.exports = {
  PREFACE,
  IOS_STEPS,
  ANDROID_STEPS,
};
