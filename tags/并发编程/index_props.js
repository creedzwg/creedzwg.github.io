import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "tags/并发编程/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/并发编程/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "并发编程",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/volatile浅析.md",
                "title": "volatile浅析",
                "link": "posts/volatile浅析.html",
                "date": "2020-10-11T00:00:00.000Z",
                "updated": null,
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "volatile",
                    "并发编程"
                ],
                "excerpt": "简介 1. volatile 关键是用来修饰静态变量和实例变量的,对于方法参数,局部变量和实例常量和类常量都不能修饰 2. volatile修饰的类变量和实例变量能保证两次语义 - :保证了不同线程对共享变量操作时的可见性,即一个线程对变量的...",
                "cover": "../assets/volatile/jmm.jpg"
            },
            {
                "pagePath": "posts/jvm hello world.md",
                "title": "jvm",
                "link": "posts/jvm hello world.html",
                "date": "2018-10-11T00:00:00.000Z",
                "updated": null,
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "jvm",
                    "并发编程"
                ],
                "excerpt": "jvm 的生命周期 虚拟机的启动 1：java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class)来完成的，这个类是由虚拟机的具体事项指定的 虚拟机的执行 - 一个运行中的Java虚拟机有着一个清...",
                "cover": "https://img.hacpai.com/file/2020/03/20200315160049-d756f8e7.png"
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
