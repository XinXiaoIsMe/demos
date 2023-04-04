<script setup lang="ts">
import ConditionTree from './components/condition-tree/index.vue'
import { ConditionData, ConditionOptions } from './components/condition-tree/types';
import data from './data'

const conditionData = $ref<ConditionData>(data as ConditionData)
const options = $ref<ConditionOptions>({
  name: [
    { label: '项目名称', value: '项目名称' },
    { label: '项目地址', value: '项目地址' },
    { label: '项目周期', value: '项目周期' }
  ],
  operator: [
    { label: '等于', value: '=' },
    { label: '不等于', value: '!=' },
    { label: '大于等于', value: '>=' }
  ]
})
const config = {
  titlePadding: 30
}
const conditionTreeRef = $ref<typeof ConditionTree>()

const setActiveId = () => {
  conditionTreeRef!.setActiveId(conditionTreeRef!.store.$data.childNodes[0].id)
}
console.log(conditionData)
</script>

<template>
  <div class="app">
    <ConditionTree ref="conditionTreeRef" :data="conditionData" :options="options" :config="config" />
    <el-button @click="setActiveId">测试手动设置activeId</el-button>
  </div>
</template>

<style lang="scss" scoped>
.app {
  background-color: #fff;

  .el-button {
    margin-top: 20px;
  }
}
</style>
