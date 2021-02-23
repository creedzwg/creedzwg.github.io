import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "categories/一天一道面试题/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "categories/一天一道面试题/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "一天一道面试题",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/https.md",
                "title": "一次https请求的流程",
                "link": "posts/https.html",
                "date": "2020-12-04T00:00:00.000Z",
                "updated": "2020-12-23T08:10:12.000Z",
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "一天一道面试题"
                ],
                "tags": [
                    "http",
                    "https"
                ],
                "excerpt": "相关名词解释 https - 首先说一下https,https全文名称(hyper text transfer protocol over SecureSocket layer) ,字面意思是在ssl基础上的 http协议,在传统http的基础上,通过加密传输,身份认证(ssl)保证了传输过程的安全性,htt...",
                "cover": "../assets/https/2020-12-07_17-29-52.png"
            }
        ],
        "categories": [
            {
                "name": "编程世界",
                "count": 5
            },
            {
                "name": "一天一道面试题",
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
