module.exports = {
    publicPath: '/',                    // 基本路径
    outputDir: 'dist',                  // 输出文件目录
    lintOnSave: true,                   // eslint-loader 是否在保存的时候检查
    runtimeCompiler: true,              // 是否使用包含运行时编译器的Vue核心的构建
    productionSourceMap: false,         // 生产环境是否生成 sourceMap 文件
    transpileDependencies: [],          // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    css: {
        extract: true,                  // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false,               // 开启 CSS source maps?
        loaderOptions: {},              // css预设器配置项
        modules: false                  // 启用 CSS modules for all css / pre-processor files.
    },
    devServer: {
        host: '0.0.0.0',
        port: 8082,
        https: false,
        hotOnly: false,
        before: app => {},
        proxy: {
            '/hrwebservice_hj':{
                target:'http://127.0.0.1:8080/hrwebservice_hj/',
                changeOrigin: true,
                pathRewrite: {
                    '^/hrwebservice_hj': '/'
                }
            }
        }
    }
}
