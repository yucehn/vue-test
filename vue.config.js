const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   resolve: { fallback: { fs: false } },
  // },
  // devServer: {
  //   open: false,
  //   port: 8081,
  // },
  devServer: {
    proxy: {
      "/api": {
        // 代理接口
        target: "http://localhost:8080",
        ws: true, // proxy websockets
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          // 路径重写
          "^/api": "/mock",
        },
      },
    },
  },
});
