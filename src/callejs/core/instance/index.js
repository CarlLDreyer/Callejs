import { initLifecycles } from './lifecycle'

function Calle (options) {
  if (!(this instanceof Calle)) {
    console.warn('Calle is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initLifecycles(Calle)

export default Calle