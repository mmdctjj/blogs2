---
title: 优美的Reactl列表动画：Styled-Components动画实践
isTimeLine: true
date: 2023-03-15
category:
  - 前端
tag:
  - React
  - 用户体验
---
> 原创文章，未经允许，禁止转载
> 
先看效果图(录制软件限制，只有30祯，真实效果可以运行源码)，[源码点这里，欢迎star](https://github.com/mmdctjj/react-animation-demo)

基础动画如下：
![overview.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/655d1cf50ece4a13a51a5374c0057005~tplv-k3u1fbpfcp-watermark.image?)

组合动画如下：
![overview2.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5d5f20d537c4c9fb969422ae8923aa8~tplv-k3u1fbpfcp-watermark.image?)

带缩放的动画如下：
![overview3.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9dbf21dbe19407f8cf770ad1e17f8df~tplv-k3u1fbpfcp-watermark.image?)
### 1 动画实现的基本原理
所谓万变不离其宗，我们的动画底层还是依靠css提供的`animation`动画
```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

@keyframes name {
  0% {}
  100% {}
}
```

> `fill-mode`规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
> 
> 默认为`none`：在动画执行之前和之后不会应用任何样式到目标元素，即采用初始样式
> 
> `forwards`：将动画结束之后的样式应用在元素上，即不采用初始样式

### 2 和styled-components结合起来
主要采用`styled-components`(CSS in JS方案)提供的`styled`方法定义`CSS animation`动画参数，配合提供的`keyframes`方法定义各种类型动画实现,

例如，定义一个从底往上进入的动画
```style.js
import styled, { keyframes } from "styled-components";

const bottomToTop = keyframes`
  0% {
    transform: translateY(50%);
  }

  100% {
    transform: translateY(0);
  }
`

export const BottomToTop = styled.div`
  transform: translateY(50%);
  animation: ${bottomToTop} 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 150ms;
`
```
为了让每个列表项的动画开错落有序，还需要将动画的延时时间做下处理
```js
animation-delay: ${props => (props.index ?? 0) * 150}ms
```
为了更灵活的使用，将延时参数、动画时长参数，设置为动态的变量
```js
animation: ${bottomToTop} ${props => props.duration ?? 300}ms;
animation-delay: ${props => (props.index ?? 0) * (props.delay ?? 150)}ms
```
即完整的动画定义为下面这样
```js
import styled, { keyframes } from "styled-components";

export interface AnimationProps {
  index?: number
  duration?: number
  delay?: number
}

const bottomToTop = keyframes`
  0% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
`

export const BottomToTop = styled.div<AnimationProps>`
  transform: translateY(50%);
  opacity: 0;
  animation: ${bottomToTop} ${props => props.duration ?? 300}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: ${props => (props.index ?? 0) * (props.delay ?? 150)}ms
`
```
接着在列表渲染的地方使用`BottomToTop`组件
```js
    
const App: () => {

  return <>
        // ...
       {
        new Array(5).fill(null).map((_, idx) => <BottomToTop key={idx} index={idx}>
          <YourComponents />
        </BottomToTop>)
      }

  </>
}
```
此时动画样式虽然很舒服了，但是还不够优雅

![b_to_t.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab0d2ad478d94329a4cbef7b4bb7cb2c~tplv-k3u1fbpfcp-watermark.image?)
我们给动画加个回弹动画
```js
const bottomToTop = keyframes`
  0% {
    transform: translateY(50%);
  }
  80% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0);
  }
`
```
这样动画就更加有灵性了

![bottom_to_top.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18aed1e7bd7a49beb29da6faff34ec31~tplv-k3u1fbpfcp-watermark.image?)
实现其余基础动画的方式与此类似，具体可以[参考源码](https://github.com/mmdctjj/react-animation-demo/blob/master/src/animations.js#L33)

下面展示下组合动画的
### 3 思路打开
除了逐个有序的渲染列表，我们还可以考虑按照一定规律给不同的元素使用不同的话，
#### 3.1 左右交错
例如，如果是奇数项，元素就从右边进入，如果是偶数项，就从左边进入

![right_and_left.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c1e9c4468d448ba9dacec58aae56758~tplv-k3u1fbpfcp-watermark.image?)
```js
    
const App: () => {

  return <>
        // ...
       {
        new Array(5).fill(null).map((_, idx) => idx % 2 === 0
          ? <RightToLeft key={idx} index={idx} duration={300} delay={50}>
              <YourComponents />
            </RightToLeft>
            
          : <LeftToRight key={idx} index={idx} duration={300} delay={50}>
              <YourComponents />
          </LeftToRight>)
      }

  </>
}
```
#### 3.2 上下交错
例如，如果是奇数项，元素就从上边进入，如果是偶数项，就从下边进入

![top_and_bottom.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a7e8995153845f78478ca6d7de9fdf6~tplv-k3u1fbpfcp-watermark.image?)
```js
    
const App: () => {

  return <>
        // ...
       {
        new Array(5).fill(null).map((_, idx) => idx % 2 === 0
          ? <TopToBottom key={idx} index={idx} duration={300} delay={50}>
              <YourComponents />
            </TopToBottom>
            
          : <BottomToTop key={idx} index={idx} duration={300} delay={50}>
              <YourComponents />
          </BottomToTop>)
      }

  </>
}
```
#### 3.3 左右交错的同时载增加从下到上的动画
甚至，你还可以给交错的列表增加点别的动画，例如左右交错的同时载增加从下到上的动画

![left_and_right_and_top_toBottom.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23758d8049e147c4a4e651fa0990e799~tplv-k3u1fbpfcp-watermark.image?)
```js
    
const App: () => {

  return <>
        // ...
       {
        new Array(5).fill(null).map((_, idx) => idx % 2 === 0
          ? <BottomToTop key={idx} index={idx} duration={300} delay={50}>
              <RightToLeft index={idx} duration={300} delay={50}>
                <YourComponents />
              </RightToLeft>
            </BottomToTop>
            
          : <BottomToTop key={idx} index={idx} duration={300} delay={50}>
              <LeftToRight index={idx} duration={300} delay={50}>
                <YourComponents />
              </LeftToRight>
            </BottomToTop>
         )
      }

  </>
}
```
### 4 思路再打开
我们不要局限于仅有的`translateX`、`translateY`、`translate`属性，还可以尝试下其余的动画属性，例如，我使用`scale`属性增加了缩放动画，组合我们列表动画，效果如下

![scale_and_right_to_left.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f17c692617914672bdb5d3aed2031f7b~tplv-k3u1fbpfcp-watermark.image?)
```js
const scale = keyframes`
  0% {
    transform: scale(0.8);
  }

  70% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1
  }
`

export const Scale = styled.div<AnimationProps>`
  transform: scale(1);
  opacity: 0;
  animation: ${scale} ${props => props.duration ?? 300}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: ${props => (props.index ?? 0) * (props.delay ?? 150)}ms
`
```

从上面你或许可以看到，我的组合动画似乎比较繁琐，例如，从左到右同时从下到上，我使用了`translateX`、`translateY`组合，而不是直接定义`translate`，其实我考虑到基础动画，组合起来使用场景更广，所以就这样使用了，当然，如果需要，你也可以单独加上这样的基础动画。

如果你有更好的思路，欢迎交流