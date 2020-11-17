---
date: 2018-10-11
categories:
  - 编程世界
tags:
  - jvm
  - 并发编程
---

# jvm 
### jvm 的生命周期

#### 虚拟机的启动

1：java虚拟机的启动是通过引导类加载器（bootstrap class loader）创建一个初始类（initial class)来完成的，这个类是由虚拟机的具体事项指定的

#### 虚拟机的执行

* 一个运行中的Java虚拟机有着一个清晰地任务：执行java程序
* 程序开始执行时他才运行，程序结束时他就停止
* 执行一个所谓的java程序的时候，真正执行的是一个叫做java虚拟机的进程

#### 虚拟机的结束

* 当虚拟机中除了守护线程以外，没有其他线程运行时，虚拟机就会退出
* 当程序抛出异常时
*

#### jvm的结构

![20200315160049.png](https://img.hacpai.com/file/2020/03/20200315160049-d756f8e7.png)![20200315160058.png](https://img.hacpai.com/file/2020/03/20200315160058-1aad0379.png)

#### 类加载器及其类加载过程

![20200315160106.png](https://img.hacpai.com/file/2020/03/20200315160106-ad21d136.png)

1. 类加载子系统负责从文件系统或者网络中加载class文件，class文件在文件开头有特定的文件标识
2. class loader只是负责class文件的加载，至于他是否可以运行，则有execution engine决定
3. 加载的类信息存放于一块称为方法区的内存空间。除了类的信息外，方法区还会存在运行时常量池信息（可能包括字符串字面量和数字产量）

#### 类的加载过程

![20200315160112.png](https://img.hacpai.com/file/2020/03/20200315160112-1aeab98c.png)

###### 加载

1. 通过类的全限定名获取定义此类的二进制字节流
2. 将这个字节流所代表的的静态存储结构转换为方法区的运行时数据结构
3. **在内存生成一个代表这个类的java.lang.class对象** ，作为方法区这个类的各种数据的访问入口

###### 链接阶段

* 验证：目的在于确保class文件中的字节流包含信息符合当前虚拟机要求，保证被加载类的正确性
* 准备：为类变量（static修饰）分配内存并且设置类变量的默认初始化，即零值
* 解析：将常量池中的符合引用转换为直接引用的过程

###### 初始化阶段

* 初始化阶段就是执行类构造器方法<clinit>的过程
* 此方法不需要定义，是javac编译器自动收集类中的赋值动作和静态代码块中的语句合并而来
* 构造器方法中指令按语句在源文件中出现的顺序执行
* clinit不同于类的构造器
* 虚拟机必须保证一个类的clinit方法在多线程下呗同步加锁

#### 类加载器

##### bootstrap class loader（引导类加载器）

1. 这个类加载器使用c/c++实现的，嵌套在JVM内部
2. 他用来加载Java的核心库（rt.jar source.jar 等),用于提供JVM自身需要的类
3. 并不继承自java.lang.classLoader.没有父加载器
4. 用来加载扩展类加载器和程序类加载器,作为他们的父类(扩展和程序类加载器也是对象,也需要被加载)
5. 出于安全考虑,Bootstrap类加载器只加载包名为java.javax,sun等开头的类

##### extension class loader (扩展类加载器)

1. java语言编号,由sun.misc.launcher$ExtClassLoader实现
2. 派生于classLoader类
3. 父加载器为引导类加载器
4. 从java.ext.dirs或从jdk的安装木木jre/lib/ext子目录下加载类库,如果用户创建的jar放在此目录下,也会自动的由扩展类加载器加载

##### application class loader(程序类加载器)

1.用的最多的类加载器,非引导或者扩展类加载器不加载的类都由程序类加载器加载或自定义类加载器加载

#### 双亲委派机制

java虚拟机对class文件采用的是**按需加载**的方式,也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象.而且加载某个类的class文件时采取的**双亲委派**模式,即把请求交由父类处理

##### 详细说明

1. 如果一个类加载器收到了类加载的请求,他首先不会自己去加载,而是将这个请求委托给父加载器去执行
2. 如果父类加载器还存在其父类加载器,则依次向上传递,最终到达顶层的引导类加载器
3. 如果父类加载器可以完成类加载任务,就成功返回,倘若父类加载器无法完成此加载任务,子加载器才会尝试自己去加载,这就是双亲委派模式

###### 优势

1. 避免类的重复加载
2. 保护程序安全,防止核心api被篡改,java.lang.String

#### 程序计数器(program count register)

1. 程序计数器用来存储指向下一条指令的地址,也就是即将要执行的指令代码.由执行引擎读取下一条指令
2. 它是一块很小的内存空间,几乎可以忽略不计,也是运行速度最快的存储区域
3. 在jvm规范中,每个线程都有自己独立的程序计数器,是线程私有的,生命周期于线程的生命周期保持一致