import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "tags/linux/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/linux/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "linux",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/linux_hello_world.md",
                "title": "linux 浅析",
                "link": "posts/linux_hello_world.html",
                "date": "2020-11-28T00:00:00.000Z",
                "updated": null,
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "linux"
                ],
                "excerpt": "linux 目录配置 1. 可分享的: 可以分享给其他系统挂载使用的目录,包括可执行文件和一些用户自身数据,其他系统拿到就可以直接使用的 2. 不可分享的: 自身机器上面的配置文件, 3: 不变的: 有些数据是不会经常变动的,例如函数库,说...",
                "cover": "../assets/linux/linux.png"
            }
        ],
        "categories": [
            {
                "name": "编程世界",
                "count": 6
            },
            {
                "name": "一天一道面试题",
                "count": 1
            },
            {
                "name": "学习计划",
                "count": 1
            }
        ],
        "tags": [
            {
                "name": "并发编程",
                "count": 2
            },
            {
                "name": "apollo",
                "count": 1
            },
            {
                "name": "http",
                "count": 1
            },
            {
                "name": "https",
                "count": 1
            },
            {
                "name": "java8",
                "count": 1
            },
            {
                "name": "jvm",
                "count": 1
            },
            {
                "name": "linux",
                "count": 1
            },
            {
                "name": "volatile",
                "count": 1
            },
            {
                "name": "zab",
                "count": 1
            },
            {
                "name": "zookeeper",
                "count": 1
            },
            {
                "name": "配置中心",
                "count": 1
            }
        ]
    }
};
