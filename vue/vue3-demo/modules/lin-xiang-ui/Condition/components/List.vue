<template>
<div class="lx-condition__list">
  <div
    class="lx-condition__list-item"
  >
    <select>
      <option value="姓名">姓名</option>
      <option value="年龄">年龄</option>
    </select>
    <select>
      <option value="=">等于</option>
      <option value="!=">不等于</option>
    </select>
    <input type="text" />
    <Delete />
  </div>
</div>
</template>

<script setup>
import Delete from './Delete.vue'
</script>

<style lang="scss" scoped>
.lx-condition__list {
  margin-top: 10px;

  &-item {
    display: flex;
    align-items: center;
    
    select {
      width: 100px;
      height: 30px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
    }

    input {
      margin-right: 10px;
      height: 30px;
      padding: 0;
      outline: none;
      text-indent: 1em;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
}
</style>
