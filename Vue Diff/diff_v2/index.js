import { createElement as h, render } from './vdom.js'
import patch from './patch.js'

const vDom = h(
  'ul',
  { class: 'list' },
  1,
  [
    h(
      'li',
      {},
      2,
      'A'
    ),
    h(
      'li',
      {},
      3,
      'B'
    ),
    h(
      'li',
      {},
      4,
      'C'
    )
  ]
)

const vDom2 = h(
  'ul',
  { class: 'list' },
  1,
  [
    h(
      'li',
      {},
      4,
      'C'
    ),
    h(
      'li',
      {},
      3,
      'B'
    ),
    h(
      'li',
      {},
      2,
      'A'
    )
  ]
)

const container1 = document.getElementById('diff')
const container2 = document.getElementById('app')
const oStartBtn = document.getElementById('start-diff')

render(vDom, container1)
render(vDom2, container2)
oStartBtn.addEventListener('click', function () {
  patch(vDom2, vDom)
  container2.style.display = 'block'
})