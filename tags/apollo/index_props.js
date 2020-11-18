import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "tags/apollo/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/apollo/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "apollo",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/apollo_hello_world.md",
                "title": "apollo 入门",
                "link": "posts/apollo_hello_world.html",
                "date": "2019-09-12T00:00:00.000Z",
                "updated": null,
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "apollo",
                    "配置中心"
                ],
                "excerpt": "apollo的功能亮点 1. 统一管理不同环境,不同集群的配置 2. 配置修改实时生效(热发布) 3. 版本发布管理 4. 灰度发布 5. 有权限管理 6. 文档完善 apollo文档 apollo基础模型 1. 用户在配置中心对配置进行修改并发布 2. 配置中心会...",
                "cover": "../assets/apollo/610A4B1D-2D93-4759-A79F-E53C09D529ED.png"
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
