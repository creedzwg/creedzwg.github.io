import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "categories/学习计划/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "categories/学习计划/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "学习计划",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/read_plan.md",
                "title": "2020学习计划",
                "link": "posts/read_plan.html",
                "date": "2017-10-11T00:00:00.000Z",
                "updated": "2020-11-18T03:34:24.000Z",
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "学习计划"
                ],
                "excerpt": "2020-11-16-2020-11-22 1. 学习linux,对linux做到基本了解,权限,文件,shell,进程,内核等等"
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
