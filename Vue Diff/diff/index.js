import { createElement, render } from './vdom.js'
import domDiff from './patch.js'

const vDom = createElement(
  'ul',
  {
    class: 'list',
    style: 'width: 300px;height: 300px;background-color: orange;'
  },
  [
    createElement(
      'li',
      {
        class: 'item',
        'data-id': '0'
      },
      [
        createElement(
          'p',
          {
            class: 'text'
          },
          ['第1个列表项']
        )
      ]
    ),
    createElement(
      'li',
      {
        class: 'item',
        'data-id': '1'
      },
      [
        createElement(
          'p',
          {
            class: 'text'
          },
          [
            createElement(
              'span',
              {
                class: 'title'
              },
              ['第2个列表项']
            )
          ]
        )
      ]
    ),
    createElement(
      'li',
      {
        class: 'item',
        'data-id': '2'
      },
      ['第3个列表项']
    )
  ]
)

const vDom2 = createElement(
  'ul',
  {
    class: 'wrap'
  },
  [
    createElement(
      'li',
      {
        class: 'item',
        'data-id': '0'
      },
      [
        createElement(
          'p',
          {
            class: 'text'
          },
          ['特殊列表项']
        )
      ]
    ),
    createElement(
      'li',
      {
        class: 'item',
        'data-id': '1'
      },
      [
        createElement(
          'p',
          {
            class: 'text'
          },
          []
        )
      ]
    ),
    createElement(
      'div',
      {
        class: 'item',
        'data-id': '2'
      },
      ['第3个列表项']
    )
  ]
)

const container1 = document.getElementById('before-diff')
const container2 = document.getElementById('after-diff')
const container3 = document.getElementById('app')
render(vDom, container1)
render(vDom, container2)
render(vDom2, container3)
domDiff(vDom, vDom2, container2.children[0])