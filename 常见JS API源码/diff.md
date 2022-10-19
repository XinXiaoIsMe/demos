# API层面
1. watch: 新增flush属性，默认情况下当数据修改触发组件重新渲染时，会先触发数据对应的watch，此时watch里面对应的是重新渲染之前的组件实例，将flush改成true则watch会在组件渲染之后执行
```js
  watch: {
    msg: {
      handler () {},
      flush: true
    }
  }
```
2. expose: Vue2中得到组件实例后可以访问组件所有属性方法，Vue3通过expose限制可以通过组件实例访问的属性和方法
```js
export default {
  expose: ['msg'] // 只能访问msg
}
```
3. emits: Vue3中通过emits表明注册在组件上的事件，类似props。不同的是emits是可选的
4. v-model: 默认