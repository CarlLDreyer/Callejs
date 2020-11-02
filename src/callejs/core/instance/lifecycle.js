import { mount } from '../vdom/mount'
import { patch } from '../vdom/patch'
import { watchEffect } from '../observer/reactivity'

export function initLifecycles(Calle) {
  Calle.prototype._init = function(options) {
    Calle.$options = options

    Calle.prototype.$mount = function(containerEl) {
      const el = Calle.$options.el =  document.querySelector(containerEl)
      mountComponent(Calle.$options.component, el)
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

export function mountComponent(component, container) {
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

function callHook(Calle, hook) {
  const handlers = Calle.$options.component[hook]
  // add check if multiple handlers
  if (handlers) {
    handlers.call(Calle.$options.component)
  }
}