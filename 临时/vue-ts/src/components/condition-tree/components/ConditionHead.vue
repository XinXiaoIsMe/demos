<template>
<div class="condition-head" :style="{ paddingLeft, backgroundColor }" @click="setActiveId">
  <el-radio v-model="node.logic" @change="changeLogic" label="and">并且</el-radio>
  <el-radio v-model="node.logic" @change="changeLogic" label="or">或者</el-radio>
  <span class="condition-btn-icon" @click="handleAddNode">
    <el-icon>
      <Plus />
    </el-icon>
    <span>分组</span>
  </span>
  <span class="condition-btn-icon" @click="handleAddCondition">
    <el-icon>
      <Plus />
    </el-icon>
    <span>条件</span>
  </span>
  <Delete v-if="node.level > 0" @click="handleDeleteNode" />
</div>
</template>

<script lang="ts" setup>
import Delete from './Delete.vue'
import type { ConditionNode, ConditionOptions, ConditionItem, ConditionConfig, ConditionLogic } from '../types'
import { inject, reactive, computed } from 'vue';
import ConditionTree from '../model/ConditionTree';

const { node, options, config } = definePropsRefs<{
  node: ConditionNode
  options: ConditionOptions
  config: ConditionConfig
}>()

const store = inject<ConditionTree>('store')!
const paddingLeft = computed(() => `${ config.value.titlePadding * node.value.level }px`)
const backgroundColor = computed(() => node.value.id === store.activeId.value ? config.value.activeColor : '')

const getDefaultCondition = (): ConditionItem => reactive({
  name: options.value.name[0]?.value,
  operator: options.value.operator[0]?.value,
  value: ''
})

const getDefaultNode = (): ConditionNode => {
  const conditions = [ getDefaultCondition() ]
  const level = node.value.level + 1
  return reactive({
    logic: 'and',
    level,
    id: Symbol(level),
    data: {
      logic: 'and',
      conditions
    },
    conditions
  })
}

const changeLogic = (logic: ConditionLogic) => {
  store.changeLogic(node.value.id, logic)
}

const handleDeleteNode = () => {
  store.deleteNode(node.value.id)
}

const handleAddNode = () => {
  store.addNode(node.value as ConditionNode, getDefaultNode())
}

const handleAddCondition = () => {
  store.addCondition(node.value as ConditionNode, getDefaultCondition())
}

const setActiveId = () => {
  store.setActiveId(node.value.id)
}
</script>

<style lang="scss" scoped>
.condition-head {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  margin-bottom: 10px;

  $m-r: 14px;

  :deep(.el-radio) {
    margin-right: $m-r;
    
    .el-radio__label {
      font-size: 16px;
    }
  }

  .condition-btn-icon {
    display: flex;
    align-items: center;
    margin-right: $m-r;
    font-size: 14px;
    color: #409eff;
    cursor: pointer;

    .el-icon {
      margin-right: 4px;
    }
  }
}
</style>
