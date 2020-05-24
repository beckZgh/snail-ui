module.exports = {
    name: 'sd-ui',
    build: {
        css: {
            preprocessor: 'sass',
        },
        site: {
            publicPath: '/sd-ui/',
        },
    },
    site: {
        title: 'sd-ui',
        logo: 'https://img.yzcdn.cn/vant/logo.png',
        nav: [
            {
                title: '开发指南',
                items: [
                    {
                        path: 'home',
                        title: '介绍',
                    },
                    {
                        path: 'quickstart',
                        title: '快速上手',
                    },
                ],
            },
            {
                title: '基础组件',
                items: [
                    {
                        path: 'button',
                        title: 'Button 按钮',
                    },
                    {
                        path: 'style',
                        title: 'Style 内置样式',
                    },
                ],
            },
        ],
    },
};
