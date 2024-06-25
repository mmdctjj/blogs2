---
title: 🚀超详细解读vue3.2源码——组件渲染流程
isTimeLine: true
date: 2024-06-19
category:
  - 前端
tag:
  - Vue
---

> 欢迎关注我的公众号：萌萌哒草头将军

入口->全局初始化->生成 vnode->挂载

入口函数

```js
export const createApp = (...args) => {
  // 1.创建实例
  const app = ensureRenderer().createApp(...args);

  // 2. 重写实例的 mount 方法
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;

    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.
      // The user must make sure the in-DOM template is trusted. If it's
      // rendered by the server, the template should not contain any user data.
      component.template = container.innerHTML;
      // 2.x compat check
      if (__COMPAT__ && __DEV__) {
        for (let i = 0; i < container.attributes.length; i++) {
          const attr = container.attributes[i];
          if (attr.name !== "v-cloak" && /^(v-|:|@)/.test(attr.name)) {
            compatUtils.warnDeprecation(
              DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
              null
            );
            break;
          }
        }
      }
    }

    // clear content before mounting
    container.innerHTML = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };

  return app;
};
```

ensureRenderer 的内部实现

```js
const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps);

let renderer;
// 惰性的创建渲染器，返回已经创建的渲染器，没有时重新创建
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
```

patchProp 是 patch 方法，nodeOps 是 node 相关操作的方法。创建渲染器时，这些相关方法将会被使用。

关于 createRenderer 的实现，由于混合了更新的相关代码，这里进行了抽离，更新的相关代码下篇文章详细聊聊。现在我们只需要知道，它返回了 render 方法和 createApp 方法

createRenderer 方法的内部实现

```js
export function createRenderer(options) {
  return baseCreateRenderer(options);
}

function baseCreateRenderer(options) {
  // 这些方法将会被使用，但是具体使用的方法省略了
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent,
  } = options;
  // 省略...
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
    container._vnode = vnode;
  };

  return {
    render,
    hydrate,
    createApp: createAppAPI(render /* hydrate */),
  };
}
```

createApp 调用了 createAppAPI 方法，方法内部提供了全局 API

其内部实现如下：

```js
export function createAppAPI(
  render,
  hydrate,
) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent)
    }

    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }

    // 创建应用上下文
    const context = createAppContext()
    // 插件相关
    const installedPlugins = new WeakSet()

    // 初始状态为未mountd状态
    let isMounted = false

    // 应用初始状态
    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,

      version,

      get config() {
        return context.config
      },

      set config(v) {
        if (__DEV__) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`,
          )
        }
      },

      use(plugin: Plugin, ...options: any[]) {
        if (installedPlugins.has(plugin)) {
          __DEV__ && warn(`Plugin has already been applied to target app.`)
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin)
          plugin.install(app, ...options)
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin)
          plugin(app, ...options)
        } else if (__DEV__) {
          warn(
            `A plugin must either be a function or an object with an "install" ` +
              `function.`,
          )
        }
        return app
      },

      mixin(mixin: ComponentOptions) {
        if (__FEATURE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin)
          } else if (__DEV__) {
            warn(
              'Mixin has already been applied to target app' +
                (mixin.name ? `: ${mixin.name}` : ''),
            )
          }
        } else if (__DEV__) {
          warn('Mixins are only available in builds supporting Options API')
        }
        return app
      },

      component(name: string, component?: Component): any {
        if (__DEV__) {
          validateComponentName(name, context.config)
        }
        if (!component) {
          return context.components[name]
        }
        if (__DEV__ && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`)
        }
        context.components[name] = component
        return app
      },

      directive(name: string, directive?: Directive) {
        if (__DEV__) {
          validateDirectiveName(name)
        }

        if (!directive) {
          return context.directives[name] as any
        }
        if (__DEV__ && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`)
        }
        context.directives[name] = directive
        return app
      },

      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        namespace?: boolean | ElementNamespace,
      ): any {
        if (!isMounted) {
          // #5571
          if (__DEV__ && (rootContainer as any).__vue_app__) {
            warn(
              `There is already an app instance mounted on the host container.\n` +
                ` If you want to mount another app on the same host container,` +
                ` you need to unmount the previous app by calling \`app.unmount()\` first.`,
            )
          }
          const vnode = createVNode(rootComponent, rootProps)
          // store app context on the root VNode.
          // this will be set on the root instance on initial mount.
          vnode.appContext = context

          if (namespace === true) {
            namespace = 'svg'
          } else if (namespace === false) {
            namespace = undefined
          }

          // HMR root reload
          if (__DEV__) {
            context.reload = () => {
              // casting to ElementNamespace because TS doesn't guarantee type narrowing
              // over function boundaries
              render(
                cloneVNode(vnode),
                rootContainer,
                namespace as ElementNamespace,
              )
            }
          }

          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            render(vnode, rootContainer, namespace)
          }
          isMounted = true
          app._container = rootContainer
          // for devtools and telemetry
          ;(rootContainer as any).__vue_app__ = app

          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = vnode.component
            devtoolsInitApp(app, version)
          }

          return getComponentPublicInstance(vnode.component!)
        } else if (__DEV__) {
          warn(
            `App has already been mounted.\n` +
              `If you want to remount the same app, move your app creation logic ` +
              `into a factory function and create fresh app instances for each ` +
              `mount - e.g. \`const createMyApp = () => createApp(App)\``,
          )
        }
      },

      unmount() {
        if (isMounted) {
          render(null, app._container)
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = null
            devtoolsUnmountApp(app)
          }
          delete app._container.__vue_app__
        } else if (__DEV__) {
          warn(`Cannot unmount an app that is not mounted.`)
        }
      },

      provide(key, value) {
        if (__DEV__ && (key as string | symbol) in context.provides) {
          warn(
            `App already provides property with key "${String(key)}". ` +
              `It will be overwritten with the new value.`,
          )
        }

        context.provides[key as string | symbol] = value

        return app
      },

      runWithContext(fn) {
        const lastApp = currentApp
        currentApp = app
        try {
          return fn()
        } finally {
          currentApp = lastApp
        }
      },
    })

    if (__COMPAT__) {
      installAppCompatProperties(app, context, render)
    }

    return app
  }
}
```

到这里，我们已经创建了全局应用实例 app、初始化了全局方法，并且知道重新了实例的 mount 方法的来适应不同平台的特性。

接下来详细看看 mount 方法中，是怎么创建 vnode，并且将 vnode 转化为真实 dom 的。

先回到重写 mount 方法的地方，可以发现：

- 1. 使用原始的 mount 方法
- 2.1 而在原始的 mount 方法中，先创建 vnode
- 2.2 然后使用了应用的 render 方法进行渲染。

```js
// 2. 重写实例的 mount 方法
const { mount } = app;
app.mount = (containerOrSelector) => {
  // 省略。。。

  // 重点看这里：使用原始的 mount 方法，并且返回了 getComponentPublicInstance 组件的实例
  const proxy = mount(container, false, resolveRootNamespace(container));

  // 省略。。。

  return proxy;
};
```

原始的 mount 方法大致如下

```js
const
mount(
  rootContainer: HostElement,
  isHydrate?: boolean,
  namespace?: boolean | ElementNamespace,
): any {
  if (!isMounted) {

    // 真正创建vnode的入口
    const vnode = createVNode(rootComponent, rootProps)

    // 将 vnode 渲染到 dom 容器中
    render(vnode, rootContainer, namespace)
    // 注意这个 render 就是前面提到的渲染器，他是作为 createAppAPI 的参数进入 mount 方法中的

    // 返回应用实例
    return getComponentPublicInstance(vnode.component!)
  } else if (__DEV__) {
    warn(
      `App has already been mounted.\n` +
        `If you want to remount the same app, move your app creation logic ` +
        `into a factory function and create fresh app instances for each ` +
        `mount - e.g. \`const createMyApp = () => createApp(App)\``,
    )
  }
}
```

createVNode 内部实现

```js

export const createVNode = (
  __DEV__ ? createVNodeWithArgsTransform : _createVNode
)
// 开发环境下会多一步
const createVNodeWithArgsTransform = (
  ...args
) => {
  return _createVNode(
    ...(vnodeArgsTransformer
      ? vnodeArgsTransformer(args, currentRenderingInstance)
      : args),
  )
}

// 但是最终都是通过下面的函数创建的
// 该函数主要的工作是一些标准化操作和标记操作
function _createVNode(
  type /**节点类型 */,
  props = null /** 属性列表 */,
  children = null /** 子节点 */,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false,
): VNode {
  // 动态组件类型检测
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (__DEV__ && !type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`)
    }
    type = Comment
  }

  // vnode 标准化
  if (isVNode(type)) {
    // createVNode receiving an existing vnode. This happens in cases like
    // <component :is="vnode"/>
    // #2078 make sure to merge refs during the clone instead of overwriting it
    const cloned = cloneVNode(type, props, true /* mergeRef: true */)
    if (children) {
      normalizeChildren(cloned, children)
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & ShapeFlags.COMPONENT) {
        currentBlock[currentBlock.indexOf(type)] = cloned
      } else {
        currentBlock.push(cloned)
      }
    }
    cloned.patchFlag = PatchFlags.BAIL
    return cloned
  }

  // 类组件标准化
  if (isClassComponent(type)) {
    type = type.__vccOpts
  }

  // 兼容 2.x 组件
  if (__COMPAT__) {
    type = convertLegacyComponent(type, currentRenderingInstance)
  }

  // 标准化props
  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    props = guardReactiveProps(props)!
    let { class: klass, style } = props
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
    if (isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style)
      }
      props.style = normalizeStyle(style)
    }
  }

  // shapeFlag 是vnode节点类型标记，更新时优化依据
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : __FEATURE_SUSPENSE__ && isSuspense(type)
      ? ShapeFlags.SUSPENSE
      : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
          ? ShapeFlags.STATEFUL_COMPONENT
          : isFunction(type)
            ? ShapeFlags.FUNCTIONAL_COMPONENT
            : 0

  if (__DEV__ && shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isProxy(type)) {
    type = toRaw(type)
    warn(
      `Vue received a Component that was made a reactive object. This can ` +
        `lead to unnecessary performance overhead and should be avoided by ` +
        `marking the component with \`markRaw\` or using \`shallowRef\` ` +
        `instead of \`ref\`.`,
      `\nComponent that was made reactive: `,
      type,
    )
  }

  // 正在的创建vnode的过程
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true,
  )
}

```

createBaseVNode 内部实现

```js
// 正在的创建vnode的过程
function createBaseVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
  isBlockNode = false,
  needFullChildrenNormalization = false,
) {
  // 初始化 vnode 参数
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance,
  } as VNode

  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children)
    // normalize suspense children
    if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
      ;(type as typeof SuspenseImpl).normalize(vnode)
    }
  } else if (children) {
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN
  }

  // validate key
  if (__DEV__ && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type)
  }

  // track vnode for block tree
  if (
    isBlockTreeEnabled > 0 &&
    // avoid a block node from tracking itself
    !isBlockNode &&
    // has current parent block
    currentBlock &&
    // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
    // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== PatchFlags.NEED_HYDRATION
  ) {
    currentBlock.push(vnode)
  }

  if (__COMPAT__) {
    convertLegacyVModelProps(vnode)
    defineLegacyVNodeProperties(vnode)
  }

  return vnode
}
```

接下来看看 真正 render 的过程。我们将视角再次回到渲染器中。

```js
let isFlushing = false;
const render: RootRenderFunction = (vnode, container, namespace) => {
  // 1. 如果 vnode 不存在，则认为是卸载阶段
  if (vnode == null) {
    if (container._vnode) {
      unmount(container._vnode, null, null, true);
    }
  } else {
    // 2. 否则进入加载阶段
    patch(
      // 4. 将旧参数作为第一个参数，如果没有旧参数则为 null
      // 这是 mount 还是 update 的判断依据
      container._vnode || null,
      // 这是最新的 vnode
      vnode,
      container,
      null,
      null,
      null,
      namespace
    );
  }
  if (!isFlushing) {
    isFlushing = true;
    flushPreFlushCbs();
    flushPostFlushCbs();
    isFlushing = false;
  }
  // 3. 并且将最新的 vnode 放在容器的 _vnode 属性上
  container._vnode = vnode;
};
```

patch 的内部实现

```js

```
