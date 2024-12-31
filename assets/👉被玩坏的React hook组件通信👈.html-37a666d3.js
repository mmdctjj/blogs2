import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as l,f as e,a as s,b as a,e as p}from"./app-6f8bae2c.js";const u={},r={href:"https://codesandbox.io/s/vibrant-rain-eqeh6g?file=/index.tsx:168-674",target:"_blank",rel:"noopener noreferrer"},d={href:"https://juejin.cn/post/7222575963565375544#heading-3",target:"_blank",rel:"noopener noreferrer"};function k(v,n){const t=c("ExternalLinkIcon");return i(),l("div",null,[n[3]||(n[3]=e(`<p>大家好，我是「萌萌哒草头将军」，感兴趣的小伙伴可以关注我公众号「萌萌哒草头将军」，近期有抽奖哦～</p><p>今天给大家表演个杂技，有赞的捧个赞场，没赞的捧个人场，可怜可怜我吧！！！</p><h3 id="👉useimperativehandle杂技" tabindex="-1"><a class="header-anchor" href="#👉useimperativehandle杂技" aria-hidden="true">#</a> 👉<code>useImperativeHandle</code>杂技</h3><p>语法：<code>useImperativeHandle(ref, createHandle, dependencies?)</code></p><p>用法：</p><p>🎉 <code>向父组件暴露一个自定义的 ref 句柄</code></p><p>🎉 <code>暴露你自己的命令式方法</code></p><p>我们采用自定义命令方法的方式进行表演，如下</p><p>🎁 父组件改变子组件的值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { useRef } from &#39;react&#39;;
import Child from &#39;./Child.js&#39;;

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.buy(&#39;apple&#39;);
  }

  return (
    &lt;form&gt;
      &lt;Child label=&quot;Enter your name:&quot; ref={ref} /&gt;
      &lt;button type=&quot;button&quot; onClick={handleClick}&gt;
        Edit
      &lt;/button&gt;
    &lt;/form&gt;
  );
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { forwardRef, useImperativeHandle, useState } from &#39;react&#39;;

const Child = forwardRef(function MyInput(props, ref) {

  const [goods, setGoods] = useState(null)
  
  useImperativeHandle(ref, () =&gt; {
    return {
      buy (goods) {
        setGoods(goods)
      },
    };
  }, []);

  return &lt;div&gt;{goods}&lt;/div&gt;;
});

export default Child;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="👉使用设计模式杂技" tabindex="-1"><a class="header-anchor" href="#👉使用设计模式杂技" aria-hidden="true">#</a> 👉使用<code>设计模式</code>杂技</h3>`,12)),s("p",null,[s("a",r,[n[0]||(n[0]=a("在线Demo看这里")),p(t)])]),s("p",null,[n[2]||(n[2]=a("这里需要借助之前提到的")),s("a",d,[n[1]||(n[1]=a("中介者模式")),p(t)])]),n[4]||(n[4]=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mediator <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./index&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// 事件订阅器</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">useGetEvent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">topic</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> sub <span class="token operator">=</span> mediator<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>data<span class="token punctuation">,</span> setData<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sub<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>topic<span class="token punctuation">,</span> setData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> data<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 事件发布器</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">useSetEvent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">topic<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> sub <span class="token operator">=</span> mediator<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> sub<span class="token punctuation">.</span><span class="token function">publish</span><span class="token punctuation">(</span>topic<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// app</span>
<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Child <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./child&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useSetEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./useEvent&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">useSetEvent</span><span class="token punctuation">(</span><span class="token string">&quot;count&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">curr</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> curr <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">add +</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Child</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// child</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useGetEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./useEvent&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">Child</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> sub <span class="token operator">=</span> <span class="token function">useGetEvent</span><span class="token punctuation">(</span><span class="token string">&quot;count&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>sub<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事实上不止子组件，全局组件可以实现</p><p>好了，今天就表演到这了，感谢大家的捧场</p><p>记得关注我公众号：「萌萌哒草头将军」</p>`,6))])}const g=o(u,[["render",k],["__file","👉被玩坏的React hook组件通信👈.html.vue"]]);export{g as default};
