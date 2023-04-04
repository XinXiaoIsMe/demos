<template>
  <div>
    <ConditionHead
      :node="data"
      :options="options"
      :config="config"
    />
    <ConditionList 
      :node="data"
      :list="data.conditions"
      :options="options"
      :config="config"
    />
    <div v-if="data.childNodes">
      <ConditionNode
        v-for="child in data.childNodes"
        :key="child.id"
        :data="child"
        :options="options"
        :config="config"
      ></ConditionNode>
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>
  import { ConditionConfig, ConditionNode as ConditionNodeType, ConditionOptions } from '../types';
  import ConditionHead from './ConditionHead.vue'
  import ConditionList from './ConditionList.vue'

  defineProps<{
    data: ConditionNodeType
    options: ConditionOptions
    config: ConditionConfig
  }>()
  </script>
  
  <style scoped>
  
  </style>
  