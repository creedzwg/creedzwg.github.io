import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/jvm hello world.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/jvm hello world.html",
    'title': "jvm",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>jvm</h1>\n<h3 id="jvm-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">jvm 的生命周期<a class="anchor" href="#jvm-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">§</a></h3>\n<h4 id="%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E5%90%AF%E5%8A%A8">虚拟机的启动<a class="anchor" href="#%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E5%90%AF%E5%8A%A8">§</a></h4>\n<p>1：java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class)来完成的，这个类是由虚拟机的具体事项指定的</p>\n<h4 id="%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E6%89%A7%E8%A1%8C">虚拟机的执行<a class="anchor" href="#%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E6%89%A7%E8%A1%8C">§</a></h4>\n<ul>\n<li>一个运行中的Java虚拟机有着一个清晰地任务：执行java程序</li>\n<li>程序开始执行时他才运行，程序结束时他就停止</li>\n<li>执行一个所谓的java程序的时候，真正执行的是一个叫做java虚拟机的进程</li>\n</ul>\n<h4 id="%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E7%BB%93%E6%9D%9F">虚拟机的结束<a class="anchor" href="#%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E7%BB%93%E6%9D%9F">§</a></h4>\n<ul>\n<li>当虚拟机中除了守护线程以外，没有其他线程运行时，虚拟机就会退出</li>\n<li>当程序抛出异常时</li>\n<li></li>\n</ul>\n<h4 id="jvm%E7%9A%84%E7%BB%93%E6%9E%84">jvm的结构<a class="anchor" href="#jvm%E7%9A%84%E7%BB%93%E6%9E%84">§</a></h4>\n<p><img src="https://img.hacpai.com/file/2020/03/20200315160049-d756f8e7.png" alt="20200315160049.png"><img src="https://img.hacpai.com/file/2020/03/20200315160058-1aad0379.png" alt="20200315160058.png"></p>\n<h4 id="%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%8F%8A%E5%85%B6%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">类加载器及其类加载过程<a class="anchor" href="#%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%8F%8A%E5%85%B6%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">§</a></h4>\n<p><img src="https://img.hacpai.com/file/2020/03/20200315160106-ad21d136.png" alt="20200315160106.png"></p>\n<ol>\n<li>类加载子系统负责从文件系统或者网络中加载class文件，class文件在文件开头有特定的文件标识</li>\n<li>class loader只是负责class文件的加载，至于他是否可以运行，则有execution engine决定</li>\n<li>加载的类信息存放于一块称为方法区的内存空间。除了类的信息外，方法区还会存在运行时常量池信息（可能包括字符串字面量和数字产量）</li>\n</ol>\n<h4 id="%E7%B1%BB%E7%9A%84%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">类的加载过程<a class="anchor" href="#%E7%B1%BB%E7%9A%84%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">§</a></h4>\n<p><img src="https://img.hacpai.com/file/2020/03/20200315160112-1aeab98c.png" alt="20200315160112.png"></p>\n<h6 id="%E5%8A%A0%E8%BD%BD">加载<a class="anchor" href="#%E5%8A%A0%E8%BD%BD">§</a></h6>\n<ol>\n<li>通过类的全限定名获取定义此类的二进制字节流</li>\n<li>将这个字节流所代表的的静态存储结构转换为方法区的运行时数据结构</li>\n<li><strong>在内存生成一个代表这个类的java.lang.class对象</strong> ，作为方法区这个类的各种数据的访问入口</li>\n</ol>\n<h6 id="%E9%93%BE%E6%8E%A5%E9%98%B6%E6%AE%B5">链接阶段<a class="anchor" href="#%E9%93%BE%E6%8E%A5%E9%98%B6%E6%AE%B5">§</a></h6>\n<ul>\n<li>验证：目的在于确保class文件中的字节流包含信息符合当前虚拟机要求，保证被加载类的正确性</li>\n<li>准备：为类变量（static修饰）分配内存并且设置类变量的默认初始化，即零值</li>\n<li>解析：将常量池中的符合引用转换为直接引用的过程</li>\n</ul>\n<h6 id="%E5%88%9D%E5%A7%8B%E5%8C%96%E9%98%B6%E6%AE%B5">初始化阶段<a class="anchor" href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%98%B6%E6%AE%B5">§</a></h6>\n<ul>\n<li>初始化阶段就是执行类构造器方法<clinit>的过程</li>\n<li>此方法不需要定义，是javac编译器自动收集类中的赋值动作和静态代码块中的语句合并而来</li>\n<li>构造器方法中指令按语句在源文件中出现的顺序执行</li>\n<li>clinit不同于类的构造器</li>\n<li>虚拟机必须保证一个类的clinit方法在多线程下呗同步加锁</li>\n</ul>\n<h4 id="%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">类加载器<a class="anchor" href="#%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h4>\n<h5 id="bootstrap-class-loader%E5%BC%95%E5%AF%BC%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">bootstrap class loader（引导类加载器）<a class="anchor" href="#bootstrap-class-loader%E5%BC%95%E5%AF%BC%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h5>\n<ol>\n<li>这个类加载器使用c/c++实现的，嵌套在JVM内部</li>\n<li>他用来加载Java的核心库（rt.jar source.jar 等),用于提供JVM自身需要的类</li>\n<li>并不继承自java.lang.classLoader.没有父加载器</li>\n<li>用来加载扩展类加载器和程序类加载器,作为他们的父类(扩展和程序类加载器也是对象,也需要被加载)</li>\n<li>出于安全考虑,Bootstrap类加载器只加载包名为java.javax,sun等开头的类</li>\n</ol>\n<h5 id="extension-class-loader-%E6%89%A9%E5%B1%95%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">extension class loader (扩展类加载器)<a class="anchor" href="#extension-class-loader-%E6%89%A9%E5%B1%95%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h5>\n<ol>\n<li>java语言编号,由sun.misc.launcher$ExtClassLoader实现</li>\n<li>派生于classLoader类</li>\n<li>父加载器为引导类加载器</li>\n<li>从java.ext.dirs或从jdk的安装木木jre/lib/ext子目录下加载类库,如果用户创建的jar放在此目录下,也会自动的由扩展类加载器加载</li>\n</ol>\n<h5 id="application-class-loader%E7%A8%8B%E5%BA%8F%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">application class loader(程序类加载器)<a class="anchor" href="#application-class-loader%E7%A8%8B%E5%BA%8F%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h5>\n<p>1.用的最多的类加载器,非引导或者扩展类加载器不加载的类都由程序类加载器加载或自定义类加载器加载</p>\n<h4 id="%E5%8F%8C%E4%BA%B2%E5%A7%94%E6%B4%BE%E6%9C%BA%E5%88%B6">双亲委派机制<a class="anchor" href="#%E5%8F%8C%E4%BA%B2%E5%A7%94%E6%B4%BE%E6%9C%BA%E5%88%B6">§</a></h4>\n<p>java虚拟机对class文件采用的是<strong>按需加载</strong>的方式,也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象.而且加载某个类的class文件时采取的<strong>双亲委派</strong>模式,即把请求交由父类处理</p>\n<h5 id="%E8%AF%A6%E7%BB%86%E8%AF%B4%E6%98%8E">详细说明<a class="anchor" href="#%E8%AF%A6%E7%BB%86%E8%AF%B4%E6%98%8E">§</a></h5>\n<ol>\n<li>如果一个类加载器收到了类加载的请求,他首先不会自己去加载,而是将这个请求委托给父加载器去执行</li>\n<li>如果父类加载器还存在其父类加载器,则依次向上传递,最终到达顶层的引导类加载器</li>\n<li>如果父类加载器可以完成类加载任务,就成功返回,倘若父类加载器无法完成此加载任务,子加载器才会尝试自己去加载,这就是双亲委派模式</li>\n</ol>\n<h6 id="%E4%BC%98%E5%8A%BF">优势<a class="anchor" href="#%E4%BC%98%E5%8A%BF">§</a></h6>\n<ol>\n<li>避免类的重复加载</li>\n<li>保护程序安全,防止核心api被篡改,java.lang.String</li>\n</ol>\n<h4 id="%E7%A8%8B%E5%BA%8F%E8%AE%A1%E6%95%B0%E5%99%A8program-count-register">程序计数器(program count register)<a class="anchor" href="#%E7%A8%8B%E5%BA%8F%E8%AE%A1%E6%95%B0%E5%99%A8program-count-register">§</a></h4>\n<ol>\n<li>程序计数器用来存储指向下一条指令的地址,也就是即将要执行的指令代码.由执行引擎读取下一条指令</li>\n<li>它是一块很小的内存空间,几乎可以忽略不计,也是运行速度最快的存储区域</li>\n<li>在jvm规范中,每个线程都有自己独立的程序计数器,是线程私有的,生命周期于线程的生命周期保持一致</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "jvm"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="jvm-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">jvm 的生命周期<a class="anchor" href="#jvm-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">§</a></h3>\n<h4 id="%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E5%90%AF%E5%8A%A8">虚拟机的启动<a class="anchor" href="#%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E5%90%AF%E5%8A%A8">§</a></h4>\n<p>1：java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class)来完成的，这个类是由虚拟机的具体事项指定的</p>\n<h4 id="%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E6%89%A7%E8%A1%8C">虚拟机的执行<a class="anchor" href="#%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E6%89%A7%E8%A1%8C">§</a></h4>\n<ul>\n<li>一个运行中的Java虚拟机有着一个清晰地任务：执行java程序</li>\n<li>程序开始执行时他才运行，程序结束时他就停止</li>\n<li>执行一个所谓的java程序的时候，真正执行的是一个叫做java虚拟机的进程</li>\n</ul>\n<h4 id="%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E7%BB%93%E6%9D%9F">虚拟机的结束<a class="anchor" href="#%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E7%BB%93%E6%9D%9F">§</a></h4>\n<ul>\n<li>当虚拟机中除了守护线程以外，没有其他线程运行时，虚拟机就会退出</li>\n<li>当程序抛出异常时</li>\n<li></li>\n</ul>\n<h4 id="jvm%E7%9A%84%E7%BB%93%E6%9E%84">jvm的结构<a class="anchor" href="#jvm%E7%9A%84%E7%BB%93%E6%9E%84">§</a></h4>\n<p><img src="https://img.hacpai.com/file/2020/03/20200315160049-d756f8e7.png" alt="20200315160049.png"><img src="https://img.hacpai.com/file/2020/03/20200315160058-1aad0379.png" alt="20200315160058.png"></p>\n<h4 id="%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%8F%8A%E5%85%B6%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">类加载器及其类加载过程<a class="anchor" href="#%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%8F%8A%E5%85%B6%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">§</a></h4>\n<p><img src="https://img.hacpai.com/file/2020/03/20200315160106-ad21d136.png" alt="20200315160106.png"></p>\n<ol>\n<li>类加载子系统负责从文件系统或者网络中加载class文件，class文件在文件开头有特定的文件标识</li>\n<li>class loader只是负责class文件的加载，至于他是否可以运行，则有execution engine决定</li>\n<li>加载的类信息存放于一块称为方法区的内存空间。除了类的信息外，方法区还会存在运行时常量池信息（可能包括字符串字面量和数字产量）</li>\n</ol>\n<h4 id="%E7%B1%BB%E7%9A%84%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">类的加载过程<a class="anchor" href="#%E7%B1%BB%E7%9A%84%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B">§</a></h4>\n<p><img src="https://img.hacpai.com/file/2020/03/20200315160112-1aeab98c.png" alt="20200315160112.png"></p>\n<h6 id="%E5%8A%A0%E8%BD%BD">加载<a class="anchor" href="#%E5%8A%A0%E8%BD%BD">§</a></h6>\n<ol>\n<li>通过类的全限定名获取定义此类的二进制字节流</li>\n<li>将这个字节流所代表的的静态存储结构转换为方法区的运行时数据结构</li>\n<li><strong>在内存生成一个代表这个类的java.lang.class对象</strong> ，作为方法区这个类的各种数据的访问入口</li>\n</ol>\n<h6 id="%E9%93%BE%E6%8E%A5%E9%98%B6%E6%AE%B5">链接阶段<a class="anchor" href="#%E9%93%BE%E6%8E%A5%E9%98%B6%E6%AE%B5">§</a></h6>\n<ul>\n<li>验证：目的在于确保class文件中的字节流包含信息符合当前虚拟机要求，保证被加载类的正确性</li>\n<li>准备：为类变量（static修饰）分配内存并且设置类变量的默认初始化，即零值</li>\n<li>解析：将常量池中的符合引用转换为直接引用的过程</li>\n</ul>\n<h6 id="%E5%88%9D%E5%A7%8B%E5%8C%96%E9%98%B6%E6%AE%B5">初始化阶段<a class="anchor" href="#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%98%B6%E6%AE%B5">§</a></h6>\n<ul>\n<li>初始化阶段就是执行类构造器方法<clinit>的过程</li>\n<li>此方法不需要定义，是javac编译器自动收集类中的赋值动作和静态代码块中的语句合并而来</li>\n<li>构造器方法中指令按语句在源文件中出现的顺序执行</li>\n<li>clinit不同于类的构造器</li>\n<li>虚拟机必须保证一个类的clinit方法在多线程下呗同步加锁</li>\n</ul>\n<h4 id="%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">类加载器<a class="anchor" href="#%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h4>\n<h5 id="bootstrap-class-loader%E5%BC%95%E5%AF%BC%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">bootstrap class loader（引导类加载器）<a class="anchor" href="#bootstrap-class-loader%E5%BC%95%E5%AF%BC%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h5>\n<ol>\n<li>这个类加载器使用c/c++实现的，嵌套在JVM内部</li>\n<li>他用来加载Java的核心库（rt.jar source.jar 等),用于提供JVM自身需要的类</li>\n<li>并不继承自java.lang.classLoader.没有父加载器</li>\n<li>用来加载扩展类加载器和程序类加载器,作为他们的父类(扩展和程序类加载器也是对象,也需要被加载)</li>\n<li>出于安全考虑,Bootstrap类加载器只加载包名为java.javax,sun等开头的类</li>\n</ol>\n<h5 id="extension-class-loader-%E6%89%A9%E5%B1%95%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">extension class loader (扩展类加载器)<a class="anchor" href="#extension-class-loader-%E6%89%A9%E5%B1%95%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h5>\n<ol>\n<li>java语言编号,由sun.misc.launcher$ExtClassLoader实现</li>\n<li>派生于classLoader类</li>\n<li>父加载器为引导类加载器</li>\n<li>从java.ext.dirs或从jdk的安装木木jre/lib/ext子目录下加载类库,如果用户创建的jar放在此目录下,也会自动的由扩展类加载器加载</li>\n</ol>\n<h5 id="application-class-loader%E7%A8%8B%E5%BA%8F%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">application class loader(程序类加载器)<a class="anchor" href="#application-class-loader%E7%A8%8B%E5%BA%8F%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8">§</a></h5>\n<p>1.用的最多的类加载器,非引导或者扩展类加载器不加载的类都由程序类加载器加载或自定义类加载器加载</p>\n<h4 id="%E5%8F%8C%E4%BA%B2%E5%A7%94%E6%B4%BE%E6%9C%BA%E5%88%B6">双亲委派机制<a class="anchor" href="#%E5%8F%8C%E4%BA%B2%E5%A7%94%E6%B4%BE%E6%9C%BA%E5%88%B6">§</a></h4>\n<p>java虚拟机对class文件采用的是<strong>按需加载</strong>的方式,也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象.而且加载某个类的class文件时采取的<strong>双亲委派</strong>模式,即把请求交由父类处理</p>\n<h5 id="%E8%AF%A6%E7%BB%86%E8%AF%B4%E6%98%8E">详细说明<a class="anchor" href="#%E8%AF%A6%E7%BB%86%E8%AF%B4%E6%98%8E">§</a></h5>\n<ol>\n<li>如果一个类加载器收到了类加载的请求,他首先不会自己去加载,而是将这个请求委托给父加载器去执行</li>\n<li>如果父类加载器还存在其父类加载器,则依次向上传递,最终到达顶层的引导类加载器</li>\n<li>如果父类加载器可以完成类加载任务,就成功返回,倘若父类加载器无法完成此加载任务,子加载器才会尝试自己去加载,这就是双亲委派模式</li>\n</ol>\n<h6 id="%E4%BC%98%E5%8A%BF">优势<a class="anchor" href="#%E4%BC%98%E5%8A%BF">§</a></h6>\n<ol>\n<li>避免类的重复加载</li>\n<li>保护程序安全,防止核心api被篡改,java.lang.String</li>\n</ol>\n<h4 id="%E7%A8%8B%E5%BA%8F%E8%AE%A1%E6%95%B0%E5%99%A8program-count-register">程序计数器(program count register)<a class="anchor" href="#%E7%A8%8B%E5%BA%8F%E8%AE%A1%E6%95%B0%E5%99%A8program-count-register">§</a></h4>\n<ol>\n<li>程序计数器用来存储指向下一条指令的地址,也就是即将要执行的指令代码.由执行引擎读取下一条指令</li>\n<li>它是一块很小的内存空间,几乎可以忽略不计,也是运行速度最快的存储区域</li>\n<li>在jvm规范中,每个线程都有自己独立的程序计数器,是线程私有的,生命周期于线程的生命周期保持一致</li>\n</ol>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#jvm-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">jvm 的生命周期</a><ol></ol></li></ol></nav>'
        } }),
    'author': "zhangwengang",
    'contributors': [
        "zhangwengang"
    ],
    'date': "2018-10-11T00:00:00.000Z",
    'updated': null,
    'excerpt': "jvm 的生命周期 虚拟机的启动 1：java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class)来完成的，这个类是由虚拟机的具体事项指定的 虚拟机的执行 - 一个运行中的Java虚拟机有着一个清...",
    'cover': "https://img.hacpai.com/file/2020/03/20200315160049-d756f8e7.png",
    'categories': [
        "编程世界"
    ],
    'tags': [
        "jvm",
        "并发编程"
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
                "title": "java8 lambda,stream流浅析",
                "link": "posts/java8_new_feature.html",
                "date": "2019-05-23T00:00:00.000Z",
                "updated": null,
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
            },
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
