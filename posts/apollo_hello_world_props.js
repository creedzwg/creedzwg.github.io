import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/apollo_hello_world.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/apollo_hello_world.html",
    'title': "apollo 入门",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>apollo 入门</h1>\n<h3 id="apollo%E7%9A%84%E5%8A%9F%E8%83%BD%E4%BA%AE%E7%82%B9">apollo的功能亮点<a class="anchor" href="#apollo%E7%9A%84%E5%8A%9F%E8%83%BD%E4%BA%AE%E7%82%B9">§</a></h3>\n<ol>\n<li>统一管理不同环境,不同集群的配置</li>\n<li>配置修改实时生效(热发布)</li>\n<li>版本发布管理</li>\n<li>灰度发布</li>\n<li>有权限管理</li>\n<li>文档完善 <a href="https://github.com/ctripcorp/apollo/wiki">apollo文档</a></li>\n</ol>\n<h3 id="apollo%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B">apollo基础模型<a class="anchor" href="#apollo%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B">§</a></h3>\n<ol>\n<li>用户在配置中心对配置进行修改并发布</li>\n<li>配置中心会通知客户端有配置更新</li>\n<li>客户端收到通知后,Apollo客户端从配置中心去拉取最新配置,更新本地配置并通知到应用</li>\n</ol>\n<h3 id="apollo%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5">apollo核心概念<a class="anchor" href="#apollo%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5">§</a></h3>\n<h4 id="1application%E5%BA%94%E7%94%A8%E4%B8%80%E4%B8%AA%E5%8F%91%E5%B8%83%E7%9A%84%E5%8D%95%E4%BD%8D">1.(application)应用,一个发布的单位<a class="anchor" href="#1application%E5%BA%94%E7%94%A8%E4%B8%80%E4%B8%AA%E5%8F%91%E5%B8%83%E7%9A%84%E5%8D%95%E4%BD%8D">§</a></h4>\n<p>就是使用配置的应用,Apollo客户端在运行时,需要知道当前应用是谁,从而去获取到对应的配置</p>\n<p>使用配置的应用要有唯一标示的aapid,由于应用身份是跟着代码走的,所以配置在代码中</p>\n<ul>\n<li>Java:classpath:/META-INF/app.properties -&gt; appid=</li>\n</ul>\n<h4 id="2environment%E7%8E%AF%E5%A2%83">2.(environment)环境<a class="anchor" href="#2environment%E7%8E%AF%E5%A2%83">§</a></h4>\n<ul>\n<li>配置对应的环境DEV,FAT,UAT,PRO,apollo客户端在运行时需要知道当前应用的运行环境,从而去获取到对应于该环境的配置.</li>\n<li>环境默认读取 C:/OPT/SETTINGS/server.properties或/opt/settings/server.properties env=</li>\n</ul>\n<p>的配置,同时也支持运行时通过System Properties 等制定 <a href="https://github.com/ctripcorp/apollo/wiki/Java%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97">java客户端方法</a></p>\n<h4 id="3cluster%E9%9B%86%E7%BE%A4">3.(cluster)集群<a class="anchor" href="#3cluster%E9%9B%86%E7%BE%A4">§</a></h4>\n<ul>\n<li>一个应用下不同实例的分组,比如典型的可以按照数据中心分,把上海机房的应用实例分为一个集群,把北京机房的应用实例分为另外一个集群</li>\n<li>对应不同的集群,同一个配置可以有不同的值,如Zookeeper的地址</li>\n<li>集群默认是读取机器上的配置(server.properties的idc)),同时也支持运行时通过System Properties 等制定 <a href="https://github.com/ctripcorp/apollo/wiki/Java%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97">java客户端方法</a></li>\n</ul>\n<h3 id="4-namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">4. namespace(命名空间)<a class="anchor" href="#4-namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">§</a></h3>\n<ul>\n<li>一个应用下不同配置的分组,可以简单的把namespace类比为文件,不同类型的配置放在不同的文件中,如数据库配置文件</li>\n<li>应用可以直接读取到公共组件的配置namespace</li>\n<li>应用也可以通过读取公共组件的配置namespace来对公共组件的配置做调整</li>\n</ul>\n<h3 id="apollo%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%9D%97%E4%BB%8B%E7%BB%8D">apollo架构模块介绍<a class="anchor" href="#apollo%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%9D%97%E4%BB%8B%E7%BB%8D">§</a></h3>\n<h4 id="config-service">Config Service<a class="anchor" href="#config-service">§</a></h4>\n<ul>\n<li>配置推送接口</li>\n<li>配置获取接口</li>\n<li>主要服务apollo客户端</li>\n</ul>\n<h4 id="admin-service">Admin Service<a class="anchor" href="#admin-service">§</a></h4>\n<ul>\n<li>配置管理接口</li>\n<li>配置修改,发布接口</li>\n<li>主要服务于Protal</li>\n</ul>\n<h4 id="meta-service">Meta Service<a class="anchor" href="#meta-service">§</a></h4>\n<ul>\n<li>Protal通过域名访问Meta Server 获取Admin Service 服务列表</li>\n<li>Client 通过域名访问Meta Server 获取Config Service服务列表</li>\n<li>就相当于一个Eureka Proxy(本来只需要eureka,客户端和protal就可以进行服务发现admin/config service ,但是为了达到多语言的支持,使用 Meta Servcie 对eureka进行了一层薄薄的封装,让client和protal通过域名访问Mea Server 进而获取config/admin服务列表))</li>\n</ul>\n<h4 id="eureka">Eureka<a class="anchor" href="#eureka">§</a></h4>\n<ul>\n<li>服务注册于发现</li>\n<li>服务Config/Admin Service的注册并报心跳</li>\n</ul>\n<h3 id="%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">服务端架构视图<a class="anchor" href="#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">§</a></h3>\n<p><img src="../assets/apollo/610A4B1D-2D93-4759-A79F-E53C09D529ED.png" alt="20200315152253.png"><img src="../assets/apollo/Snipaste_2019-06-08_14-27-59.png" alt="20200315152244.png"><img src="../assets/apollo/0AD86E3B-EE41-4BB9-A72D-B39978AF7AA4.png" alt="20200315152231.png"></p>\n<h3 id="%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">客户端架构视图<a class="anchor" href="#%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">§</a></h3>\n<p><img src="../assets/apollo/A8AF27F5-CB88-469D-B45C-77FAF49216CC.png" alt="20200315152311.png"></p>\n<h4 id="%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%9E%E7%8E%B0%E6%80%BB%E7%BB%93">客户端实现总结<a class="anchor" href="#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%9E%E7%8E%B0%E6%80%BB%E7%BB%93">§</a></h4>\n<h5 id="%E6%8E%A8%E6%8B%89%E7%BB%93%E5%90%88">推拉结合<a class="anchor" href="#%E6%8E%A8%E6%8B%89%E7%BB%93%E5%90%88">§</a></h5>\n<ol>\n<li>config Server 和客户端保持一个长连接,配置实现实时推送</li>\n<li>客户端定期从Config Server拉取配置</li>\n</ol>\n<h5 id="%E9%85%8D%E7%BD%AE%E7%BC%93%E5%AD%98%E5%9C%A8%E6%9C%AC%E5%9C%B0">配置缓存在本地<a class="anchor" href="#%E9%85%8D%E7%BD%AE%E7%BC%93%E5%AD%98%E5%9C%A8%E6%9C%AC%E5%9C%B0">§</a></h5>\n<ol>\n<li>客户端本地会再缓存一次</li>\n</ol>\n<h5 id="%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F">应用程序<a class="anchor" href="#%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F">§</a></h5>\n<ol>\n<li>通过apollo客户端获取最新配置</li>\n<li>订阅配置更新通知</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "apollo \u5165\u95E8"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="apollo%E7%9A%84%E5%8A%9F%E8%83%BD%E4%BA%AE%E7%82%B9">apollo的功能亮点<a class="anchor" href="#apollo%E7%9A%84%E5%8A%9F%E8%83%BD%E4%BA%AE%E7%82%B9">§</a></h3>\n<ol>\n<li>统一管理不同环境,不同集群的配置</li>\n<li>配置修改实时生效(热发布)</li>\n<li>版本发布管理</li>\n<li>灰度发布</li>\n<li>有权限管理</li>\n<li>文档完善 <a href="https://github.com/ctripcorp/apollo/wiki">apollo文档</a></li>\n</ol>\n<h3 id="apollo%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B">apollo基础模型<a class="anchor" href="#apollo%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B">§</a></h3>\n<ol>\n<li>用户在配置中心对配置进行修改并发布</li>\n<li>配置中心会通知客户端有配置更新</li>\n<li>客户端收到通知后,Apollo客户端从配置中心去拉取最新配置,更新本地配置并通知到应用</li>\n</ol>\n<h3 id="apollo%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5">apollo核心概念<a class="anchor" href="#apollo%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5">§</a></h3>\n<h4 id="1application%E5%BA%94%E7%94%A8%E4%B8%80%E4%B8%AA%E5%8F%91%E5%B8%83%E7%9A%84%E5%8D%95%E4%BD%8D">1.(application)应用,一个发布的单位<a class="anchor" href="#1application%E5%BA%94%E7%94%A8%E4%B8%80%E4%B8%AA%E5%8F%91%E5%B8%83%E7%9A%84%E5%8D%95%E4%BD%8D">§</a></h4>\n<p>就是使用配置的应用,Apollo客户端在运行时,需要知道当前应用是谁,从而去获取到对应的配置</p>\n<p>使用配置的应用要有唯一标示的aapid,由于应用身份是跟着代码走的,所以配置在代码中</p>\n<ul>\n<li>Java:classpath:/META-INF/app.properties -&gt; appid=</li>\n</ul>\n<h4 id="2environment%E7%8E%AF%E5%A2%83">2.(environment)环境<a class="anchor" href="#2environment%E7%8E%AF%E5%A2%83">§</a></h4>\n<ul>\n<li>配置对应的环境DEV,FAT,UAT,PRO,apollo客户端在运行时需要知道当前应用的运行环境,从而去获取到对应于该环境的配置.</li>\n<li>环境默认读取 C:/OPT/SETTINGS/server.properties或/opt/settings/server.properties env=</li>\n</ul>\n<p>的配置,同时也支持运行时通过System Properties 等制定 <a href="https://github.com/ctripcorp/apollo/wiki/Java%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97">java客户端方法</a></p>\n<h4 id="3cluster%E9%9B%86%E7%BE%A4">3.(cluster)集群<a class="anchor" href="#3cluster%E9%9B%86%E7%BE%A4">§</a></h4>\n<ul>\n<li>一个应用下不同实例的分组,比如典型的可以按照数据中心分,把上海机房的应用实例分为一个集群,把北京机房的应用实例分为另外一个集群</li>\n<li>对应不同的集群,同一个配置可以有不同的值,如Zookeeper的地址</li>\n<li>集群默认是读取机器上的配置(server.properties的idc)),同时也支持运行时通过System Properties 等制定 <a href="https://github.com/ctripcorp/apollo/wiki/Java%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97">java客户端方法</a></li>\n</ul>\n<h3 id="4-namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">4. namespace(命名空间)<a class="anchor" href="#4-namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">§</a></h3>\n<ul>\n<li>一个应用下不同配置的分组,可以简单的把namespace类比为文件,不同类型的配置放在不同的文件中,如数据库配置文件</li>\n<li>应用可以直接读取到公共组件的配置namespace</li>\n<li>应用也可以通过读取公共组件的配置namespace来对公共组件的配置做调整</li>\n</ul>\n<h3 id="apollo%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%9D%97%E4%BB%8B%E7%BB%8D">apollo架构模块介绍<a class="anchor" href="#apollo%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%9D%97%E4%BB%8B%E7%BB%8D">§</a></h3>\n<h4 id="config-service">Config Service<a class="anchor" href="#config-service">§</a></h4>\n<ul>\n<li>配置推送接口</li>\n<li>配置获取接口</li>\n<li>主要服务apollo客户端</li>\n</ul>\n<h4 id="admin-service">Admin Service<a class="anchor" href="#admin-service">§</a></h4>\n<ul>\n<li>配置管理接口</li>\n<li>配置修改,发布接口</li>\n<li>主要服务于Protal</li>\n</ul>\n<h4 id="meta-service">Meta Service<a class="anchor" href="#meta-service">§</a></h4>\n<ul>\n<li>Protal通过域名访问Meta Server 获取Admin Service 服务列表</li>\n<li>Client 通过域名访问Meta Server 获取Config Service服务列表</li>\n<li>就相当于一个Eureka Proxy(本来只需要eureka,客户端和protal就可以进行服务发现admin/config service ,但是为了达到多语言的支持,使用 Meta Servcie 对eureka进行了一层薄薄的封装,让client和protal通过域名访问Mea Server 进而获取config/admin服务列表))</li>\n</ul>\n<h4 id="eureka">Eureka<a class="anchor" href="#eureka">§</a></h4>\n<ul>\n<li>服务注册于发现</li>\n<li>服务Config/Admin Service的注册并报心跳</li>\n</ul>\n<h3 id="%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">服务端架构视图<a class="anchor" href="#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">§</a></h3>\n<p><img src="../assets/apollo/610A4B1D-2D93-4759-A79F-E53C09D529ED.png" alt="20200315152253.png"><img src="../assets/apollo/Snipaste_2019-06-08_14-27-59.png" alt="20200315152244.png"><img src="../assets/apollo/0AD86E3B-EE41-4BB9-A72D-B39978AF7AA4.png" alt="20200315152231.png"></p>\n<h3 id="%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">客户端架构视图<a class="anchor" href="#%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">§</a></h3>\n<p><img src="../assets/apollo/A8AF27F5-CB88-469D-B45C-77FAF49216CC.png" alt="20200315152311.png"></p>\n<h4 id="%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%9E%E7%8E%B0%E6%80%BB%E7%BB%93">客户端实现总结<a class="anchor" href="#%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%9E%E7%8E%B0%E6%80%BB%E7%BB%93">§</a></h4>\n<h5 id="%E6%8E%A8%E6%8B%89%E7%BB%93%E5%90%88">推拉结合<a class="anchor" href="#%E6%8E%A8%E6%8B%89%E7%BB%93%E5%90%88">§</a></h5>\n<ol>\n<li>config Server 和客户端保持一个长连接,配置实现实时推送</li>\n<li>客户端定期从Config Server拉取配置</li>\n</ol>\n<h5 id="%E9%85%8D%E7%BD%AE%E7%BC%93%E5%AD%98%E5%9C%A8%E6%9C%AC%E5%9C%B0">配置缓存在本地<a class="anchor" href="#%E9%85%8D%E7%BD%AE%E7%BC%93%E5%AD%98%E5%9C%A8%E6%9C%AC%E5%9C%B0">§</a></h5>\n<ol>\n<li>客户端本地会再缓存一次</li>\n</ol>\n<h5 id="%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F">应用程序<a class="anchor" href="#%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F">§</a></h5>\n<ol>\n<li>通过apollo客户端获取最新配置</li>\n<li>订阅配置更新通知</li>\n</ol>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#apollo%E7%9A%84%E5%8A%9F%E8%83%BD%E4%BA%AE%E7%82%B9">apollo的功能亮点</a></li><li><a href="#apollo%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B">apollo基础模型</a></li><li><a href="#apollo%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5">apollo核心概念</a><ol></ol></li><li><a href="#4-namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">4. namespace(命名空间)</a></li><li><a href="#apollo%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%9D%97%E4%BB%8B%E7%BB%8D">apollo架构模块介绍</a><ol></ol></li><li><a href="#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">服务端架构视图</a></li><li><a href="#%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%9E%B6%E6%9E%84%E8%A7%86%E5%9B%BE">客户端架构视图</a><ol></ol></li></ol></nav>'
        } }),
    'author': "zhangwengang",
    'contributors': [
        "zhangwengang"
    ],
    'date': "2019-09-12T00:00:00.000Z",
    'updated': null,
    'excerpt': "apollo的功能亮点 1. 统一管理不同环境,不同集群的配置 2. 配置修改实时生效(热发布) 3. 版本发布管理 4. 灰度发布 5. 有权限管理 6. 文档完善 apollo文档 apollo基础模型 1. 用户在配置中心对配置进行修改并发布 2. 配置中心会...",
    'cover': "../assets/apollo/610A4B1D-2D93-4759-A79F-E53C09D529ED.png",
    'categories': [
        "编程世界"
    ],
    'tags': [
        "apollo",
        "配置中心"
    ],
    'blog': {
        "isPost": true,
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
