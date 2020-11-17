import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "posts/volatile浅析.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/volatile浅析.html",
    'title': "volatile浅析",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>volatile浅析</h1>\n<h4 id="%E7%AE%80%E4%BB%8B">简介<a class="anchor" href="#%E7%AE%80%E4%BB%8B">§</a></h4>\n<ol>\n<li>volatile 关键是用来修饰静态变量和实例变量的,对于方法参数,局部变量和实例常量和类常量都不能修饰</li>\n<li>volatile修饰的类变量和实例变量能保证两次语义\n<ul>\n<li>:保证了不同线程对共享变量操作时的可见性,即一个线程对变量的修改,其他线程能够立马获取到最新的值</li>\n<li>:禁止了指令重排序</li>\n</ul>\n</li>\n</ol>\n<h4 id="%E5%8E%86%E5%8F%B2%E8%83%8C%E6%99%AF%E6%9C%BA%E5%99%A8%E7%A1%AC%E4%BB%B6cpu">历史背景,机器硬件cpu<a class="anchor" href="#%E5%8E%86%E5%8F%B2%E8%83%8C%E6%99%AF%E6%9C%BA%E5%99%A8%E7%A1%AC%E4%BB%B6cpu">§</a></h4>\n<h4 id="java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B">java内存模型<a class="anchor" href="#java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B">§</a></h4>\n<ol>\n<li>java内存模型指定了jvm虚拟机和主内存之间如何进行交互,工作,他指定了一个线程对共享变量的修改何时对其他线程可见,定义了线程与主内存之间的抽象关系,具体如下\n<ul>\n<li>共享变量储存于主内存中,所有的线程都可以访问</li>\n<li>每个线程都有私有的工作内存,也被称为本地内存(这个工作内存指的是一个抽象的概念,并不是实际存在,它涵盖了缓存,寄存器,编译器优化等)</li>\n<li>工作内存只存储该线程对共享变量的副本</li>\n<li>线程不能直接操作主内存,只有先操作了工作内存之后才能写入主内存</li>\n<li>工作内存和jmm一样都是一个抽象概念,不是实际存在的</li>\n</ul>\n</li>\n</ol>\n<p><img src="../assets/volatile/jmm.jpg" alt="20201019190454.jpg"></p>\n<h4 id="%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E7%9A%84%E4%B8%89%E5%A4%A7%E7%89%B9%E6%80%A7%E4%B8%8Ejmm">并发编程的三大特性与jmm<a class="anchor" href="#%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E7%9A%84%E4%B8%89%E5%A4%A7%E7%89%B9%E6%80%A7%E4%B8%8Ejmm">§</a></h4>\n<ol>\n<li><strong>原子性</strong>\n<ul>\n<li>原子性指的是一次操作或者多次操作中,要么是所有的指令都能得到成功执行,要么就是都不执行,就事务的acid中的原子性是一样的</li>\n<li>jmm能够保证基本类型和引用类型的赋值是原子性的,但是多个原子性的操作合在一起,并不一定就是原子性的,例如i++操作(1:从主内存中读取i(如果工作内存中存在i的副本则直接拿) 存入到工作内存中;2:在调用线程的工作内存中进行+1运算;3:将运算后的值写入到主内存中去)</li>\n<li>volatile关键不能保证原子性,synchronized关键字可以保证原子性,juc的lock和原子类型变量同样也可以保证原子性</li>\n</ul>\n</li>\n<li><strong>可见性</strong>\n<ul>\n<li>可见性指的是一个线程对共享变量进行了修改,那么另外的线程可以立即看到修改后的最新值</li>\n<li>volatile和synchronized,juc的lock都可保证可见性</li>\n</ul>\n</li>\n<li><strong>有序性</strong>\n<ul>\n<li>所谓的有序性指的是代码运行过程中的先后顺序,在现代的cpu中,一般为了程序运行的速度,会对代码的运行顺序做一定的优化,他不会保证代码的运行顺序完全按照编写的顺序来,会进行指令重排序,但是他可以保证最终的运行结果是编码所期望的,这种情况在单线程的环境没有问题,但是在多线程的环境下,有序性得不到保证会出大问题,类似于依赖flag进行初始化的程序</li>\n<li>volatile和synchronized,juc的lock都可保证可见性,后两者是通过同步的机制来保证的,同步的代码在执行的时候就和单线程的情况下一样自然能够保证顺序性(最终结果的顺序性)</li>\n<li>jmm具有一些天然的有序性规则,不需要进行额外的同步就可以保证有序性,这个称为happen-before原则,如果两个操作的次序不能够从happen-before原则中推断出来,那么这两个操作就不具有有序性,虚拟机和处理器可随意进行重排序</li>\n</ul>\n</li>\n</ol>\n<h5 id="happen-before%E5%8E%9F%E5%88%99">happen-before原则<a class="anchor" href="#happen-before%E5%8E%9F%E5%88%99">§</a></h5>\n<ul>\n<li>程序次序原则:在一个线程内,代码按照编写的次序执行,编写在后面的操作发生在编写的前面的操作之后,这个并不是说不会进行指令重排序,只是说在一个线程内,程序运行的结果会按照预期的进行</li>\n<li>锁定规则:一个unlock操作要先行发生于对一个锁的lock操作:无论在单线程还是多线程内,如果同一个锁是锁定状态,那么必须先对其执行释放操作之后才能继续进行lock操作</li>\n<li>volatile变量原则:对一个变量的写操作发生在对一个变量的读操作之前,如果一个线程对一个volatile变量进行写操作,另外一个线程进行读操作,那么写操作一定发生在读操作之前</li>\n<li>传递原则:如果a happen-before b,b happen-before c,那么a 一定happen-before c</li>\n<li>其他的没啥意义</li>\n</ul>\n<h5 id="%E6%80%BB%E7%BB%93">总结<a class="anchor" href="#%E6%80%BB%E7%BB%93">§</a></h5>\n<p>volatile具有 可见性和有序性</p>\n<h4 id="volatile%E5%85%B3%E9%94%AE%E5%AD%97%E7%9A%84%E5%8E%9F%E7%90%86">volatile关键字的原理<a class="anchor" href="#volatile%E5%85%B3%E9%94%AE%E5%AD%97%E7%9A%84%E5%8E%9F%E7%90%86">§</a></h4>\n<ol>\n<li>volatile如何保证修改的共享变量,其他线程能够马上获取到?</li>\n<li>volatile 如何保证有序性,很暴力,直接禁止</li>\n</ol>\n<ul>\n<li>主要是通过 <strong>lock;</strong> 内存屏障来实现的,cpp的源码显示,每个volatile关键字的前面都会有一个lock;前缀,这个前缀他能保证几层语义\n<ol>\n<li>强制将线程工作内存中的值的修改刷新到主内存</li>\n<li>如果是写操作,会导致其他工作内存中的缓存数据失效,必须重新从主内存中去拿</li>\n<li>确保指令重排序的时候不会将其前面的代码排到内存屏障之后</li>\n<li>确保指令重排序的时候不会将其后面的代码排到内存屏障之前</li>\n<li>确保代码执行到内存屏障的时候前面的代码已经全部执行完毕</li>\n</ol>\n</li>\n</ul>\n<h4 id="volatile%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF">volatile的使用场景<a class="anchor" href="#volatile%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF">§</a></h4>\n<ol>\n<li>开关控制作为可见性的特点</li>\n<li>状态标记你用有序性特点,单例模式的double-check也是利用了顺序性特点</li>\n</ol>\n<h4 id="volatile%E5%92%8Csynchronized%E7%9A%84%E5%8C%BA%E5%88%AB">volatile和synchronized的区别<a class="anchor" href="#volatile%E5%92%8Csynchronized%E7%9A%84%E5%8C%BA%E5%88%AB">§</a></h4>\n<h5 id="%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F%E4%B8%8A">使用方式上<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F%E4%B8%8A">§</a></h5>\n<ol>\n<li>volatile只能修饰实例变量和静态变量,不能修饰成员变量,方法参数,类变量,方法上,而synchronized可以修饰方法和代码块上</li>\n<li>volatile修饰的变量可以为null,synchronized需要的lock不可能为null</li>\n</ol>\n<h5 id="%E4%BD%9C%E7%94%A8%E4%B8%8A">作用上<a class="anchor" href="#%E4%BD%9C%E7%94%A8%E4%B8%8A">§</a></h5>\n<ol>\n<li>可见性的实现方式\n<ol>\n<li>volatile是通过内存屏障的手段来实现的,修改后强制刷新到主内存,同时将其他工作内存中的值失效,而synchronized是通过lock的排他性来实现的,具体是同一时间只有获取锁的单个线程才对代码块或者方法进行操作,在锁释放的时候强制将工作内存中的数据刷新到主内存中去</li>\n</ol>\n</li>\n<li>有序性的实现方法\n<ol>\n<li>volatile是通过禁止编译器和虚拟机的指令重排序来保证有序性</li>\n<li>synchronized 是通过同步,串行化的方式来保证代码块的有序性,同一时间只有获取锁的线程才能执行,就相当于单线程了,也就不存在有序性的问题了,但是同步代码块的里面的代码仍然可以进行重排序</li>\n</ol>\n</li>\n<li>原子性的实现方法\n<ol>\n<li>volatile不能保证原子性</li>\n<li>synchronized是一种排他的机制,因此被synchronized修饰的代码是无法中途被打断的,所以synchronized是可以保证原子性的</li>\n</ol>\n</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "volatile\u6D45\u6790"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h4 id="%E7%AE%80%E4%BB%8B">简介<a class="anchor" href="#%E7%AE%80%E4%BB%8B">§</a></h4>\n<ol>\n<li>volatile 关键是用来修饰静态变量和实例变量的,对于方法参数,局部变量和实例常量和类常量都不能修饰</li>\n<li>volatile修饰的类变量和实例变量能保证两次语义\n<ul>\n<li>:保证了不同线程对共享变量操作时的可见性,即一个线程对变量的修改,其他线程能够立马获取到最新的值</li>\n<li>:禁止了指令重排序</li>\n</ul>\n</li>\n</ol>\n<h4 id="%E5%8E%86%E5%8F%B2%E8%83%8C%E6%99%AF%E6%9C%BA%E5%99%A8%E7%A1%AC%E4%BB%B6cpu">历史背景,机器硬件cpu<a class="anchor" href="#%E5%8E%86%E5%8F%B2%E8%83%8C%E6%99%AF%E6%9C%BA%E5%99%A8%E7%A1%AC%E4%BB%B6cpu">§</a></h4>\n<h4 id="java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B">java内存模型<a class="anchor" href="#java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B">§</a></h4>\n<ol>\n<li>java内存模型指定了jvm虚拟机和主内存之间如何进行交互,工作,他指定了一个线程对共享变量的修改何时对其他线程可见,定义了线程与主内存之间的抽象关系,具体如下\n<ul>\n<li>共享变量储存于主内存中,所有的线程都可以访问</li>\n<li>每个线程都有私有的工作内存,也被称为本地内存(这个工作内存指的是一个抽象的概念,并不是实际存在,它涵盖了缓存,寄存器,编译器优化等)</li>\n<li>工作内存只存储该线程对共享变量的副本</li>\n<li>线程不能直接操作主内存,只有先操作了工作内存之后才能写入主内存</li>\n<li>工作内存和jmm一样都是一个抽象概念,不是实际存在的</li>\n</ul>\n</li>\n</ol>\n<p><img src="../assets/volatile/jmm.jpg" alt="20201019190454.jpg"></p>\n<h4 id="%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E7%9A%84%E4%B8%89%E5%A4%A7%E7%89%B9%E6%80%A7%E4%B8%8Ejmm">并发编程的三大特性与jmm<a class="anchor" href="#%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E7%9A%84%E4%B8%89%E5%A4%A7%E7%89%B9%E6%80%A7%E4%B8%8Ejmm">§</a></h4>\n<ol>\n<li><strong>原子性</strong>\n<ul>\n<li>原子性指的是一次操作或者多次操作中,要么是所有的指令都能得到成功执行,要么就是都不执行,就事务的acid中的原子性是一样的</li>\n<li>jmm能够保证基本类型和引用类型的赋值是原子性的,但是多个原子性的操作合在一起,并不一定就是原子性的,例如i++操作(1:从主内存中读取i(如果工作内存中存在i的副本则直接拿) 存入到工作内存中;2:在调用线程的工作内存中进行+1运算;3:将运算后的值写入到主内存中去)</li>\n<li>volatile关键不能保证原子性,synchronized关键字可以保证原子性,juc的lock和原子类型变量同样也可以保证原子性</li>\n</ul>\n</li>\n<li><strong>可见性</strong>\n<ul>\n<li>可见性指的是一个线程对共享变量进行了修改,那么另外的线程可以立即看到修改后的最新值</li>\n<li>volatile和synchronized,juc的lock都可保证可见性</li>\n</ul>\n</li>\n<li><strong>有序性</strong>\n<ul>\n<li>所谓的有序性指的是代码运行过程中的先后顺序,在现代的cpu中,一般为了程序运行的速度,会对代码的运行顺序做一定的优化,他不会保证代码的运行顺序完全按照编写的顺序来,会进行指令重排序,但是他可以保证最终的运行结果是编码所期望的,这种情况在单线程的环境没有问题,但是在多线程的环境下,有序性得不到保证会出大问题,类似于依赖flag进行初始化的程序</li>\n<li>volatile和synchronized,juc的lock都可保证可见性,后两者是通过同步的机制来保证的,同步的代码在执行的时候就和单线程的情况下一样自然能够保证顺序性(最终结果的顺序性)</li>\n<li>jmm具有一些天然的有序性规则,不需要进行额外的同步就可以保证有序性,这个称为happen-before原则,如果两个操作的次序不能够从happen-before原则中推断出来,那么这两个操作就不具有有序性,虚拟机和处理器可随意进行重排序</li>\n</ul>\n</li>\n</ol>\n<h5 id="happen-before%E5%8E%9F%E5%88%99">happen-before原则<a class="anchor" href="#happen-before%E5%8E%9F%E5%88%99">§</a></h5>\n<ul>\n<li>程序次序原则:在一个线程内,代码按照编写的次序执行,编写在后面的操作发生在编写的前面的操作之后,这个并不是说不会进行指令重排序,只是说在一个线程内,程序运行的结果会按照预期的进行</li>\n<li>锁定规则:一个unlock操作要先行发生于对一个锁的lock操作:无论在单线程还是多线程内,如果同一个锁是锁定状态,那么必须先对其执行释放操作之后才能继续进行lock操作</li>\n<li>volatile变量原则:对一个变量的写操作发生在对一个变量的读操作之前,如果一个线程对一个volatile变量进行写操作,另外一个线程进行读操作,那么写操作一定发生在读操作之前</li>\n<li>传递原则:如果a happen-before b,b happen-before c,那么a 一定happen-before c</li>\n<li>其他的没啥意义</li>\n</ul>\n<h5 id="%E6%80%BB%E7%BB%93">总结<a class="anchor" href="#%E6%80%BB%E7%BB%93">§</a></h5>\n<p>volatile具有 可见性和有序性</p>\n<h4 id="volatile%E5%85%B3%E9%94%AE%E5%AD%97%E7%9A%84%E5%8E%9F%E7%90%86">volatile关键字的原理<a class="anchor" href="#volatile%E5%85%B3%E9%94%AE%E5%AD%97%E7%9A%84%E5%8E%9F%E7%90%86">§</a></h4>\n<ol>\n<li>volatile如何保证修改的共享变量,其他线程能够马上获取到?</li>\n<li>volatile 如何保证有序性,很暴力,直接禁止</li>\n</ol>\n<ul>\n<li>主要是通过 <strong>lock;</strong> 内存屏障来实现的,cpp的源码显示,每个volatile关键字的前面都会有一个lock;前缀,这个前缀他能保证几层语义\n<ol>\n<li>强制将线程工作内存中的值的修改刷新到主内存</li>\n<li>如果是写操作,会导致其他工作内存中的缓存数据失效,必须重新从主内存中去拿</li>\n<li>确保指令重排序的时候不会将其前面的代码排到内存屏障之后</li>\n<li>确保指令重排序的时候不会将其后面的代码排到内存屏障之前</li>\n<li>确保代码执行到内存屏障的时候前面的代码已经全部执行完毕</li>\n</ol>\n</li>\n</ul>\n<h4 id="volatile%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF">volatile的使用场景<a class="anchor" href="#volatile%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF">§</a></h4>\n<ol>\n<li>开关控制作为可见性的特点</li>\n<li>状态标记你用有序性特点,单例模式的double-check也是利用了顺序性特点</li>\n</ol>\n<h4 id="volatile%E5%92%8Csynchronized%E7%9A%84%E5%8C%BA%E5%88%AB">volatile和synchronized的区别<a class="anchor" href="#volatile%E5%92%8Csynchronized%E7%9A%84%E5%8C%BA%E5%88%AB">§</a></h4>\n<h5 id="%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F%E4%B8%8A">使用方式上<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F%E4%B8%8A">§</a></h5>\n<ol>\n<li>volatile只能修饰实例变量和静态变量,不能修饰成员变量,方法参数,类变量,方法上,而synchronized可以修饰方法和代码块上</li>\n<li>volatile修饰的变量可以为null,synchronized需要的lock不可能为null</li>\n</ol>\n<h5 id="%E4%BD%9C%E7%94%A8%E4%B8%8A">作用上<a class="anchor" href="#%E4%BD%9C%E7%94%A8%E4%B8%8A">§</a></h5>\n<ol>\n<li>可见性的实现方式\n<ol>\n<li>volatile是通过内存屏障的手段来实现的,修改后强制刷新到主内存,同时将其他工作内存中的值失效,而synchronized是通过lock的排他性来实现的,具体是同一时间只有获取锁的单个线程才对代码块或者方法进行操作,在锁释放的时候强制将工作内存中的数据刷新到主内存中去</li>\n</ol>\n</li>\n<li>有序性的实现方法\n<ol>\n<li>volatile是通过禁止编译器和虚拟机的指令重排序来保证有序性</li>\n<li>synchronized 是通过同步,串行化的方式来保证代码块的有序性,同一时间只有获取锁的线程才能执行,就相当于单线程了,也就不存在有序性的问题了,但是同步代码块的里面的代码仍然可以进行重排序</li>\n</ol>\n</li>\n<li>原子性的实现方法\n<ol>\n<li>volatile不能保证原子性</li>\n<li>synchronized是一种排他的机制,因此被synchronized修饰的代码是无法中途被打断的,所以synchronized是可以保证原子性的</li>\n</ol>\n</li>\n</ol>'
        } }),
    'toc': null,
    'author': "zhangwengang",
    'contributors': [
        "zhangwengang"
    ],
    'date': "2020-10-11T00:00:00.000Z",
    'updated': null,
    'excerpt': "简介 1. volatile 关键是用来修饰静态变量和实例变量的,对于方法参数,局部变量和实例常量和类常量都不能修饰 2. volatile修饰的类变量和实例变量能保证两次语义 - :保证了不同线程对共享变量操作时的可见性,即一个线程对变量的...",
    'cover': "../assets/volatile/jmm.jpg",
    'categories': [
        "编程世界"
    ],
    'tags': [
        "volatile",
        "并发编程"
    ],
    'blog': {
        "isPost": true,
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
            }
        ]
    }
};
