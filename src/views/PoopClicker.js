import { h, reactive } from '../callejs/calle'
import './PoopClicker.scss'

export const PoopClicker = {
  data: reactive({
    poop: 0,
    perSecond: 0,
    cursorPrice: 25,
  }),
  mounted() {
    this.loadLocalData()
    this.addPerSecondPoop()
  },
  beforeDestroy() {
    let poop = {
      poop: this.data.poop,
      perSecond: this.data.perSecond,
      cursorPrice: this.data.cursorPrice
    }
    localStorage.setItem('localPoop', JSON.stringify(poop))
  },
  loadLocalData() {
    // Not optimal when opening multiple windows
    let localObject = localStorage.getItem('localPoop')
    if (localObject) {
      const { poop, perSecond, cursorPrice } = JSON.parse(localObject)
      this.data.poop = poop
      this.data.perSecond = perSecond
      this.data.cursorPrice = cursorPrice
    }
  },
  handlePoopClick() {
    this.toggleClickedClass()
    this.data.poop++
  },
  addPerSecondPoop() {
    setInterval(() => {
      this.data.poop += this.data.perSecond
    }, 1000)
  },
  toggleClickedClass() {
    const el = document.querySelector('.poop')
    if(!el.classList.value.includes('clicked')) {
      el.classList.toggle('clicked')
      setTimeout(() => {
        el.classList.toggle('clicked')
      }, 100)
    }
  },
  buyStoreItem() {
    const validPurchase = this.data.poop >= this.data.cursorPrice
    if (validPurchase) {
      this.data.poop -= 25
      this.data.perSecond += 1
      this.data.cursorPrice += this.data.cursorPrice
    }
  },
  render() {
    // V-nodes
    return h('div', { class: 'poop-clicker-container' }, [
      h('div', { class: 'poop-clicker' }, [
        h('div', { class: 'poop-header' }, [
          h('span', { class: 'poops-total' }, `${String(this.data.poop)} poops`),
          h('span', { class: 'poop-seconds' }, `${String(this.data.perSecond)} per second`)
        ]),
        h('div', {
          class: 'poop',
          onClick: () => {
            this.handlePoopClick()
          }
        }, '')
      ]),
      h('div', { class: 'poop-store-wrapper'}, [
        h('div', { class: 'poop-store' }, [
          h('div', { class: 'store-header' }, [
            h('span', { class: 'store-title' }, 'Poop store')
          ]),
          h('div', { class: 'store' }, [
            h('div', {
              class: 'store-item',
              onClick: () => {
                this.buyStoreItem()
              }
            }, [
              h('span', { class: 'item-img' }, ''),
              h('div', { class: 'item-text' }, [
                h('span', { class: 'item-title' }, 'Cursor'),
                h('span', { class: 'item-price'}, `${ this.data.cursorPrice } Cookies`)
              ])
            ])
          ])
        ])
      ])
    ])
  }
}