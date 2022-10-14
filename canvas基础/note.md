# 1. canvas元素
```html
<canvas width="300" height="300"></canvas>
```

# 2. 获取上下文
```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') // 参数可以为2d或者webgl
// 注：下面的ctx都是上面声明的ctx，canvas表示canvas的DOM，不再重复声明
```

# 3. 设置画笔
```js
ctx.fillStyle = 'orange' // 设置填充颜色
ctx.strokeStyle = 'orange' // 设置线条颜色
```

# 4. 绘制矩形
```js
ctx.fillRect(左上角x坐标，左上角y坐标，宽，高) // 绘制矩形（实心矩形）
ctx.strokeRect(左上角x坐标，左上角y坐标，宽，高) // 绘制矩形（空心矩形）
ctx.clearRect(左上角x坐标，左上角y坐标，宽，高) // 清除指定的矩形区域
```

# 5. 绘制路径
# 5.1 绘制线条
```js
ctx.beginPath() // 开始绘制
ctx.strokeStyle = 'orange'
ctx.lineWidth = 10 // 设置线宽为10px
ctx.moveTo(50, 50) // 移动画笔位置
ctx.lineTo(100, 100) // 绘制一条直线从（50,50）到（100，100）
ctx.stroke() // 绘制线条
```
绘制一个三角形：
```js
ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(100, 50)
ctx.lineTo(75, 100)
ctx.closePath() // 闭合路径，注意绘制三角形最好使用闭合路径，否则图形无法正常闭合
ctx.stroke()
```
# 5.2 绘制圆弧
```js
ctx.arc(圆心x坐标，圆心y坐标，半径，起始弧度，终止弧度，顺时针(false，默认值)或逆时针(true))
ctx.arcTo(控制点1的x坐标，控制点1的y坐标，控制点2的x坐标，控制点2的y坐标，半径)
```
绘制一个半圆：
```js
ctx.beginPath()
ctx.strokeStyle = 'orange'
ctx.arc(100, 100, 50, 0, Math.PI)
ctx.stroke()
```
绘制一段圆弧：
```js
ctx.beginPath()
ctx.strokeStyle = 'orange'
ctx.moveTo(150, 50)
ctx.arcTo(150, 100, 75, 75, 30)
ctx.stroke()
```
# 5.3 贝塞尔曲线
```js
// 二次贝塞尔曲线
ctx.quadraticCurveTo(控制点x坐标，控制点y坐标，终点x坐标，终点y坐标)
// 三次贝塞尔曲线
ctx.bezierCurveTo(控制点1x坐标，控制点1y坐标，控制点2x坐标，控制点2y坐标，终点x坐标，终点y坐标)
```

# 6. 移动画布
```js
ctx.translate(x方向平移距离，y方向平移距离)
```

# 7. 保存画布状态
```js
ctx.save()
```

# 8. 还原上次保存的状态
```js
ctx.restore()
```
小案例：
```js
ctx.fillStyle = 'orange'
ctx.fillRect(0, 0, 30, 30) // 矩形1
ctx.save() // 缓存当前画布状态
ctx.translate(50, 50) // 画布向右平移50px，向下平移50px
ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 30, 30) // 矩形2 此时绘制的矩形2和矩形1水平方向相距50px，垂直方向相距50px
ctx.restore() // 还原之前状态
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, 30, 30) // 矩形3 此时的矩形3会覆盖矩形1
```

# 9. 缩放
```js
ctx.scale(x方向缩放，y方向缩放)
```

# 10. 旋转
```js
ctx.rotate(角度) // 相对于画布左上角顶点旋转
```

# 11. 变换
```js
ctx.transform(水平方向的缩放，垂直方向的倾斜偏移，水平方向的倾斜偏移，垂直方向的缩放，水平方向的移动，垂直方向的移动)

ctx.setTransform(水平方向的缩放，垂直方向的倾斜偏移，水平方向的倾斜偏移，垂直方向的缩放，水平方向的移动，垂直方向的移动)

// 注：transform 和 setTransform的区别在于后者始终从画布初始状态开始变换，前者从画布当前状态开始变换
```

# 12. 填充图案
```js
const img = new Image()
img.src = '图片路径'
img.onload = function () {
  const pattern = ctx.createPattern(img, 'no-repeat') // 创建pattern，第一个参数也可以是canvas实例
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, 100, 100)
}
```

# 13. 渐变
线性渐变：类似于css3的线性渐变
```js
const gradient = ctx.createLinearGradient(0, 0, 100, 0) // 创建一个线性渐变实例，参数分别为起始点坐标和终点坐标
gradient.addColorStop(0, 'red') // 指定颜色和颜色开始位置，第一个参数为0到1的数字，第二个参数为颜色字符串
gradient.addColorStop(1, 'green')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, 100, 100)
```
径向渐变：
```js
const gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100) // 创建一个径向渐变实例，参数为两个圆的圆心坐标和半径
gradient.addColorStop(0, 'red') // 指定颜色和颜色开始位置，第一个参数为0到1的数字，第二个参数为颜色字符串
gradient.addColorStop(1, 'green')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, 200, 200)
```

# 14. 阴影
```js
ctx.shadowColor = 'pink' // 设置阴影颜色
ctx.shadowOffsetX = 30 // 设置阴影x方向偏移量
ctx.shadowOffsetY = 30 // 设置阴影y方向偏移量
ctx.shadowBlur = 30 // 设置阴影模糊距离
ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 100)
```

# 15. 添加文字
```js
ctx.fillStyle = 'red'
ctx.font = '50px sans-serif' // 设置字体大小和字体类型
ctx.fillText('Hello world!', 50, 50) // 填充文字，参数分别为文字内容、开始坐标
```

# 16. 线条端点样式
```js
ctx.moveTo(50, 50)
ctx.lineWidth = 50
ctx.lineTo(200, 200)
ctx.lineCap = 'round' // 设置线条端点样式：round(圆角)、square(正方形)、butt(默认样式),cap有帽子的意思，所以可以理解成给线条戴上一顶帽子，帽子半径是线条宽度一半，所以设置了lineCap，不为butt的情况下线条长度会增加lineWidth的长度
ctx.stroke()
```

# 17. 线条连接点样式
```js
ctx.moveTo(50, 50)
ctx.lineWidth = 50
ctx.lineJoin = 'bevel' // bevel: 斜面，类似折纸的折角，round：圆角
ctx.lineTo(200, 200)
ctx.lineTo(50, 300)
ctx.stroke()
```

# 18. 裁剪
```js
ctx.fillStyle = 'red'
ctx.arc(100, 100, 50, Math.PI * 2, false)
ctx.stroke()
ctx.clip() // 裁剪
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, 100, 100)
```

# 19. 绘制图片到画布
```js
const img = new Image()
img.src = '图片路径'
img.onload = function () {
  ctx.drawImage(img, 0, 0, 100, 100, 0, 0, 100, 100) // 参数表示：图片实例，图片截取起始坐标，截取宽高，绘制在画布上的起始位置，宽高
}
// 注：如果只给了前3个参数，则表示只指定绘制起始点，不做截取，如果只给了5个参数，则表示指定起始点和最终绘制到画布上的图片的宽高，通常可用这个方法对图片进行缩放。
```

# 20. 转化画布为base64
```js
const dataURL = canvas.toDataURL() // 返回base64
```

# 21. 查看某个点是否在路径上
```js
ctx.rect(30, 30, 100, 100) // 注意这里需要是路径，因此使用rect方法，不能使用fillRect
ctx.fill()
const point = [50, 50]
const isPointInPath = ctx.isPointInPath(...point) // 查看（50,50）这个点是否在画布路径区域上,这里返回true
const isPointInStroke = ctx.isPointInStroke(...point) // 也可以使用isPointInStroke判断是否在描边上，这里返回false
```

# 22. 获取指定区域的canvas画布数据
```js
const data = ctx.getImageData(50, 50, 100, 100) // 从（50，50）开始获取宽高分别为100的区域数据
```

# 23. 注入数据到canvas
```js
const data = ctx.getImageData(50, 50, 100, 100) // 从（50，50）开始获取宽高分别为100的区域数据
ctx.putImageData(data, 200, 200) // 将数据注入到（200,200）这个位置
```

# 24. globalCompositeOperation
用于改变图形绘制时的合成操作：
```js
ctx.globalCompositeOperation = 'source-in' // 只绘制两个图形重叠的部分
```
