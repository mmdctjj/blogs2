---
title: vue组件通信总结
isTimeLine: true
date: 2023-03-15
category:
  - 前端
tag:
  - Vue
---

11月份的面试越来越觉得自己学的不够踏实和深入。现在实习了有空总结下

京东前端实习一道面试题：**vue中组件通信接口有哪些，除了props和$emit？**

注意是接口，我说了vuex和localStorage，立马就被否决了

### 一、父子组件通信
#### 1.props和$emit
props最常见的父子通信接口，但是props是单向数据流的形式：父级 prop 的更新会向下流动到子组件中，但是反过来则不行

此时需要借助vue提供的事件监听机制来完成子组件向父组件数据流动更新的功能。
在子组件使用$emit定义监听事件名称，在父组件使用v-on监听该事件，在事件中改变父组件的状态。
```js
// father.vue
<template>
    <div>
        <Children :name="name" @close="closeChildren"><Children />
    </div>
</template>

<script>
import Children from './children.vue'
export default {
    data(){
        return {
            name: 'vue组件通信总结'
        }
    },
    components: {
        Children
    },
    methods: {
        closeChildren() {
            // todo
        }
    }
};
</script>
```
```js
// children.vue
<template>
    <div>
        <h3>{{name}}</h3>
        <el-button
            v-if="closeBtn"
            circle
            size="mini"
            class="close_btn"
            icon="el-icon-close"
            @click="close"
        ></el-button>
    </div>
</template>

<script>
export default {
    props: ["name"],
    methods: {
        close() {
          this.$emit("close");
        }
    }
};
</script>
```
#### 2.$parent和$children或者$refs
##### 1) $parent
$parent用来访问父组件实例，通常父组件都是唯一确定的
```js
// children.vue
<script>
export default {
    created(){
        console.log(this.$parent.name) // ==> vue组件通信总结
        this.$parent.name='mmdjj'
        console.log(this.$parent.name) // ==> mmdjj
    },
};
</script>
```
##### 2) $children
$children用来访问子组件实例，要知道一个组件的子组件可能是不唯一的，所以它的返回值是数组.
```js
// father.vue
<script>
export default {
    created(){
        console.log(this.$children) // ==> [ VueComponent ]
        this.$children.forEach((VueComponent)=>{
            if(VueComponent.name == "你知道的组件名称"){
                // todo   
            }
        })
    },
};
</script>
```
##### 3) $refs
$children的缺点是无法确定子组件的顺序，也不是响应式的。所以如果你确切的知道要访问的子组件建议使用$refs。

$refs需要使用ref属性在子组件上设置标识，然后通过this.$refs.refName访问。
```js
// father.vue
<template>
    <div>
        <Children ref="child1"><Children />
    </div>
</template>

<script>
import Children from './children.vue'
export default {
    data(){
        return {
            name: '我是父组件name'
        }
    },
    mounted(){
        console.log(this.$refs.child1.name) // ==>我是父组件name123 
    }
};
</script>
```
```js
// children.vue
<script>
export default {
    data(){
        return {
            name: '我是子组件name'
        }
    },
    mounted(){
        this.name = this.$parent.name + '123';
    }
};
</script>
```
注意：ref属性作为组件属性时，访问的是根组件的实例；作为dom属性时，访问的是dom信息
```js
// father.vue
<template>
    <div>
        <Children ref="child1"><Children />
    </div>
</template>

<script>
import Children from './children.vue'
export default {
    data(){
        return {
            name: 'mmdjj',
            age: 18,
            sex: 'man'
        }
    }
};
</script>
```
#### 3.inheritAttrs和$attrs
##### 1）inheritAttrs
这是@2.4新增的属性和接口。inheritAttrs属性控制子组件html属性上是否显示父组件的提供的属性
```js
// father.vue
<template>
    <div id="father" >
        <Children :name="name" :age="age" :sex="sex" ><Children />
    </div>
</template>

<script>
import Children from './children.vue'
export default {
    data(){
        return {
            name: 'mmdjj',
            age: 18,
            sex: 'man'
        }
    }
};
</script>
```
浏览器渲染的时候，默认会把父组件写在子组件的属性一起渲染出来，它是这样的
```html
<div id="father" name="mmdjj" age="18" sex="man" >
    ...
</div>
```
从@2.4开始，在子组件默认添加inheritAttrs选项，并且默认为false，来隐藏这些属性，如果你期望这些属性是显示在根html元素上，你只需要将inheritAttrs的值指定为true
```js
// children.vue
<script>
export default {
    inheritAttrs: true
};
</script>
```
此时渲染之后式这样的
```html
<div id="father">
    ...
</div>
```
##### 2）$attrs
$attrs包含所有**未在props中声明**的父组件传递的属性

$attrs简单的说就是props的加强版，因为当父组件提供props的属性十分多时，逐个在子组件显式的声明出来有时也是比较费事的。但是使用$attrs就可以达到事半功倍的效果，看下面的例子
```js
// father.vue
<template>
    <div id="father" >
        <Children :name="name" :age="age" :sex="sex" ><Children />
    </div>
</template>
```
```js
// children.vue
<script>
export default {
    props: ["name"]
    mounted(){
        // 因为在props中声明了name，所以打印结果中没有name这个属性
        console.log(this.$attrs)  // => { "age": 18, "sex": "man" }
    }
};
</script>
```
$attrs还有个妙用就是将父组件所有未在props声明的属性通过v-bind传给自己的内部子组件（将父亲的属性通过自己传给自己的儿子），也就是说它可以作为隔代组件通信的桥梁，例子如下
```js
// father.vue
<template>
    <div>
        <Children :name="name" :age="age" :sex="sex" ><Children />
    </div>
</template>
```
```js
// children.vue
<template>
    <div>
        <Child v-bind="$attrs" ><Child />
    </div>
</template>
```
```js
// child.vue
<script>
export default {
    props: ["name"]
    mounted(){
        console.log(this.$attrs)  // => { "age": 18, "sex": "man" }
    }
};
</script>
```
下面的所有方法的分类不是唯一的，只是我比较推荐的分类方式，比如$root和依赖注入他们既适合兄弟组件，也适合隔代组件
### 二、兄弟组件通信
#### 1.$root
$root用来方位根实例属性
##### 1）基本用法
个人认为 root的适用性是最好的，比如前面父子组件通信你使用了parent或者children，但是由于需求的改变等等不得已原因，它们的关系已经不是父子组件了，此时，通信机制就不能不重新建立了。但是如果你一开始就使用了$root作为通信机制，那么就不存在这样的麻烦了。
```js
// children1.vue
<script>
export default {
    data(){
        return {
            msg: "hello"
        }
    },
    mounted(){
        this.$root.msg = this.msg
    }
};
</script>
```
```js
// children2.vue
<script>
export default {
    mounted(){
        console.log(this.$root.msg) // => 'hello'
    }
};
</script>
```
确切的说$root方法使用于任何情况的组件通信，包括父子组件、兄弟组件、隔代组件通信，可以形象的把它理解成为它们共同的祖先

这时候聪明的你肯定联想到了根组件，那个被叫做App.vue的家伙。好奇它和$root究竟是啥关系，看下面的代码
```js
// App.vue
<script>
export default {
    mounted(){
        console.log(this.$root == this) // => ?
    }
};
</script>
```
实际上这个打印的结果是false，也就说$root也是App.vue的祖先
##### 2）一个缺点
$root也有它的缺点，官网中也提到了，它只适合通用化（就是不用动态更新的意思）的场景，如果想建立随着改变动态更新的数据，建议使用vuex
```js
// father.vue
<script>
import Child1 from "@/components/children";
export default {
  data() {
    return {
      name: "123",
      age: 23,
      say: "hello"
    };
  },
  beforeMount() {
    this.$root.testMeg = 'mmdjj';
  },
  components: {
    Child1
  }
};
</script>
```
```js
// Child1.vue
<template>
    <div>
        {{$root.testMsg.name}} // 一直显示mmdjj
    </div>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$root.testMeg = "welcome";
      console.log(this.$root.testMeg); // welcome
    }, 3000);
  }
};
</script>
```
##### 3）让它成为响应式
不过你尝试着给$root传递一个响应式的对象，当对象中的数据改变时，其余使用这个属性的地方也会跟着改变，也就是说它就是响应式的了
```js
// father.vue
<script>
import Child1 from "@/components/children";
export default {
  data() {
    return {
      name: "123",
      age: 23,
      say: "hello",
      testMeg: {
        name: "mmdjj"
      }
    };
  },
  beforeMount() {
    this.$root.testMeg = this.testMeg;
  },
  components: {
    Child1
  }
};
</script>
```
```js
// Child1.vue
<template>
    <div>
        {{$root.testMsg.name}} // 刚开始显示mmdjj，三秒之后显示为welcome
    </div>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$root.testMeg.name = "welcome";
      console.log(this.$root.testMeg.name);  // welcome
    }, 3000);
  }
};
</script>
```
#### 2.eventBus
eventBus并不是vue官方的名称，它是使用vue实例的$emit接口建立全局的事件监听机制，很多人巧妙的使用它来组件通信，这种思想来源于Android事件发布/订阅轻量级框架eventBus。但是这并不是vue最优的通信机制。
##### 1创建
本质就是实例化一个空vue实例
```js
// src/eventBus.js
import Vue from "vue"

const eventBus = new Vue()

export default eventBus
```
或者直接挂载到全局，连引入都可以省略
```js
// main.js
import Vue from "vue"

Vue.prototype.$eventBus = new Vue()
```
##### 2.使用
一般这种方式每个都会经历三个阶段，发起事件——>监听事件——>销毁事件

发起
```js
// children1.vue
// 这是挂载到全局的版本
<script>\
export default {
    mounted(){
        // 这是单独文件的版本（注意：引入省略了）
        eventBus.$emit("update", this.msg)
        // 这是挂载到全局的版本
        this.$eventBus.$emit("update", this.msg)
    }
};
</script>
```
监听
```js
// children2.vue
<script>
export default {
    mounted(){
        // 这是单独文件的版本（注意：引入省略了）
        eventBus.$on("update", this.updateMsg(msg))
        // 这是挂载到全局的版本
        this.$eventBus.$on("update", this.updateMsg(msg))
    },
    methods: {
        updateMsg(msg){
            console.log(msg)
            // todo
        }
    }
};
</script>
```
销毁
```js
// children2.vue
<script>
export default {
    beforeDestroy(){
        // 这是单独文件的版本（注意：引入省略了）
        eventBus.$off("update")
        // 这是挂载到全局的版本
        this.$eventBus.$off("update")
    }
};
</script>
```
###### 这里需要特别强调的一点是当一个事件在多个组件里监听时，每个组件在销毁时连同事件也要销毁，不然它会在你看不到的地方继续执行而难以被发现，当然不管是不是在多个组件监听，在组件销毁时一起销毁监听事件不失为一种良好的编程习惯
##### 3.缺点
看了前面的例子，你会发现，通信最关键的地方其实就在上面的updateMsg函数里，而这之外的所有的东西，都只是一种繁琐的铺垫，所以缺点也是显而易见的。另外对于多个监听的地方，你还需要手动关闭，还有一个被大家诟病的就是每个事件都必需起一个独一无二的名字，这对起名废的同学来说是灾难啊
##### 4.替代vuex
有人已经提供了一个方案使用eventBus替代vuex，这个方案为我们解决了前面提到的缺点，具体可以看[这里](https://juejin.im/post/6844903636489732103)
### 三、隔代组件通信
#### 1.provide和inject(依赖注入)
依赖注入是在provide选项中提供要共享的数据，在inject选项中使用共享的数据。它也是官方首推在不使用vuex时隔代组件通信方式
##### 1）使用
```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 任何后代组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
需要知道的是，provide也可以是个函数，返回一个对象，更多细节可以参考详细的[api文档](https://cn.vuejs.org/v2/api/#provide-inject/)
此外，它也和props一样可以设置默认值
```js
const Child = {
  inject: {
    foo: { default: 'foo' }
  }
}
// 或者
const Child = {
  inject: {
    foo: {
      from: 'bar',
      default: () => [1, 2, 3]
    }
  }
}
```
##### 2）不明显的缺点
出于设计的考虑，依赖注入和$root一样，都是非响应式的数据模式

但是官方又说了，可以通过提供一个响应式的对象，来使注入的数据是响应式的。
```js
// 父级组件提供 'foo'
var Provider = {
    data(){
        return {
            obj: {name: 'mmdjj'}
        }
    },
    provide: {
        foo: this.obj
    },
}

// 任何后代组件注入 'foo'
var Inject = {
  template: "<div>{{foo.name}}</div>",  // => 三秒后由mmdjj变成welcome
  inject: ['foo'],
  created () {
    console.log(this.foo.name) // => "mmdjj"
    setTimeout(() => {
      this.foo.name = "welcome";
      console.log(this.foo.name);  // welcome
    }, 3000);
  }
  // ...
}