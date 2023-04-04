<template>
<div class="condition-tree">
  <ConditionNode :data="store.$data" :options="options" :config="config" />
</div>
</template>

<script lang="ts" setup>
import ConditionNode from './components/ConditionNode.vue'
import ConditionTree from './model/ConditionTree'
import type { ConditionConfig, ConditionData, ConditionOptions } from './types'
import { provide } from 'vue'
import { config as defaultConfig } from './config'

const { data, config: userConfig, activeId } = defineProps<{
  data: ConditionData
  options: ConditionOptions
  config?: Partial<ConditionConfig>
  activeId?: symbol
}>()

const store = new ConditionTree(data)
const config = {
  ...defaultConfig,
  ...userConfig
}

const setActiveId = (id: symbol) => store.setActiveId(id)

provide('store', store)
activeId && setActiveId(activeId)
console.log(store)

defineExpose({
  setActiveId,
  store
})
</script>

<style lang="scss" scoped>
.condition-tree {
  background-color: #fff;
  padding: 10px;
}
</style>
