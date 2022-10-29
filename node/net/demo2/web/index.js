;(function (doc) {
  const oPlusBtn = doc.querySelector('.plus-btn')
  const oMinusBtn = doc.querySelector('.minus-btn')
  const oCounterResult = doc.querySelector('.counter-result')

  oPlusBtn.addEventListener('click', () => {
    const value = Number(oCounterResult.innerText)
    oCounterResult.innerText = value + 1
  })

  oMinusBtn.addEventListener('click', () => {
    const value = Number(oCounterResult.innerText)
    oCounterResult.innerText = value - 1
  })
})(document)