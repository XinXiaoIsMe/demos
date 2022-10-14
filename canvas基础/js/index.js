;(function (win, doc) {
  const oMask = document.getElementById('JS_mask')
  const maskWidth = oMask.offsetWidth
  const maskHeight = oMask.offsetHeight
  const {
    left: maskOffsetX,
    top: maskOffsetY
  } = oMask.getBoundingClientRect()
  const maskCtx = oMask.getContext('2d')
  const init = () => {
    drawMask()
    bindEvent()
  }
  let flag = false
  let x
  let y

  init()

  function drawMask () {
    maskCtx.fillStyle = 'yellow'
    maskCtx.lineWidth = 30
    maskCtx.lineJoin = 'round'
    maskCtx.lineCap = 'round'
    maskCtx.fillRect(0, 0, maskWidth, maskHeight)
    maskCtx.fillStyle = 'orange'
    maskCtx.font = '50px blod microsoft yahei'
    maskCtx.fillText(
      '拨开云雾见青天',
      (maskWidth - 7 * 50) / 2,
      (maskHeight - 50) / 2
    )
  }

  function bindEvent () {
    oMask.addEventListener('mousedown', onMouseDown)
    doc.addEventListener('mousemove', onMouseMove)
    doc.addEventListener('mouseup', onMouseUp)
  }

  function unbindEvent () {
    oMask.removeEventListener('mousedown', onMouseDown)
    doc.removeEventListener('mousemove', onMouseMove)
    doc.removeEventListener('mouseup', onMouseUp)
  }

  function onMouseDown (e) {
    flag = true
    _setXY(e)
    maskCtx.moveTo(x, y)
  }

  function onMouseMove (e) {
    if (!flag) return
    _setXY(e)
    maskCtx.globalCompositeOperation = 'destination-out'
    maskCtx.lineTo(x, y)
    maskCtx.stroke()
  }

  function onMouseUp () {
    const imgInfo = maskCtx.getImageData(0, 0, maskWidth, maskHeight)
    const {
      data,
      width,
      height
    } = imgInfo
    const len = data.length
    let count = 0

    for (let i = 3; i < len; i += 4) {
      if (data[i] === 0) count ++
    }

    if (count >= width * height * 0.6) {
      for (let i = 3; i < len; i += 4) {
        data[i] = 0
      }
      maskCtx.putImageData(imgInfo, 0, 0)
      unbindEvent()
    }

    flag = false
  }

  function _setXY (e) {
    const evt = e || win.event
    const mouseX = evt.pageX
    const mouseY = evt.pageY

    x = mouseX - maskOffsetX
    y = mouseY - maskOffsetY

    if (x < 0) {
      x = 0
    } else if (x > maskWidth) {
      x = maskWidth
    }

    if (y < 0) {
      y = 0
    } else if (y > maskHeight) {
      y = maskHeight
    }
  }
})(window, document)