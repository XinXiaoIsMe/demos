<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabPane } from './components/tabs'
import type { TabInfo } from './components/tabs/types'
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

const activeTab = ref('name')
const show = ref(true)
const handleTabChange = (tab: TabInfo) => {
  console.log(tab)
}
</script>

<template>
  <div class="app">
    <ConditionTree ref="conditionTreeRef" :data="conditionData" :options="options" :config="config" />
    <el-button @click="setActiveId">测试手动设置activeId</el-button>
    <hr>
    <Tabs v-model="activeTab" @change="handleTabChange">
      <TabPane label="姓名" name="name">
        <span>张阿三</span>
      </TabPane>
      <TabPane label="年龄" name="age">
        <span>17</span>
      </TabPane>
      <TabPane label="爱好" name="hobby" v-if="show">
        <span>打游戏</span>
      </TabPane>
    </Tabs>
    <button @click="() => show = false">hidden</button>
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
