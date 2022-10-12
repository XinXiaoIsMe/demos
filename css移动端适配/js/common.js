;(function (doc) {
  var oMenuBtn = doc.querySelector('.header .nav-btn')
  var oNav = doc.querySelector('.header .nav')

  var init = function () {
    setFontSize()
    bindEvent()
  }

  var bindEvent = function () {
    window.addEventListener('resize', setFontSize)
    oMenuBtn.addEventListener('click', showNav)
  }

  var setFontSize = function () {
    var cWidth = doc.documentElement.clientWidth

    if (cWidth <= 414) {
      doc.documentElement.style.fontSize = cWidth / 37.5 + 'px'
    } else {
      var fontSize = doc.documentElement.style.fontSize
      if (fontSize !== '62.5%') {
        doc.documentElement.style.fontSize = '62.5%'
      }
    }

    if (cWidth > 768) {
      oNav.style.display = 'block'
    } else {
      oNav.style.display = 'none'
    }
  }

  var showNav = function () {
    var isShow = oNav.style.display

    if (isShow === 'none') {
      oNav.style.display = 'block'
    } else {
      oNav.style.display = 'none'
    }
  }

  init()
})(document)
