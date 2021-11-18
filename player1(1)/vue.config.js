module.exports = {
    "configureWebpack": {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views'
            }
        },

        'devServer': {
            // open: true,
            port: 8082,
            //解决跨域问题 设置代理服务
            proxy: {
                "/api": {
                    target: "https://autumnfish.cn",
                    changeOrigin: true, // 允许跨域
                    pathRewrite: {
                        "^/api": ''
                    }
                }
            }
        }
    }
}