const CracoLessPlugin = require('craco-less');
const pxtoviewport = require("postcss-px-to-viewport");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 'brand-primary': '#e94f4f' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        // https://github.com/evrone/postcss-px-to-viewport,参考地址
        pxtoviewport({
          unitToConvert: "px",   // 要转换的单位
          viewportWidth: 375,    // 设计稿宽度
          unitPrecision: 5,      // 保留小数点后几位
          propList: ["*"],
          viewportUnit: "vw",
          fontViewportUnit: "vw",
          selectorBlackList: ["body"],  // 不需要转换的标签写入，比如body标签里的不希望转换的话
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: /node_modules/,
        }),
      ],
    },
  },
};