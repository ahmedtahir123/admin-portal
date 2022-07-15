const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const antCssOverrides = require("./src/styles/ant-overrides");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antCssOverrides,
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
);
