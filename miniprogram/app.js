App({
  onLaunch() {
  ['500', '700'].forEach((weight) => {
      wx.loadFontFace({
        global: true,
        family: 'JetBrains Mono',
        source: `url("https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-${weight}-normal.woff2")`,
        desc: { weight },
        scopes: ['webview', 'native'],
      });
    });
  },
});
