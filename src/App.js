import { h } from './callejs/core/vdom/h'

export const App = {
  render() {
    return(
      h('div', { class: 'test'}, 'test')
    )
  }
}

// export const App = {
//   render() {
//     return (
//       <div class="test">

//       </div>
//     )
//   }
// }