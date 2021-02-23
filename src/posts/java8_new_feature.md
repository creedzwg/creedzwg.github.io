---
date: 2019-05-23
categories:
  - 编程世界
tags:
  - java8
---

# java8 新特性教程
> 代码地址:https://github.com/creedzwg/java8_action.git

## 讲解的新特性

- lambda表达式
- 函数式接口
- stream API

## lambda 表达式

### 什么是lambda表达式

- lambda表达式,我们可以把它看做是可传递的匿名函数:它没有名称,但他有参数列表,函数主体,返回类型,还有一个可以抛出的异常列表,它允许把函数作为一个方法的参数进行传递

### lambda 的语法

- (parameters) -> expression
- (parameters) -> {statements;}

**例子:**

```
 (String s) -> s.length()
 
 (Apple a) -> a.getWeight() > 150
 
(int x, int y) -> {
System.out.println("Result:");
System.out.println(x+y);
}

() -> 42

(Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight())


```

Lambda表达式其实是为FunctionalInterface(函数式接口)提供服务的
函数式接口的定义是接口内只有一个抽象方法,接口现在还可以有默认方法,(即在类没有对方法进行实现时，
其主体为方法提供默认实现的方法)

可以用**4个**接口来统一定义所有使用lambada表达式的行为

```

@FunctionalInterface
public interface Function<T, R> {

    R apply(T t);

}

Function 接口,有一个apply方法,这表示接受一个参数的类型,并返回另外一个参数的类型


@FunctionalInterface
public interface Consumer<T> {


    void accept(T t);
}

Consumer接口,有一个accept方法,他接受一个参数,没有任何返回值,可以做一些处理工作

@FunctionalInterface
public interface Predicate<T> {


    boolean test(T t);
}

Predicate接口,判断接口,有一个test方法,接受一个参数,返回boolean值

@FunctionalInterface
public interface Supplier<T> {

    T get();
}

Supplier接口 ,提供者接口,有一个get方法,无参数,有返回值




```

这4个接口只是4个基本接口,还会有许多函数式接口对这些进行扩展,变种,就不详细一一介绍了

### **方法引用,Lambda表达式的另外一种快捷写法**

- 方法引用让你可以重复的使用现有的方法定义,并像lambda一样传递它们,在某些情况下比起lambda表达式,它们似乎更易读,感觉也更自然
  -方法引用可以被看做仅仅调用特定方法的Lambda的一种快捷方式,换句话说,方法引用就是对Lambda表达式的一种简便写法,使用方法引用可能会提高代码的可读性

##### 方法引用的工作方式

- 当你需要使用方法引用的时候,目标引用放在分隔符::前,方法的名称放在后面。例如Apple:getWeight 就是引用了Apple类中定义的方法getWeight ,这个就是 (Apple a) -> a.getWeight()的快捷写法,可以把方法引用看做是仅仅针对涉及单一方法的Lambda的语法糖,因为你表达同样的事情要写的代码就更少了。

```
(Apple a) -> a.getWeight()                   Apple::getWeight
() -> Thread.currentThread().dumpStack()     Thread.currentThread()::dumpStack
(str, i) -> str.substring(i)                 String::substring
(String s) ->  System.out.println(s)         System.out::println
```

####方法引用的分类

1. 指向静态方法的方法引用(例如Integer.parseInt方法,可以写作Integer::parseInt)

Lambda: (args) -> ClassName.staticMethod(args)
方法引用: ClassName:: staticMethod

2. 指向任意类型实例方法的方法引用(例如String 的length 方法， 写作String::length)
   类似于String::length的第二种方法引用的思想就是你在引用一个对象的方法，而这个对象本身是Lambda的一个参数
   Lambda: (arg1,rest) ->arg1.instanceMethod(rest)
   方法引用: ClassName::instanceMethod
3. 指向现有对象的实例方法的方法引用(假设你有一个局部变量a 用来存放 A类型的对象,它有个示例方法getValue,那么就可以写成a::getValue)
   第三种方法引用指的是，你在Lambda中调用一个已经存在的外部对象中的方法
   Supplier<Integer> s =()->a.getWeight()
   Lambda: (args) ->instance.instanceMethod(args)
   方法引用: instance::instanceMethod

#### 具体例子

- 对一个字符串的List进行排序,List的sort方法需要一个Comparator实现作为参数,Comparator描述了一个具有(T,T)->int签名的函数描述符。你可以利用String类的CompareTo方法来定义一个lambda表达式.

```
List<String> str = Arrays.asList("a","b","A","B");
str.sort((s1, s2) -> s1.compareTo(s2));

可以修改成str.sort(String::compareTo)
```

#### 构造函数引用

- 对于一个现有的构造函数,你可以利用它的名称和关键字new 来创建它的一个引用

`Supplier<Apple> c1=Apple::new
等价于
Supplier<Apple> c1=()->new Apple()`

#### lambda总结

- Lambda表达式可以理解为一种匿名函数：它没有名称，但有参数列表、函数主体、返回
  类型，可能还有一个可以抛出的异常的列表。
- Lambda表达式让你可以简洁地传递代码。
- 函数式接口就是仅仅声明了一个抽象方法的接口。
- 只有在接受函数式接口的地方才可以使用Lambda表达式。
- Lambda表达式允许你直接内联，为函数式接口的抽象方法提供实现，并且将整个表达式
  作为函数式接口的一个实例。
- Java 8自带一些常用的函数式接口，放在java.util.function包里，包括Predicate
  <T>、Function<T,R>、Supplier<T>、Consumer<T>和BinaryOperator<T>，如表
  3-2所述。
- 方法引用让你重复使用现有的方法实现并直接传递它们。
- Comparator、Predicate和Function等函数式接口都有几个可以用来结合Lambda表达
  式的默认方法

### Stream 流

#### 流的概念

- 流是java API的新成员,它允许你以声明性方式处理数据集合(通过查询语句来表达,而不是临时编写一个实现),同时可以并行处理,提高处理效率
- Stream 是Java8 中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。使用Stream API 对集合数据进行操作，就类似于使用SQL 执行的数据库查询。也可以使用Stream API 来并行执行操作。简而言之，Stream API 提供了一种高效且易于使用的处理数据的方式

#### Stream的用法

- 流的使用一般包括三件事:

1. 一个数据源来执行一个查询,(创建stream)
2. 一个中间操作链,形成一条流的流水线(中间操作)
3. 一个终端操作,执行流水线,并能生成结果(终止操作)

- 创建流的方式

```
//1. 可以通过集合顶级集合Collection的默认stream()或者parallelStream方法
List<String> list=new ArrayList<>();
Stream<String> stream1 = list.stream();

//2.通过Arrays中的静态方法stream() 获取数组流
Dish[] dishs=new  Dish[10];
Stream<Dish> stream2 = Arrays.stream(dishs);
//3. 通过Stream类中的静态方法of()
Stream<String> stream3 = Stream.of("aa", "bb", "cc");
//创建无限流
Stream<Integer> iterate = Stream.iterate(0, (x) -> x + 2);
iterate.limit(10).forEach(System.out::println);

//通过Stream的generate方式,也是无限流

Stream<Double> generate = Stream.generate(Math::random);
generate.limit(10).forEach(System.out::println);
```

- 中间操作

1. 多个中间操作可以连接起来形成一个流水线，除非流水线上触发终止操作，否则中间操作不会执行任何的处理！
   而在终止操作时一次性全部处理，称为“惰性求值"


| 操作 | 类型 | 返回类型 | 操作参数 | 函数描述符 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| filter | 中间 | Stream<T> | Predicate<T> | T -> Boolean |
| map | 中间操作 | Stream<R> | Function<T,R> | T -> R |
| limit | 中间操作 | Stream<T> |   |   |
| skip | 中间操作 | Stream<T> |   |   |
| sorted | 中间操作 | Stream<T> | Comparator<T> | (T,T) ->Int |
| distinct | 中间操作 | Stream<T> |   |   |
| foreach | 终端 | 消费流中的每个元素并对其应用Lambda,操作返回void |   |   |
| count |   | 终端 | 返回流中元素的个数,这一顿操作返回Long |   |
| collect |   | 终端 | 把流规约成一个集合,比如List,Map甚至是Integer |   |

#### stream API 的操作方式

#### 中间操作

##### 筛选和切片

用predicate,筛选出不同的元素,忽略流中的的头几个元素,获奖流切断至指定长度

- filter方法。该操作会接受一个Predicate谓词（一个返回
  boolean的函数）作为参数，并返回一个包括所有符合谓词的元素的流

```
menu.stream().filter(Dish::isVegetarian)
```

- distinct的方法，它会返回一个元素各异（根据流所生成元素的
  hashCode和equals方法实现）的流

```
List<Integer> numbers = Arrays.asList(1, 2, 1, 3, 3, 2, 4);
numbers.stream().distinct()
```

- limit(n)方法，该方法会返回一个不超过给定长度的流。所需的长度作为参数传递
  给limit。如果流是有序的，则最多会返回前n个元素;也可以用在无序流上，比如源是一个Set。这种情况下，limit的结果不会以任何顺序排列

```
menu.stream().filter(d -> d.getCalories() > 300).limit(3)
```

- skip(n)方法 ,流还支持skip(n)方法，返回一个扔掉了前n个元素的流。如果流中元素不足n个，则返回一
  个空流。

```
menu.stream().filter(d -> d.getCalories() > 300).skip(2)
```

##### **映射**

一个非常常见的数据处理套路就是从某些对象中选择信息。比如在SQL里，你可以从表中选择一列。Stream API也通过map和flatMap方法提供了类似的工具

- map方法，它会接受一个函数作为参数。这个函数会被应用到每个元素上，并将其映射成一个新的元素

-flatMap他会接受一个参数作为函数,将流中每个值都换成另一个流,最后再将所有流拼成另外一个流

```
menu.stream().map(Dish::getName)

```

##### 排序

- 排序分为自然排序(本身实现Cpmparaable 接口,实现了CompareTo方法)
- 定制排序,通过Comparator接口实现

#### 终止操作

##### 查找和匹配

- 另一个常见的数据处理套路是看看数据集中的某些元素是否匹配一个给定的属性,
  StreamAPI通过allMatch、anyMatch、noneMatch、findFirst和findAny方法提供了这样的具

##### 检查Predicate谓词是否至少匹配一个元素

```
此操作用来查看菜单中是否有素食可以选择
if(menu.stream().anyMatch(Dish::isVegetarian)){
System.out.println("有素食");
}
anyMatch方法返回一个boolean，因此是一个终端操作 
```

##### 检查谓词是否匹配所有元素

- allMatch方法的工作原理和anyMatch类似，但它会看看流中的元素是否都能匹配给定的谓词

```
是否菜单里面所有的菜的热量都小于1000卡路里
boolean  status= menu.stream().allMatch(d -> d.getCalories() < 1000);
```

##### 检查谓词是否没有元素跟他匹配

- noneMatch()跟allMatch()相反,它可以确保流中没有任何元素与给定的谓词匹配

```
是否菜单里面所有的菜的热量都小于1000卡路里
menu.stream().noneMatch(d -> d.getCalories() >= 1000)
```

#### 查找任意元素

- findAny方法将返回当前流中的任意元素

```
 Optional<Dish> dish =menu.stream().filter(Dish::isVegetarian).findAny();

可以看出,返回的是一个Optional<T> ,他是一个容器类,代表着一个值存在或者不存在,

在上面的代码中，findAny可能什么元素都没找到。Java 8的库设计人员引入了Optional<T>，这样就不用返回众所周知容易出问题的null了。


```

#### 查找第一个元素

- findFirst方法返回流中的第一个数据

```
Optional<Dish> dish =menu.stream().filter(Dish::isVegetarian).findFirst();
```

#### 规约

- 之前讲的终端操作都是一个boolean或者void ,或者Optional对象,也有使用collect来将
  流中的所有元素组合成一个List,
- 使用规约可以把流中的元素组合起来,然后得到一个值。

#### 元素求和

```
- reduce
对传统的数字列表的元素进行求和,我们可能会这么做
int sum = 0;
int[] numbers={4,5,3,9};
for (int x : numbers) {
sum += x;
}
numbers中的每个元素都用加法运算符反复迭代来得到结果。通过反复使用加法，你把一个
数字列表归约成了一个数字。这段代码中有两个参数：
1 总和变量的初始值，在这里是0；
2 将列表中所有元素结合在一起的操作，在这里是+

这种就可以使用reduce操作来灵活完成
int sum = numbers.stream().reduce(0, (a, b) -> a + b);
reduce 接受两个参数

1. 一个初始值,这个是0
2. 一个BinaryOperator<T>来将两个元素结合起来产生一个新值，这里我们用的是
lambda (a, b) -> a + b。

首先，0作为Lambda（a）的第一个参数，从流中获得4作为第二个参数（b）。0 + 4得到4，它成了新的累积值。然后再用累积值和流中下一个元素5调用Lambda，产生新的累积值9。接下来，再用累积值和下一个元素3调用Lambda，得到12。最后，用12和流中最后一个元素9调用Lambda，得到最终结果21。
```

#### collect 搜集

- collect是一个终端操作，它接受的参数是将流中元素累积到汇总结果的各种方式（称为收集器) ,用于给stream中元素做汇总的方法
- 具体使用方法在代码里面
