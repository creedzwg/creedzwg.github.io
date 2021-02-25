import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "tags/README.md",
    'layoutPath': "tags/_layout.tsx",
    'outputPath': "tags/index.html",
    'title': "标签",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>标签</h1>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u6807\u7B7E"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
        } }),
    'toc': null,
    'author': "zhangwengang",
    'contributors': [
        "zhangwengang"
    ],
    'date': "2020-11-17T07:08:12.000Z",
    'updated': null,
    'excerpt': "",
    'cover': undefined,
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
            },
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
                "pagePath": "posts/zookeeper.md",
                "title": "zookeeper 入门",
                "link": "posts/zookeeper.html",
                "date": "2020-07-05T00:00:00.000Z",
                "updated": "2021-02-25T09:41:08.000Z",
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
            },
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
            },
            {
                "pagePath": "posts/java8_new_feature.md",
                "title": "java8 新特性教程",
                "link": "posts/java8_new_feature.html",
                "date": "2019-05-23T00:00:00.000Z",
                "updated": "2021-02-23T06:35:38.000Z",
                "author": "zhangwengang",
                "contributors": [
                    "zhangwengang"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "java8"
                ],
                "excerpt": "讲解的新特性 - lambda表达式 - 函数式接口 - stream API lambda 表达式 什么是lambda表达式 - lambda表达式,我们可以把它看做是可传递的匿名函数:它没有名称,但他有参数列表,函数主体,返回类型,还有一个可以抛出的异常列表,它..."
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
