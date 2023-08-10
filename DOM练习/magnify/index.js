;(function (doc) {
  let doms = {},
      oMagnifyBoxWidth,
      oMagnifyBoxHeight;

  const init = () => {
    initData();
    bindEvent();
  };

  const initData = () => {
    doms = getDoms();

    // display为none的元素无法获取到宽高，因此需要先去掉display: none；
    const { oMagnifyBox } = doms;
    oMagnifyBox.classList.remove('hidden');
    oMagnifyBox.style.left = '-10000px';
    oMagnifyBox.style.top = '-10000px';
    oMagnifyBox.style.visibility = 'hidden';
    oMagnifyBox.style.opacity = 0;
    oMagnifyBox.style.pointEvents = 'none';

    // 访问 offsetWidth 或者 offsetHeight 会触发重绘，此时可以拿到元素宽高
    oMagnifyBoxWidth = oMagnifyBox.offsetWidth;
    oMagnifyBoxHeight = oMagnifyBox.offsetHeight;

    // 获取元素宽高厚还原元素属性
    oMagnifyBox.classList.add('hidden');
    oMagnifyBox.style.left = '0px';
    oMagnifyBox.style.top = '0px';
    oMagnifyBox.style.visibility = 'visible';
    oMagnifyBox.style.opacity = 1;
    oMagnifyBox.style.pointEvents = 'all';
  };

  const getDoms = () => {
    const oMagnifyWrap = doc.getElementsByClassName('magnify__wrap')[0],
          oMagnifyBox = oMagnifyWrap.getElementsByClassName('magnify__box')[0],
          oMagnifyBoxImg = oMagnifyWrap.getElementsByClassName('magnify__box-img')[0];

    return {
      oMagnifyWrap,
      oMagnifyBox,
      oMagnifyBoxImg
    };
  };

  const bindEvent = () => {
    const { oMagnifyWrap } = doms;
    oMagnifyWrap.addEventListener('mouseover', handleMouseOver, false);
    oMagnifyWrap.addEventListener('mouseout', handleMouseOut, false);
  };

  const handleMouseOver = (e) => {
    const { oMagnifyBox } = doms;
    moveImgBox(e);
    oMagnifyBox.classList.remove('hidden');
    document.addEventListener('mousemove', handleMouseMove, false);
  };

  const handleMouseMove = (e) => {
    moveImgBox(e);
    shouleHiddenImgBox(e);
  };

  const handleMouseOut = (e) => {
    shouleHiddenImgBox(e);
    document.removeEventListener('mousemove', handleMouseMove, false);
  };

  const moveImgBox = (e) => {
    const { 
      oMagnifyWrap, 
      oMagnifyBox,
      oMagnifyBoxImg
    } = doms,
    mouseX = e.clientX - oMagnifyWrap.offsetLeft,
    mouseY = e.clientY - oMagnifyWrap.offsetTop,
    imgX = mouseX - oMagnifyBoxWidth / 2,
    imgY = mouseY - oMagnifyBoxHeight / 2;

    oMagnifyBox.style.left = imgX + 'px';
    oMagnifyBox.style.top = imgY + 'px';
    oMagnifyBoxImg.style.left = -imgX + 'px';
    oMagnifyBoxImg.style.top = -imgY + 'px';
  };

  const shouleHiddenImgBox = (e) => {
    const { oMagnifyWrap, oMagnifyBox } = doms,
    mouseX = e.pageX - oMagnifyWrap.offsetLeft,
    mouseY = e.pageY - oMagnifyWrap.offsetTop;

    if (
      mouseX < 0
      || mouseX > oMagnifyWrap.offsetWidth
      || mouseY < 0
      || mouseY > oMagnifyWrap.offsetHeight
    ) {
      oMagnifyBox.classList.add('hidden');
    } else {
      oMagnifyBox.classList.remove('hidden');
    }
  };

  init();
})(document);