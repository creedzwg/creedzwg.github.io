import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/https.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/https.html",
    'title': "一次https请求的流程",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>一次https请求的流程</h1>\n<h2 id="%E7%9B%B8%E5%85%B3%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A">相关名词解释<a class="anchor" href="#%E7%9B%B8%E5%85%B3%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A">§</a></h2>\n<h3 id="https">https<a class="anchor" href="#https">§</a></h3>\n<ul>\n<li>首先说一下https,https全文名称(hyper text transfer  protocol over SecureSocket layer) ,字面意思是在ssl基础上的\nhttp协议,在传统http的基础上,通过加密传输,身份认证(ssl)保证了传输过程的安全性,https相比如http不同的地方在于默认端口号的\n差别(http:80,https:443)及多了一个加密/身份验证层(ssl,在http和tcp之间)</li>\n<li>http协议和安全协议都位于tcp/ip协议族的应用层,具体来说,安全协议运行在http协议之下,tcp协议之上,安全协议向运行http的\n进程提供一个类似tcp的套接字,供其注入报文,然后安全协议将其加密后注入到运输层socket,反正,将运输层socket返回的报文解密\n解密后交给对应的进程,严格地讲，准确来说,HTTPS并不是一个单独的协议，而是对工作在一加密连接（TLS或SSL）上的常规HTTP协议的称呼</li>\n</ul>\n<h3 id="%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86">对称加密和非对称加密<a class="anchor" href="#%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86">§</a></h3>\n<ul>\n<li>\n<p>对称加密: 在对称加密算法中,加密和解密使用的秘钥是相同的,常见的是aes,des,加密和解密方同时持有一份秘钥</p>\n</li>\n<li>\n<p>非对称加密: 在非对称加密算法中,加密使用的秘钥和解密使用的秘钥不是同一个,一个是可以被泄漏的公钥,另外一个是只有自己才会知道的秘钥,\n公钥加密的信息,只有私钥才能解开,私钥加密的信息,只有公钥才能解开.这种算法比较复杂,且性能较低,所以交互的场景经常使用对称加密</p>\n</li>\n</ul>\n<h3 id="%E8%AF%81%E4%B9%A6">证书<a class="anchor" href="#%E8%AF%81%E4%B9%A6">§</a></h3>\n<ul>\n<li>由权威部门颁发的公钥秘钥对称为证书</li>\n<li>证书的组成有 <strong>公钥</strong> ,所有者,发布机构,有效期</li>\n<li>生成方式: 生成证书需要发起一个证书请求,然后将这个请求发给一个权威机构去认证,这个权威机构我们就称为 <strong>CA</strong>,CA用自己的私钥给网站的证书的hash值签名，就相当于给网站背书，形成了网站的证书\n然后客户端会用ca的公钥(大ca的公钥浏览器都会有,firefox自己维护,chrome自己从操作系统拿)对网站的证书进行校验,如果ca的公钥能够去解密这个网站证书的签名,那么就说明这个网站的公钥没啥问题</li>\n</ul>\n<h2 id="%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B">请求的过程<a class="anchor" href="#%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B">§</a></h2>\n<h3 id="https%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F">https的工作模式<a class="anchor" href="#https%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F">§</a></h3>\n<blockquote>\n<p>由于对称加密和非对称加密的特点,公钥私钥主要用于传输对称加密的秘钥,而真正的双方大数据量的通信都是通过对称加密进行的,这就是https的总体思路</p>\n</blockquote>\n<h4 id="https-%E6%B5%81%E7%A8%8B">https 流程<a class="anchor" href="#https-%E6%B5%81%E7%A8%8B">§</a></h4>\n<h5 id="dns%E8%A7%A3%E6%9E%90%E6%88%90ip%E5%9C%B0%E5%9D%80">dns解析成ip地址<a class="anchor" href="#dns%E8%A7%A3%E6%9E%90%E6%88%90ip%E5%9C%B0%E5%9D%80">§</a></h5>\n<h5 id="tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B">tcp 三次握手<a class="anchor" href="#tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B">§</a></h5>\n<blockquote>\n<p>https的tls 是在可靠的tcp协议上构建安全的传输通道,其本身是不提供可靠性保障的,还是需要下层的传输层,在通信双方建立可靠地tcp连接之后,需要tls握手\n来交换对称加密的传输秘钥</p>\n</blockquote>\n<ol>\n<li>client 发送syn,状态由close变成SEND,</li>\n<li>server 收到syn,发送syn和syn的ack,变成SYN_RECV</li>\n<li>client 收到 后,发送ack,进入establishd状态</li>\n<li>服务端收到后,进入establishd状态,当然服务端这个时候不一定能收到这个ack,但是由于建立连接之后,客户端就会向服务端发送数据,所以当服务端接收到\n之后,自然就会进入establishd状态</li>\n</ol>\n<h5 id="tls-%E6%8F%A1%E6%89%8B">tls 握手<a class="anchor" href="#tls-%E6%8F%A1%E6%89%8B">§</a></h5>\n<ol>\n<li>tcp握手成功之后,客户端会发送Client Hello消息到服务器,以明文传输TLS版本信息,加密套件候选列表,加密算法候选列表等信息.另外,\n还会有一个随机数,在协商对称秘钥的时候使用</li>\n<li>然后网站会返回server Hello,告诉客户端,服务器选择的协议版本,加密套件,加密算法等,同时也返回一个随机数,用于后续的秘钥协商</li>\n<li>然后网站会返回一个服务端的证书,说 Server hello done ,我这里就这些了</li>\n<li>作为客户端肯定不会相信这个证书,于是客户端从自己信任的ca仓库中,拿ca的证书里面的公钥去解密外卖网站的证书.如果能够成功,则说明这个网站是可信的</li>\n<li>证书验证完毕以后之后,觉得这个网站可信,于是客户端计算产生随机数字 pre-master,发送client key exchange ,用证书中的公钥加密,再发给服务器,服务器可以\n通过私钥解密出来,到目前为止,无论是客户端还是服务端,都有了三个随机数,自己的,对端的,以及刚生成的Pre-Master随机数.通过这三个随机数,可以在客户端和服务端\n之间产生相同的对称秘钥</li>\n<li>此时客户端发送ChangeCipherSpec，指示server从现在开始发送的消息都是加密过的,咱们以后都采用协商的通信密钥和加密算法 进行加密通信了\n然后发送一个Encrypted Handshake Message将已经商定好的参数等采用协商密钥进行加密，发送给服务器用于数据与握手验证</li>\n<li>同样，服务器也可以发送 Change Cipher Spec，说：“没问题，咱们以后都采用协商的通信密钥和加密算法进行加密通信了”，并且也发送 Encrypted Handshake Message 的消息试试。\n当双方握手结束 之后，就可以通过对称密钥进行加密传输了\n<img src="../assets/https/2020-12-07_17-29-52.png" alt="tls握手流程图"></li>\n</ol>\n<h5 id="%E6%8F%A1%E6%89%8B%E5%AE%8C%E6%AF%95%E5%8F%8C%E6%96%B9%E5%BC%80%E5%A7%8B%E6%AD%A3%E5%B8%B8%E9%80%9A%E4%BF%A1">握手完毕,双方开始正常通信<a class="anchor" href="#%E6%8F%A1%E6%89%8B%E5%AE%8C%E6%AF%95%E5%8F%8C%E6%96%B9%E5%BC%80%E5%A7%8B%E6%AD%A3%E5%B8%B8%E9%80%9A%E4%BF%A1">§</a></h5>\n<blockquote>\n<p>传输层-&gt;网络层-&gt;链路层</p>\n</blockquote>\n<h5 id="%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5tcp4%E6%AC%A1%E6%8C%A5%E6%89%8B">断开连接,tcp4次挥手<a class="anchor" href="#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5tcp4%E6%AC%A1%E6%8C%A5%E6%89%8B">§</a></h5>\n<blockquote>\n<p>当数据传输完毕之后,会进行连接的断开,链接的断开过程称为tcp的4次挥手</p>\n<ol>\n<li>A: B啊,我不想玩了</li>\n<li>B: 好啊,我知道了</li>\n<li>B: a啊,我也不想忘了,拜拜</li>\n</ol>\n</blockquote>\n<ol start="4">\n<li>\n<p>A: 好的,我知道了,拜拜\n<img src="../assets/https/2020-12-10_10-25-55.png" alt="tcp4次挥手流程图"></p>\n</li>\n<li>\n<p>client 发送FIN,seq=q, 进入FIN_WAIT_1状态</p>\n</li>\n<li>\n<p>server 端回复ACK,ack=q+1,进入close_wait状态</p>\n</li>\n<li>\n<p>client 收到ACK,进入FIN-wait_2状态</p>\n<ul>\n<li>如果这个时候服务端跑路了,那么client永远会停留在这个状态,tcp协议没有对这个状态做处理,但是linux有,可以设置一个超时时间</li>\n</ul>\n</li>\n<li>\n<p>server端发送FIN,ACK通知client,进入LAST_ACK状态</p>\n</li>\n<li>\n<p>client端收到后回复ACK,进入time_wait状态(最多等待2msl,等待之前的包传输完),后变成closed</p>\n</li>\n<li>\n<p>server端收到ack,进入closed状态</p>\n</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4E00\u6B21https\u8BF7\u6C42\u7684\u6D41\u7A0B"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E7%9B%B8%E5%85%B3%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A">相关名词解释<a class="anchor" href="#%E7%9B%B8%E5%85%B3%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A">§</a></h2>\n<h3 id="https">https<a class="anchor" href="#https">§</a></h3>\n<ul>\n<li>首先说一下https,https全文名称(hyper text transfer  protocol over SecureSocket layer) ,字面意思是在ssl基础上的\nhttp协议,在传统http的基础上,通过加密传输,身份认证(ssl)保证了传输过程的安全性,https相比如http不同的地方在于默认端口号的\n差别(http:80,https:443)及多了一个加密/身份验证层(ssl,在http和tcp之间)</li>\n<li>http协议和安全协议都位于tcp/ip协议族的应用层,具体来说,安全协议运行在http协议之下,tcp协议之上,安全协议向运行http的\n进程提供一个类似tcp的套接字,供其注入报文,然后安全协议将其加密后注入到运输层socket,反正,将运输层socket返回的报文解密\n解密后交给对应的进程,严格地讲，准确来说,HTTPS并不是一个单独的协议，而是对工作在一加密连接（TLS或SSL）上的常规HTTP协议的称呼</li>\n</ul>\n<h3 id="%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86">对称加密和非对称加密<a class="anchor" href="#%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86">§</a></h3>\n<ul>\n<li>\n<p>对称加密: 在对称加密算法中,加密和解密使用的秘钥是相同的,常见的是aes,des,加密和解密方同时持有一份秘钥</p>\n</li>\n<li>\n<p>非对称加密: 在非对称加密算法中,加密使用的秘钥和解密使用的秘钥不是同一个,一个是可以被泄漏的公钥,另外一个是只有自己才会知道的秘钥,\n公钥加密的信息,只有私钥才能解开,私钥加密的信息,只有公钥才能解开.这种算法比较复杂,且性能较低,所以交互的场景经常使用对称加密</p>\n</li>\n</ul>\n<h3 id="%E8%AF%81%E4%B9%A6">证书<a class="anchor" href="#%E8%AF%81%E4%B9%A6">§</a></h3>\n<ul>\n<li>由权威部门颁发的公钥秘钥对称为证书</li>\n<li>证书的组成有 <strong>公钥</strong> ,所有者,发布机构,有效期</li>\n<li>生成方式: 生成证书需要发起一个证书请求,然后将这个请求发给一个权威机构去认证,这个权威机构我们就称为 <strong>CA</strong>,CA用自己的私钥给网站的证书的hash值签名，就相当于给网站背书，形成了网站的证书\n然后客户端会用ca的公钥(大ca的公钥浏览器都会有,firefox自己维护,chrome自己从操作系统拿)对网站的证书进行校验,如果ca的公钥能够去解密这个网站证书的签名,那么就说明这个网站的公钥没啥问题</li>\n</ul>\n<h2 id="%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B">请求的过程<a class="anchor" href="#%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B">§</a></h2>\n<h3 id="https%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F">https的工作模式<a class="anchor" href="#https%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F">§</a></h3>\n<blockquote>\n<p>由于对称加密和非对称加密的特点,公钥私钥主要用于传输对称加密的秘钥,而真正的双方大数据量的通信都是通过对称加密进行的,这就是https的总体思路</p>\n</blockquote>\n<h4 id="https-%E6%B5%81%E7%A8%8B">https 流程<a class="anchor" href="#https-%E6%B5%81%E7%A8%8B">§</a></h4>\n<h5 id="dns%E8%A7%A3%E6%9E%90%E6%88%90ip%E5%9C%B0%E5%9D%80">dns解析成ip地址<a class="anchor" href="#dns%E8%A7%A3%E6%9E%90%E6%88%90ip%E5%9C%B0%E5%9D%80">§</a></h5>\n<h5 id="tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B">tcp 三次握手<a class="anchor" href="#tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B">§</a></h5>\n<blockquote>\n<p>https的tls 是在可靠的tcp协议上构建安全的传输通道,其本身是不提供可靠性保障的,还是需要下层的传输层,在通信双方建立可靠地tcp连接之后,需要tls握手\n来交换对称加密的传输秘钥</p>\n</blockquote>\n<ol>\n<li>client 发送syn,状态由close变成SEND,</li>\n<li>server 收到syn,发送syn和syn的ack,变成SYN_RECV</li>\n<li>client 收到 后,发送ack,进入establishd状态</li>\n<li>服务端收到后,进入establishd状态,当然服务端这个时候不一定能收到这个ack,但是由于建立连接之后,客户端就会向服务端发送数据,所以当服务端接收到\n之后,自然就会进入establishd状态</li>\n</ol>\n<h5 id="tls-%E6%8F%A1%E6%89%8B">tls 握手<a class="anchor" href="#tls-%E6%8F%A1%E6%89%8B">§</a></h5>\n<ol>\n<li>tcp握手成功之后,客户端会发送Client Hello消息到服务器,以明文传输TLS版本信息,加密套件候选列表,加密算法候选列表等信息.另外,\n还会有一个随机数,在协商对称秘钥的时候使用</li>\n<li>然后网站会返回server Hello,告诉客户端,服务器选择的协议版本,加密套件,加密算法等,同时也返回一个随机数,用于后续的秘钥协商</li>\n<li>然后网站会返回一个服务端的证书,说 Server hello done ,我这里就这些了</li>\n<li>作为客户端肯定不会相信这个证书,于是客户端从自己信任的ca仓库中,拿ca的证书里面的公钥去解密外卖网站的证书.如果能够成功,则说明这个网站是可信的</li>\n<li>证书验证完毕以后之后,觉得这个网站可信,于是客户端计算产生随机数字 pre-master,发送client key exchange ,用证书中的公钥加密,再发给服务器,服务器可以\n通过私钥解密出来,到目前为止,无论是客户端还是服务端,都有了三个随机数,自己的,对端的,以及刚生成的Pre-Master随机数.通过这三个随机数,可以在客户端和服务端\n之间产生相同的对称秘钥</li>\n<li>此时客户端发送ChangeCipherSpec，指示server从现在开始发送的消息都是加密过的,咱们以后都采用协商的通信密钥和加密算法 进行加密通信了\n然后发送一个Encrypted Handshake Message将已经商定好的参数等采用协商密钥进行加密，发送给服务器用于数据与握手验证</li>\n<li>同样，服务器也可以发送 Change Cipher Spec，说：“没问题，咱们以后都采用协商的通信密钥和加密算法进行加密通信了”，并且也发送 Encrypted Handshake Message 的消息试试。\n当双方握手结束 之后，就可以通过对称密钥进行加密传输了\n<img src="../assets/https/2020-12-07_17-29-52.png" alt="tls握手流程图"></li>\n</ol>\n<h5 id="%E6%8F%A1%E6%89%8B%E5%AE%8C%E6%AF%95%E5%8F%8C%E6%96%B9%E5%BC%80%E5%A7%8B%E6%AD%A3%E5%B8%B8%E9%80%9A%E4%BF%A1">握手完毕,双方开始正常通信<a class="anchor" href="#%E6%8F%A1%E6%89%8B%E5%AE%8C%E6%AF%95%E5%8F%8C%E6%96%B9%E5%BC%80%E5%A7%8B%E6%AD%A3%E5%B8%B8%E9%80%9A%E4%BF%A1">§</a></h5>\n<blockquote>\n<p>传输层-&gt;网络层-&gt;链路层</p>\n</blockquote>\n<h5 id="%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5tcp4%E6%AC%A1%E6%8C%A5%E6%89%8B">断开连接,tcp4次挥手<a class="anchor" href="#%E6%96%AD%E5%BC%80%E8%BF%9E%E6%8E%A5tcp4%E6%AC%A1%E6%8C%A5%E6%89%8B">§</a></h5>\n<blockquote>\n<p>当数据传输完毕之后,会进行连接的断开,链接的断开过程称为tcp的4次挥手</p>\n<ol>\n<li>A: B啊,我不想玩了</li>\n<li>B: 好啊,我知道了</li>\n<li>B: a啊,我也不想忘了,拜拜</li>\n</ol>\n</blockquote>\n<ol start="4">\n<li>\n<p>A: 好的,我知道了,拜拜\n<img src="../assets/https/2020-12-10_10-25-55.png" alt="tcp4次挥手流程图"></p>\n</li>\n<li>\n<p>client 发送FIN,seq=q, 进入FIN_WAIT_1状态</p>\n</li>\n<li>\n<p>server 端回复ACK,ack=q+1,进入close_wait状态</p>\n</li>\n<li>\n<p>client 收到ACK,进入FIN-wait_2状态</p>\n<ul>\n<li>如果这个时候服务端跑路了,那么client永远会停留在这个状态,tcp协议没有对这个状态做处理,但是linux有,可以设置一个超时时间</li>\n</ul>\n</li>\n<li>\n<p>server端发送FIN,ACK通知client,进入LAST_ACK状态</p>\n</li>\n<li>\n<p>client端收到后回复ACK,进入time_wait状态(最多等待2msl,等待之前的包传输完),后变成closed</p>\n</li>\n<li>\n<p>server端收到ack,进入closed状态</p>\n</li>\n</ol>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E7%9B%B8%E5%85%B3%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A">相关名词解释</a><ol><li><a href="#https">https</a></li><li><a href="#%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86">对称加密和非对称加密</a></li><li><a href="#%E8%AF%81%E4%B9%A6">证书</a></li></ol></li><li><a href="#%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B">请求的过程</a><ol><li><a href="#https%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F">https的工作模式</a><ol></ol></li></ol></li></ol></nav>'
        } }),
    'author': "zhangwengang",
    'contributors': [
        "zhangwengang"
    ],
    'date': "2020-12-04T00:00:00.000Z",
    'updated': "2020-12-23T08:10:12.000Z",
    'excerpt': "相关名词解释 https - 首先说一下https,https全文名称(hyper text transfer protocol over SecureSocket layer) ,字面意思是在ssl基础上的 http协议,在传统http的基础上,通过加密传输,身份认证(ssl)保证了传输过程的安全性,htt...",
    'cover': "../assets/https/2020-12-07_17-29-52.png",
    'categories': [
        "一天一道面试题"
    ],
    'tags': [
        "http",
        "https"
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
