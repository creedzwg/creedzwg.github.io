import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/zookeeper.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/zookeeper.html",
    'title': "zookeeper 入门",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>zookeeper 入门</h1>\n<h2 id="zookeeper%E6%98%AF%E4%BB%80%E4%B9%88">zookeeper是什么?<a class="anchor" href="#zookeeper%E6%98%AF%E4%BB%80%E4%B9%88">§</a></h2>\n<p>官网的介绍:zookeeper是一个开放源代码的分布式协调服务,由雅虎创建.是google chubby的开源实现,她是一个典型的分布式数据一致性的解决方案,分布式系统可以基于它来实现诸如数据发布/订阅,负载均衡,命名服务,集群管理,master选举,分布式锁等功能,他可以保证分布式的数据一致性特性.</p>\n<ul>\n<li>顺序一致性:从同一个客户端发起的事务请求,最终会严格按照其发起的顺序被应用到zookeeper中去</li>\n<li>原子性:所有事务的处理结果在整个集群中的所有的机器上的应用情况都是一致的,即不可能存在集群中的部分机器应用了该事务,而另外一部分没有应用的情况</li>\n<li>可靠性:一旦服务端成功应用了一个事务,并完成对客户端的响应,那么该事务所引起的服务端状态变更将会被一直保留下去</li>\n<li>实时性:说到实时性,大家可能想到的是一旦一个事务被成功应用,那么客户端就能立即从服务端读取到最新的数据,但是需要注意的是,zookeeper仅仅保证在一定时间段内,客户端一定能够从服务端上读取到最新的数据状态,具体的原因我会在后续说明</li>\n</ul>\n<h3 id="zookeeper%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%9B%AE%E6%A0%87">zookeeper的设计目标<a class="anchor" href="#zookeeper%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%9B%AE%E6%A0%87">§</a></h3>\n<p>zookeeper致力于提供一个高性能,高可用,且具有严格的顺序访问控制能力(主要是写操作的顺序性)的分布式协调服务,高性能zookeeper能够轻松应对那些对系统吞吐量有明显要求的大型分布式系统,高可用使的单点问题得到很好的解决,而严格的写操作可以使的客户端能够基于zookeeper实现一些复杂的同步.</p>\n<ul>\n<li><strong>简单的数据模型</strong>:zookeeper通过一个共享的树形结构来进行互相协调,树形结构指的是zookeeper服务器内存中的一个数据模型,被一系列称为znode的数据节点组成,zookeeper将全量数据存储在内存中,以此来实现提高性能</li>\n<li><strong>可以构成集群</strong>:一个zookeeper集群通常由一组机器组成,一般3-5台机器就可以组成一台可用的zookeeper集群了,组成zookeeper集群中的每台机器都会在内存中维护当前的服务器状态,并且每台机器之间都互相保持着通信,只要集群中过半机器存活,那个整个集群就能够正常对外提供服务</li>\n<li><strong>顺序访问</strong>:对于来自客户端的每个更新请求,zookeeper都会分配一个全局唯一的递增编号zxid,这个编号反映了每个事务操作的先后顺序</li>\n<li><strong>高性能</strong>:由于zookeeper将全量数据存储在内存中,并直接服务于客户端的所有非事务请求,因此非常适合于以读操作为主的应用场景</li>\n</ul>\n<h2 id="zookeeper%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5">zookeeper的基本概念<a class="anchor" href="#zookeeper%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5">§</a></h2>\n<h3 id="%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B">数据模型<a class="anchor" href="#%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B">§</a></h3>\n<ul>\n<li>zookeeper使用了其特有的&quot;数据节点&quot;概念,称之为znode.znode是zookeeper中的数据的最小单元,每个znode上面都可以保存数据,同时还可以挂载子节点,他有点像目录结构/a/b ,称为树\n<img src="../assets/zookeeper/zk%20node.jpg" alt="Untitled1.png">\n上图显示了zookeeper的数据节点,每一个圆圈都代表一个数据节点,每一个数据节点都被称为一个ZNode,所有的的znode都按照层次化结构进行组织,形成一棵树,每个znode都是通过/来进行分割,开发人员可以向这个节点写入数据,也可以在节点下面创建子节点</li>\n</ul>\n<h3 id="%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B">节点类型<a class="anchor" href="#%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B">§</a></h3>\n<ul>\n<li>在zookeeper中,每个数据节点都是有生命周期的,其生命周期的长短取决于数据节点的节点类型,在zookeeper中,节点类型可以分为持久节点(persistent),临时节点(ephemeral)和顺序节点(sequential),顺序节点有分为持久顺序节点和临时顺序节点</li>\n<li>持久节点 ,最常用的一些节点,意思是该节点被创建后就会一直存在入服务器上,除非有删除操作来自主动清除这个节点</li>\n<li>持久顺序节点,他与持久节点基本是一致的,额外的表现在顺序上,zookeeper中,每个父节点都会为他的第一个子节点维护一份顺序,用来记录每个字节点的创建时间,基于这个特性,在创建子节点的时候可以设置这个标记,如果设置为持久顺序节点,zookeeper就会自动给该节点名加上一个数字后缀,作为一个性的,完整的节点名</li>\n<li>临时节点,和持久节点不同,临时节点的生命周期和客户端的会话绑定在一起,当客户端会话关闭的时候,这个节点就会被清理掉</li>\n<li>临时有序节点,同时具有临时节点和有序节点的特性</li>\n</ul>\n<h3 id="%E9%9B%86%E7%BE%A4%E8%A7%92%E8%89%B2">集群角色<a class="anchor" href="#%E9%9B%86%E7%BE%A4%E8%A7%92%E8%89%B2">§</a></h3>\n<ul>\n<li>在分布式系统中,集群中的机器一般都会有自己的角色,最传统的是主从架构,在这种模式下我们把能够处理所有写操作的机器称为Master机器,把所有通过异步复制方式获取最新数据，井提供读服务的机器称为 Slave机器。</li>\n<li>而在ZooKeeper中，这些概念被颠驳了。它没有沿用传统的Master/Slave概念，而是引入了Leader,Follower和Observer三种角色。ZooKeeper集群中的所有机器通过一个Leader选举过程来选定一台被称为&quot;Leader&quot;的机器，Leader服务器为客户端提供读和写服务, 除Leader外，其他机器包括Follower和Observer。Follower和Observer都能够提供读服务 ，唯一的区别在干，Observer机器不参与Leader选举过程，也不参与写操作的“过半写成功”策略，因此Observer可以在不影响写性能的情况下提升集群的读性能</li>\n</ul>\n<h2 id="%E4%BC%9A%E8%AF%9D">会话<a class="anchor" href="#%E4%BC%9A%E8%AF%9D">§</a></h2>\n<ul>\n<li>session 是指客户端会话,客户端连接是指客户端和服务器之间的一个tcp长连接,客户端启动的时候,将会与zookeeper服务端建立一个tcp连接,从第一次建立连接开始,会话就开始了,通过这个连接,客户端\n能够通过心跳检测与服务端保持正常的会话,也可以向服务端发送请求,接受响应,也可以接受服务端的watcher通知</li>\n</ul>\n<h2 id="watcher">watcher<a class="anchor" href="#watcher">§</a></h2>\n<ul>\n<li>这是zookeeper中的最重要的概念之一,zookeeper允许用户在指定节点注册一些watcher,并且在一些特定事件触发的时候,zookeeper服务端会将事件通知到注册watcher的客户端,该机制是zookeeper实现分布式协调服务的重要特性</li>\n</ul>\n<h2 id="zxid">zxid<a class="anchor" href="#zxid">§</a></h2>\n<ul>\n<li>也就是事务id， 为了保证事务的顺序一致性，zookeeper 采用了递增的事 务 id 号（zxid）来标识事务。所有的提议（proposal）都 在被提出的时候加上了 zxid</li>\n<li>一个ZNode的创建或者更新都会产生一个新的Zxid值，所以在节点 信息中保存了3个Zxid事务id值，分别是：             1.  cZxid：ZNode节点创建时的事务id（Transaction id）\n2. mZxid：ZNode节点修改时的事务id，与子节点无关\n3. pZxid：ZNode节点的子节点的最后一次创建或者修改的时间，与 孙子节点无关。</li>\n</ul>\n<h2 id="%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9zookeeper">为什么选择zookeeper<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9zookeeper">§</a></h2>\n<ul>\n<li>我们都知道,随着分布式架构的出现,越来越多的分布式应用会面临这数据一致性问题.但是,很遗憾的是,在解决分布式数据的一致性上,除了zookeeper之外(etcd除外),目前还没有一个应用在性能,易用性上能够达到工业应用的要求</li>\n</ul>\n<h2 id="zookeeper-%E7%9A%84zab%E5%8D%8F%E8%AE%AE">zookeeper 的zab协议<a class="anchor" href="#zookeeper-%E7%9A%84zab%E5%8D%8F%E8%AE%AE">§</a></h2>\n<h3 id="zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E6%A0%B8%E5%BF%83">zab协议的核心<a class="anchor" href="#zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E6%A0%B8%E5%BF%83">§</a></h3>\n<ul>\n<li>zookeeper使用ZAB(zookeeper atomic broadcast,zookeeper原子广播协议)来作为其数据一致性的核心算法</li>\n<li>大家都知道,zookeeper集群中的机器有三种,leader,follower,observer,zookeeper使用一个单一的主进程来接受并处理客户端的所有事务请求,并采用zab的原子广播协议,将服务器的状态变更已事务proposal(提案)的提案广播分发给集群中所有的follower服务器.之后leader服务器需要等待所有的follower服务器的反馈,一旦超过半数的follower服务器进行了正确的反馈后,那么leader服务器就会向所有的follower服务器分发commit消息,要求其将前一个提案进行提交,这就是zab协议的核心,定义了能改变zookeeper服务器数据状态的事务请求的处理方式</li>\n</ul>\n<h3 id="zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%85%B7%E4%BD%93%E5%86%85%E5%AE%B9">zab协议的具体内容<a class="anchor" href="#zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%85%B7%E4%BD%93%E5%86%85%E5%AE%B9">§</a></h3>\n<p>zab协议其实包含两种模式,分别是崩溃恢复和消息广播模式</p>\n<ul>\n<li>崩溃恢复:当zookeeper服务器启动时,或者当zookeeper leader服务器网路中断,崩溃退出与重启等异常情况,或者集群中已经不存在过半的机器与该leader服务器保持正常通信时,zab协议就会进入崩溃恢复模式选举出新的leader,产生了新的leader以后当集群已经有过半的机器与leader完成了状态同步,zab就会退出崩溃恢复模式,进入消息广播模式.(如果有新的zookeeper服务器加入)</li>\n<li>消息广播:zookeeper只允许一个唯一的leader服务器进行事务请求的处理(非查询),leader服务器在接受到客户端的事务请求后,会生成对应的事务提案并发起一轮广播协议,(follower服务器收到请求)</li>\n<li>保证已经在leader服务器上提交的事务最终被所有的服务器提交,丢弃那些只在leader服务器上被提出的事务</li>\n</ul>\n<h2 id="zookeeper%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8">zookeeper的安装与使用<a class="anchor" href="#zookeeper%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8">§</a></h2>\n<p>tickTime=2000\n该参数用于配置leader服务器等待follower服务器启动,并与leader完成数据同步的时间,follower服务器会在启动的时候与leader服务器建立连接并完成数据的同步,从而确定自己对外提供服务的起始状态.leader服务器允许follower服务器在initlimit完成该任务\ninitLimit=10\n该参数用于配置leader服务器和follower服务器之间进行心跳检测的最大延时时间,在zookeeper集群允许过程中,leader服务器会与所有的follower进行心跳检测来确定该服务器是否存活已经同步数据,如果leader服务器在synclimit时间内无法获得follower的心跳响应,那么leader服务器就会认为该follower已经脱离了同步,就会从服务中剔除\nsyncLimit=5</p>\n<p>dataDir=/data/zookeeper/zk1/zk1/data/\ndataLogDir\n可以不配置,默认值是dataDir,默认情况下,zookeeper会将事务日志文件和快照数据存储在同一个目录下,生产中使用时,要将两者进行区分开,事务日志对于磁盘的性能要求非常高,为了保证数据的一致性,zookeeper在返回客户端事务请求响应之前,必须将本次请求对应的事务日志写入到磁盘中.因此,事务日志的写入性能直接决定了zookeeper在处理事务请求时的吞吐,针对同一块磁盘的并发读写操作,比如说快照数据存储操作,如果都放在同一块目录,会极大影响事务日志的写性能,因此在生产使用过程中,要将dataDir和dataLogDir进行区分,最好单独给分配一个磁盘,以提高zookeeper的整体性能\nthe port at which the clients will connect\nclientPort=2181\n该参数用来配置组成zookeeper集群的机器列表,id为server id ,与每台服务器的myid文件中的数字相对应,同时会配置两个端口,第一个端口是leader与follower进行通信与数据同步时所使用的端口,第二个端口是专门用于leader选举过程中的投票通信\nserver.1=172.19.17.5:2888:2889\nserver.2=172.19.17.5:3888:3889\nserver.3=172.19.17.5:4888:4889### 分布式锁</p>\n<ul>\n<li>命名服务就是指通过指定的名字来获取资源或者服务的地址,具体就是创建一个指定名称的节点,节点的数据就是实际的资源地址,我们使用的dubbo官方推荐就是使用zookeeper来做注册中心</li>\n</ul>\n<h3 id="%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1">命名服务<a class="anchor" href="#%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1">§</a></h3>\n<ul>\n<li>发布/订阅 ,即所谓的配置中心,发布者将数据存放到zookeeper的znode节点上面,订阅者通过对节点添加watcher就会收到最新的数据,已实现数据的集中管理和动态获取,具体案例-百度的disconf</li>\n</ul>\n<h3 id="%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85">发布/订阅<a class="anchor" href="#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85">§</a></h3>\n<h3 id="zookeeper-%E5%9C%A8%E5%AE%9E%E9%99%85%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8">zookeeper 在实际中的使用<a class="anchor" href="#zookeeper-%E5%9C%A8%E5%AE%9E%E9%99%85%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8">§</a></h3>\n<h3 id="%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85-1">发布/订阅<a class="anchor" href="#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85-1">§</a></h3>\n<ul>\n<li>发布/订阅 ,即所谓的配置中心,发布者将数据存放到zookeeper的znode节点上面,订阅者通过对节点添加watcher就会收到最新的数据,已实现数据的集中管理和动态获取,具体案例-百度的disconf</li>\n</ul>\n<h3 id="%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1-1">命名服务<a class="anchor" href="#%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1-1">§</a></h3>\n<ul>\n<li>命名服务就是指通过指定的名字来获取资源或者服务的地址,具体就是创建一个指定名称的节点,节点的数据就是实际的资源地址,我们使用的dubbo官方推荐就是使用zookeeper来做注册中心</li>\n</ul>\n<h3 id="%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81">分布式锁<a class="anchor" href="#%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81">§</a></h3>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "zookeeper \u5165\u95E8"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="zookeeper%E6%98%AF%E4%BB%80%E4%B9%88">zookeeper是什么?<a class="anchor" href="#zookeeper%E6%98%AF%E4%BB%80%E4%B9%88">§</a></h2>\n<p>官网的介绍:zookeeper是一个开放源代码的分布式协调服务,由雅虎创建.是google chubby的开源实现,她是一个典型的分布式数据一致性的解决方案,分布式系统可以基于它来实现诸如数据发布/订阅,负载均衡,命名服务,集群管理,master选举,分布式锁等功能,他可以保证分布式的数据一致性特性.</p>\n<ul>\n<li>顺序一致性:从同一个客户端发起的事务请求,最终会严格按照其发起的顺序被应用到zookeeper中去</li>\n<li>原子性:所有事务的处理结果在整个集群中的所有的机器上的应用情况都是一致的,即不可能存在集群中的部分机器应用了该事务,而另外一部分没有应用的情况</li>\n<li>可靠性:一旦服务端成功应用了一个事务,并完成对客户端的响应,那么该事务所引起的服务端状态变更将会被一直保留下去</li>\n<li>实时性:说到实时性,大家可能想到的是一旦一个事务被成功应用,那么客户端就能立即从服务端读取到最新的数据,但是需要注意的是,zookeeper仅仅保证在一定时间段内,客户端一定能够从服务端上读取到最新的数据状态,具体的原因我会在后续说明</li>\n</ul>\n<h3 id="zookeeper%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%9B%AE%E6%A0%87">zookeeper的设计目标<a class="anchor" href="#zookeeper%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%9B%AE%E6%A0%87">§</a></h3>\n<p>zookeeper致力于提供一个高性能,高可用,且具有严格的顺序访问控制能力(主要是写操作的顺序性)的分布式协调服务,高性能zookeeper能够轻松应对那些对系统吞吐量有明显要求的大型分布式系统,高可用使的单点问题得到很好的解决,而严格的写操作可以使的客户端能够基于zookeeper实现一些复杂的同步.</p>\n<ul>\n<li><strong>简单的数据模型</strong>:zookeeper通过一个共享的树形结构来进行互相协调,树形结构指的是zookeeper服务器内存中的一个数据模型,被一系列称为znode的数据节点组成,zookeeper将全量数据存储在内存中,以此来实现提高性能</li>\n<li><strong>可以构成集群</strong>:一个zookeeper集群通常由一组机器组成,一般3-5台机器就可以组成一台可用的zookeeper集群了,组成zookeeper集群中的每台机器都会在内存中维护当前的服务器状态,并且每台机器之间都互相保持着通信,只要集群中过半机器存活,那个整个集群就能够正常对外提供服务</li>\n<li><strong>顺序访问</strong>:对于来自客户端的每个更新请求,zookeeper都会分配一个全局唯一的递增编号zxid,这个编号反映了每个事务操作的先后顺序</li>\n<li><strong>高性能</strong>:由于zookeeper将全量数据存储在内存中,并直接服务于客户端的所有非事务请求,因此非常适合于以读操作为主的应用场景</li>\n</ul>\n<h2 id="zookeeper%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5">zookeeper的基本概念<a class="anchor" href="#zookeeper%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5">§</a></h2>\n<h3 id="%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B">数据模型<a class="anchor" href="#%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B">§</a></h3>\n<ul>\n<li>zookeeper使用了其特有的&quot;数据节点&quot;概念,称之为znode.znode是zookeeper中的数据的最小单元,每个znode上面都可以保存数据,同时还可以挂载子节点,他有点像目录结构/a/b ,称为树\n<img src="../assets/zookeeper/zk%20node.jpg" alt="Untitled1.png">\n上图显示了zookeeper的数据节点,每一个圆圈都代表一个数据节点,每一个数据节点都被称为一个ZNode,所有的的znode都按照层次化结构进行组织,形成一棵树,每个znode都是通过/来进行分割,开发人员可以向这个节点写入数据,也可以在节点下面创建子节点</li>\n</ul>\n<h3 id="%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B">节点类型<a class="anchor" href="#%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B">§</a></h3>\n<ul>\n<li>在zookeeper中,每个数据节点都是有生命周期的,其生命周期的长短取决于数据节点的节点类型,在zookeeper中,节点类型可以分为持久节点(persistent),临时节点(ephemeral)和顺序节点(sequential),顺序节点有分为持久顺序节点和临时顺序节点</li>\n<li>持久节点 ,最常用的一些节点,意思是该节点被创建后就会一直存在入服务器上,除非有删除操作来自主动清除这个节点</li>\n<li>持久顺序节点,他与持久节点基本是一致的,额外的表现在顺序上,zookeeper中,每个父节点都会为他的第一个子节点维护一份顺序,用来记录每个字节点的创建时间,基于这个特性,在创建子节点的时候可以设置这个标记,如果设置为持久顺序节点,zookeeper就会自动给该节点名加上一个数字后缀,作为一个性的,完整的节点名</li>\n<li>临时节点,和持久节点不同,临时节点的生命周期和客户端的会话绑定在一起,当客户端会话关闭的时候,这个节点就会被清理掉</li>\n<li>临时有序节点,同时具有临时节点和有序节点的特性</li>\n</ul>\n<h3 id="%E9%9B%86%E7%BE%A4%E8%A7%92%E8%89%B2">集群角色<a class="anchor" href="#%E9%9B%86%E7%BE%A4%E8%A7%92%E8%89%B2">§</a></h3>\n<ul>\n<li>在分布式系统中,集群中的机器一般都会有自己的角色,最传统的是主从架构,在这种模式下我们把能够处理所有写操作的机器称为Master机器,把所有通过异步复制方式获取最新数据，井提供读服务的机器称为 Slave机器。</li>\n<li>而在ZooKeeper中，这些概念被颠驳了。它没有沿用传统的Master/Slave概念，而是引入了Leader,Follower和Observer三种角色。ZooKeeper集群中的所有机器通过一个Leader选举过程来选定一台被称为&quot;Leader&quot;的机器，Leader服务器为客户端提供读和写服务, 除Leader外，其他机器包括Follower和Observer。Follower和Observer都能够提供读服务 ，唯一的区别在干，Observer机器不参与Leader选举过程，也不参与写操作的“过半写成功”策略，因此Observer可以在不影响写性能的情况下提升集群的读性能</li>\n</ul>\n<h2 id="%E4%BC%9A%E8%AF%9D">会话<a class="anchor" href="#%E4%BC%9A%E8%AF%9D">§</a></h2>\n<ul>\n<li>session 是指客户端会话,客户端连接是指客户端和服务器之间的一个tcp长连接,客户端启动的时候,将会与zookeeper服务端建立一个tcp连接,从第一次建立连接开始,会话就开始了,通过这个连接,客户端\n能够通过心跳检测与服务端保持正常的会话,也可以向服务端发送请求,接受响应,也可以接受服务端的watcher通知</li>\n</ul>\n<h2 id="watcher">watcher<a class="anchor" href="#watcher">§</a></h2>\n<ul>\n<li>这是zookeeper中的最重要的概念之一,zookeeper允许用户在指定节点注册一些watcher,并且在一些特定事件触发的时候,zookeeper服务端会将事件通知到注册watcher的客户端,该机制是zookeeper实现分布式协调服务的重要特性</li>\n</ul>\n<h2 id="zxid">zxid<a class="anchor" href="#zxid">§</a></h2>\n<ul>\n<li>也就是事务id， 为了保证事务的顺序一致性，zookeeper 采用了递增的事 务 id 号（zxid）来标识事务。所有的提议（proposal）都 在被提出的时候加上了 zxid</li>\n<li>一个ZNode的创建或者更新都会产生一个新的Zxid值，所以在节点 信息中保存了3个Zxid事务id值，分别是：             1.  cZxid：ZNode节点创建时的事务id（Transaction id）\n2. mZxid：ZNode节点修改时的事务id，与子节点无关\n3. pZxid：ZNode节点的子节点的最后一次创建或者修改的时间，与 孙子节点无关。</li>\n</ul>\n<h2 id="%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9zookeeper">为什么选择zookeeper<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9zookeeper">§</a></h2>\n<ul>\n<li>我们都知道,随着分布式架构的出现,越来越多的分布式应用会面临这数据一致性问题.但是,很遗憾的是,在解决分布式数据的一致性上,除了zookeeper之外(etcd除外),目前还没有一个应用在性能,易用性上能够达到工业应用的要求</li>\n</ul>\n<h2 id="zookeeper-%E7%9A%84zab%E5%8D%8F%E8%AE%AE">zookeeper 的zab协议<a class="anchor" href="#zookeeper-%E7%9A%84zab%E5%8D%8F%E8%AE%AE">§</a></h2>\n<h3 id="zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E6%A0%B8%E5%BF%83">zab协议的核心<a class="anchor" href="#zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E6%A0%B8%E5%BF%83">§</a></h3>\n<ul>\n<li>zookeeper使用ZAB(zookeeper atomic broadcast,zookeeper原子广播协议)来作为其数据一致性的核心算法</li>\n<li>大家都知道,zookeeper集群中的机器有三种,leader,follower,observer,zookeeper使用一个单一的主进程来接受并处理客户端的所有事务请求,并采用zab的原子广播协议,将服务器的状态变更已事务proposal(提案)的提案广播分发给集群中所有的follower服务器.之后leader服务器需要等待所有的follower服务器的反馈,一旦超过半数的follower服务器进行了正确的反馈后,那么leader服务器就会向所有的follower服务器分发commit消息,要求其将前一个提案进行提交,这就是zab协议的核心,定义了能改变zookeeper服务器数据状态的事务请求的处理方式</li>\n</ul>\n<h3 id="zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%85%B7%E4%BD%93%E5%86%85%E5%AE%B9">zab协议的具体内容<a class="anchor" href="#zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%85%B7%E4%BD%93%E5%86%85%E5%AE%B9">§</a></h3>\n<p>zab协议其实包含两种模式,分别是崩溃恢复和消息广播模式</p>\n<ul>\n<li>崩溃恢复:当zookeeper服务器启动时,或者当zookeeper leader服务器网路中断,崩溃退出与重启等异常情况,或者集群中已经不存在过半的机器与该leader服务器保持正常通信时,zab协议就会进入崩溃恢复模式选举出新的leader,产生了新的leader以后当集群已经有过半的机器与leader完成了状态同步,zab就会退出崩溃恢复模式,进入消息广播模式.(如果有新的zookeeper服务器加入)</li>\n<li>消息广播:zookeeper只允许一个唯一的leader服务器进行事务请求的处理(非查询),leader服务器在接受到客户端的事务请求后,会生成对应的事务提案并发起一轮广播协议,(follower服务器收到请求)</li>\n<li>保证已经在leader服务器上提交的事务最终被所有的服务器提交,丢弃那些只在leader服务器上被提出的事务</li>\n</ul>\n<h2 id="zookeeper%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8">zookeeper的安装与使用<a class="anchor" href="#zookeeper%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8">§</a></h2>\n<p>tickTime=2000\n该参数用于配置leader服务器等待follower服务器启动,并与leader完成数据同步的时间,follower服务器会在启动的时候与leader服务器建立连接并完成数据的同步,从而确定自己对外提供服务的起始状态.leader服务器允许follower服务器在initlimit完成该任务\ninitLimit=10\n该参数用于配置leader服务器和follower服务器之间进行心跳检测的最大延时时间,在zookeeper集群允许过程中,leader服务器会与所有的follower进行心跳检测来确定该服务器是否存活已经同步数据,如果leader服务器在synclimit时间内无法获得follower的心跳响应,那么leader服务器就会认为该follower已经脱离了同步,就会从服务中剔除\nsyncLimit=5</p>\n<p>dataDir=/data/zookeeper/zk1/zk1/data/\ndataLogDir\n可以不配置,默认值是dataDir,默认情况下,zookeeper会将事务日志文件和快照数据存储在同一个目录下,生产中使用时,要将两者进行区分开,事务日志对于磁盘的性能要求非常高,为了保证数据的一致性,zookeeper在返回客户端事务请求响应之前,必须将本次请求对应的事务日志写入到磁盘中.因此,事务日志的写入性能直接决定了zookeeper在处理事务请求时的吞吐,针对同一块磁盘的并发读写操作,比如说快照数据存储操作,如果都放在同一块目录,会极大影响事务日志的写性能,因此在生产使用过程中,要将dataDir和dataLogDir进行区分,最好单独给分配一个磁盘,以提高zookeeper的整体性能\nthe port at which the clients will connect\nclientPort=2181\n该参数用来配置组成zookeeper集群的机器列表,id为server id ,与每台服务器的myid文件中的数字相对应,同时会配置两个端口,第一个端口是leader与follower进行通信与数据同步时所使用的端口,第二个端口是专门用于leader选举过程中的投票通信\nserver.1=172.19.17.5:2888:2889\nserver.2=172.19.17.5:3888:3889\nserver.3=172.19.17.5:4888:4889### 分布式锁</p>\n<ul>\n<li>命名服务就是指通过指定的名字来获取资源或者服务的地址,具体就是创建一个指定名称的节点,节点的数据就是实际的资源地址,我们使用的dubbo官方推荐就是使用zookeeper来做注册中心</li>\n</ul>\n<h3 id="%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1">命名服务<a class="anchor" href="#%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1">§</a></h3>\n<ul>\n<li>发布/订阅 ,即所谓的配置中心,发布者将数据存放到zookeeper的znode节点上面,订阅者通过对节点添加watcher就会收到最新的数据,已实现数据的集中管理和动态获取,具体案例-百度的disconf</li>\n</ul>\n<h3 id="%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85">发布/订阅<a class="anchor" href="#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85">§</a></h3>\n<h3 id="zookeeper-%E5%9C%A8%E5%AE%9E%E9%99%85%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8">zookeeper 在实际中的使用<a class="anchor" href="#zookeeper-%E5%9C%A8%E5%AE%9E%E9%99%85%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8">§</a></h3>\n<h3 id="%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85-1">发布/订阅<a class="anchor" href="#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85-1">§</a></h3>\n<ul>\n<li>发布/订阅 ,即所谓的配置中心,发布者将数据存放到zookeeper的znode节点上面,订阅者通过对节点添加watcher就会收到最新的数据,已实现数据的集中管理和动态获取,具体案例-百度的disconf</li>\n</ul>\n<h3 id="%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1-1">命名服务<a class="anchor" href="#%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1-1">§</a></h3>\n<ul>\n<li>命名服务就是指通过指定的名字来获取资源或者服务的地址,具体就是创建一个指定名称的节点,节点的数据就是实际的资源地址,我们使用的dubbo官方推荐就是使用zookeeper来做注册中心</li>\n</ul>\n<h3 id="%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81">分布式锁<a class="anchor" href="#%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81">§</a></h3>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#zookeeper%E6%98%AF%E4%BB%80%E4%B9%88">zookeeper是什么?</a><ol><li><a href="#zookeeper%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%9B%AE%E6%A0%87">zookeeper的设计目标</a></li></ol></li><li><a href="#zookeeper%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5">zookeeper的基本概念</a><ol><li><a href="#%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B">数据模型</a></li><li><a href="#%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8B">节点类型</a></li><li><a href="#%E9%9B%86%E7%BE%A4%E8%A7%92%E8%89%B2">集群角色</a></li></ol></li><li><a href="#%E4%BC%9A%E8%AF%9D">会话</a></li><li><a href="#watcher">watcher</a></li><li><a href="#zxid">zxid</a></li><li><a href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9zookeeper">为什么选择zookeeper</a></li><li><a href="#zookeeper-%E7%9A%84zab%E5%8D%8F%E8%AE%AE">zookeeper 的zab协议</a><ol><li><a href="#zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E6%A0%B8%E5%BF%83">zab协议的核心</a></li><li><a href="#zab%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%85%B7%E4%BD%93%E5%86%85%E5%AE%B9">zab协议的具体内容</a></li></ol></li><li><a href="#zookeeper%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8">zookeeper的安装与使用</a><ol><li><a href="#%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1">命名服务</a></li><li><a href="#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85">发布/订阅</a></li><li><a href="#zookeeper-%E5%9C%A8%E5%AE%9E%E9%99%85%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8">zookeeper 在实际中的使用</a></li><li><a href="#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85-1">发布/订阅</a></li><li><a href="#%E5%91%BD%E5%90%8D%E6%9C%8D%E5%8A%A1-1">命名服务</a></li><li><a href="#%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81">分布式锁</a></li></ol></li></ol></nav>'
        } }),
    'author': "zhangwengang",
    'contributors': [
        "zhangwengang"
    ],
    'date': "2020-07-05T00:00:00.000Z",
    'updated': null,
    'excerpt': "zookeeper是什么? 官网的介绍:zookeeper是一个开放源代码的分布式协调服务,由雅虎创建.是google chubby的开源实现,她是一个典型的分布式数据一致性的解决方案,分布式系统可以基于它来实现诸如数据发布/订阅,负载均衡,命名服务,...",
    'cover': "../assets/zookeeper/zk%20node.jpg",
    'categories': [
        "编程世界"
    ],
    'tags': [
        "zookeeper",
        "zab"
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
