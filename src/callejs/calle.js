// vdom
export function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  }
}

function mount(vnode, container) {
  const el = vnode.el = document.createElement(vnode.tag)
  // props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }
  // children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(child => {
        mount(child, el)
      })
    }
  }
  container.appendChild(el)
}

/* n1 is the old snapshot of the DOM
* n2 is the new snapshot of the DOM
* patch function figures out least amount of dom changes to achieve the n2 dom
* needs four branches = n1 has props n2 doesn't etc etc 
**/
function patch(n1, n2) {
  if (n1.tag === n2.tag) {
    // props
    const el = n2.el = n1.el
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    for (const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      // only update if value has changed
      if (newValue !== oldValue) {
        el.setAttribute(key, newValue)
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }
    // children
    const oldChildren = n1.children
    const newChildren = n2.children
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren != oldChildren) {
          el.textContent = newChildren
        }
      } else {
        el.textContent = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') {
        el.innerHTML = ''
        newChildren.forEach(child => {
          mount(child, el)
        })
      }
      else {
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for (let i = 0; i< commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach(child => {
            mount(child, el)
          })
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach(child => {
            el.removeChild(child.el)
          })
        }
      }
    }
  } else {
    const el = n1.el = n2.el
    const newProps = n2.props || {}
    for (const key in newProps) {
      newValue = newProps[key]
      el.setAttribute(key, value)
    }
    const newChildren = n2.children
    if (typeof newChildren === 'string') {
      el.textContent = newChildren
    } else {
      newChildren.forEach(child => {
        mount(child, el)
      })
    }
  }
}

// reactivity
let activeEffect

class Dep {
  subscribers = new Set()

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const targetMap = new WeakMap()

function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

const reactiveHandlers = {
  get(target, key, receiver) {
    const dep = getDep(target, key)
    dep.depend()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key)
    const result = Reflect.set(target, key, value, receiver)
    dep.notify()
    return result
  }
}

export function reactive(raw) {
  return new Proxy(raw, reactiveHandlers)
}

// mount
export function mountApp(component, container) {
  let isMounted = false
  let prevVdom
  watchEffect(() => {
    if(!isMounted) {
      prevVdom = component.render()
      mount(prevVdom, container)
      isMounted = true
    } else {
      const newVdom = component.render()
      patch(prevVdom, newVdom)
      prevVdom = newVdom
    }
  })
}

function Calle (options) {
  this._init(options)
}

initMount(Calle)

function initMount(Calle) {
  Calle.prototype._init = function(options) {
    Calle.$options = options

    Calle.prototype.$mount = function(containerEl) {
      const el = Calle.$options.el =  document.querySelector(containerEl)
      mountApp(Calle.$options.component, el)
      initBeforeDestroy(Calle)
      callHook(Calle, 'mounted')
    }
  }
}

function initBeforeDestroy(Calle) {
  window.addEventListener('beforeunload', function() {
    callHook(Calle, 'beforeDestroy')
  })
}

function callHook(Calle, hook) {
  const handlers = Calle.$options.component[hook]
  // add check if multiple handlers
  if (handlers) {
    handlers.call(Calle.$options.component)
  }
}

export default Calle;