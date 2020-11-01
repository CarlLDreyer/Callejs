import Calle from './callejs/calle'
import { PoopClicker } from './views/PoopClicker';
import './main.scss'

new Calle({
  component: PoopClicker,
}).$mount('#app')
