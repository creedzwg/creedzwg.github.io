import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "tags/zab/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/zab/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "zab",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/zookeeper.md",
                "title": "zookeeper 入门",
                "link": "posts/zookeeper.html",
                "date": "2020-07-05T00:00:00.000Z",
                "updated": null,
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "zookeeper",
                    "zab"
                ],
                "excerpt": "zookeeper是什么? 官网的介绍:zookeeper是一个开放源代码的分布式协调服务,由雅虎创建.是google chubby的开源实现,她是一个典型的分布式数据一致性的解决方案,分布式系统可以基于它来实现诸如数据发布/订阅,负载均衡,命名服务,...",
                "cover": "../assets/zookeeper/zk%20node.jpg"
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
                "name": "java8",
                "count": 1
            },
            {
                "name": "jvm",
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
        ],
        "categories": [
            {
                "name": "编程世界",
                "count": 5
            },
            {
                "name": "学习计划",
                "count": 1
            }
        ]
    }
};
