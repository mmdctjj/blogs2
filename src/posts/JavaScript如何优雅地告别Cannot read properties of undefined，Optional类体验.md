---
title: JavaScript如何优雅地告别Cannot read properties of undefined，Optional类体验
isTimeLine: true
date: 2024-05-11
category:
  - 前端
tag:
  - JavaScript
---

> 文章同步在公众号：萌萌哒草头将军，欢迎关注！

相信很多开发者在开发中经常遇到的一个报错：

Uncaught TypeError: Cannot read properties of undefined

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8fabb3d33b44503b14edc25a7e7a132~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1392&h=158&s=54107&e=png&b=ffeeee)

作为一名熟练的前端攻城狮，你一眼就能这是由于读取一个对象属性时，对象为 undefined 时导致的。

要想避免，我们需要做下判断。

```js
let a = fetch(url, params);
a?.result?.map(console.log);
```

或者你使用 try catch 结构来捕获异常。

```js
try {
  let a = fetch(url, params);
  a.result.map(console.log);
} catch (err) {
  console.log(err);
}
```

当然，我们还有很多其他的选择，这里就不一一列举了

接下来我介绍一种我最新学到的方案——Java 的 Optional 类。

Optional 类是 Java 中解决空指针异常（NullPointerException）的一种方案。（它和 Cannot read properties of undefined 是一样的错误），我们看看没有 Optional 类的情况

```java
String str = null;
// System.out.println(appendTest.toString());
// 上面会触发：NullPointerException，下面是常见的应对方法
if (str !== null) {
    System.out.println(str.toString());
} else {
    System.out.println("str is null!!!");
}
```

但是使用 Optional 就优雅的多了

```java
String str = null;
// 生成Optional类，ofNullablebiao 生成可以为null的对象
Optional<String> optional = Optional.ofNullable(name);
```

> 生成 Optional 类还有 of 方法，不同的是不能为 null，否则调用 ifPresent 依然会报错 NullPointerException

ifPresent: 如果存在就打印它，否则不进行任何操作

```java
optional.ifPresent(str -> System.out.println(str));
// 等价于
optional.ifPresent(System.out::println);
```

orElseGet：如果存在就返回它，否则执行后面的表达式

```java
optional.orElseGet(() -> System.out.println("str is null!!"));
```

除此之外还有很多有意思的接口，比如我们熟悉的：map、flatmap、filter 等，

需要注意的是，因为 Optional 是一个容器类，它的方法返回的仍然是 Optional 对象，所以你可以继续对返回的 Optional 对象进行链式调用。例如：

```java
import java.util.Optional;

public class Person {
    // something
}

public class Main {
    public static void main(String[] args) {
        // 创建一个可能为 null 的 Person 对象
        Person person = new Person("John Doe", 30);

        // 使用 Optional 对象进行链式调用
        Optional<Person> optionalPerson = Optional.ofNullable(person)
                .filter(p -> p.getAge() >= 18)
                .map(p -> new Person(p.getName().toUpperCase(), p.getAge())
                .flatMap(p -> Optional.of(new Person(p.getName(), p.getAge() + 1)));

        // 输出结果
        optionalPerson.ifPresent(p -> System.out.println("Name: " + p.getName() + ", Age: " + p.getAge()));
    }
}
```

更多信息可以看下面这张截图

![uTools_1700271573491.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29834fb133d049dfaefa5462c7c0571f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=869&h=1222&s=216350&e=png&b=212121)

> 这些方法像极了 javascript 的数组方法，但是他们的区别是，在 Java 中，Optional 类主要用于包装单个对象，以表示一个可能存在或可能不存在的值。它并不直接支持包装数组。

让我们回到 javascript，这种方案似乎可以很好的解决前端的问题。好奇的搜索 GitHub，这种方案有很多 javascript 版本的实现。

例如：https://github.com/JasonStorey/Optional.js

```js
const Optional = require("optional-js");

// Define some simple operations
const getUserId = (username) => (username === "root" ? 1234 : 0);

const verify = (userId) => userId === 1234;

const login = (userId) => console.log("Logging in as : " + userId);

// Declare a potentially undefined value
const username = process.argv[2];

// Wrap username in an Optional, and build a pipeline using our operations
Optional.ofNullable(username).map(getUserId).filter(verify).ifPresent(login);
```

这看起来妙极了！！！

那么这种方案是怎么实现的呢？关键是函数返回值依然是个 Optional 对象。下面我们简单的实现一下这个过程.

```js
class Optional {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Optional(value);
  }

  isPresent() {
    return this.value !== undefined && this.value !== null;
  }

  map(mapper) {
    if (this.isPresent()) {
      const mappedValue = mapper(this.value);
      return Optional.of(mappedValue);
    }
    return Optional.ofNullable(null);
  }

  flatMap(mapper) {
    if (this.isPresent()) {
      const mappedValue = mapper(this.value);
      if (mappedValue instanceof Optional) {
        return mappedValue;
      }
      return Optional.ofNullable(mappedValue);
    }
    return Optional.ofNullable(null);
  }

  orElse(defaultValue) {
    return this.isPresent() ? this.value : defaultValue;
  }

  static ofNullable(value) {
    return Optional.of(value);
  }
}

function getNameLength(person) {
  return Optional.ofNullable(person)
    .map((p) => p.name)
    .map((name) => name.length)
    .orElse(0);
}

const person = { name: "John Doe" };
console.log(getNameLength(person)); // 输出：8

const emptyPerson = null;
console.log(getNameLength(emptyPerson)); // 输出：0
```

你觉得这个方案可以吗？相信大家读到这里心中已经有答案了吧
