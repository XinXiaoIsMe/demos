<template>
  <div class="condition-list" :style="{ paddingLeft }">
    <div 
      class="condition-list-item"
      v-for="(listItem, index) in list"
      :key="index"
    >
      <el-select v-model="listItem.name">
        <el-option
          v-for="item in options.name"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="listItem.operator">
        <el-option
          v-for="item in options.operator"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="listItem.value" />
      <Delete @click="handleDeleteCondition(node.id, index)" />
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>
  import Delete from './Delete.vue'
  import type { ConditionConfig, ConditionItem, ConditionNode, ConditionOptions } from '../types'
  import { inject, computed } from 'vue';
  import ConditionTree from '../model/ConditionTree';

  const {
    list,
    options,
    node,
    config
  } = definePropsRefs<{
    list: ConditionItem[]
    options: ConditionOptions
    node: ConditionNode
    config: ConditionConfig
  }>()

  const store = inject<ConditionTree>('store')!
  const paddingLeft = computed(() => `${ config.value.titlePadding * node.value.level + config.value.listPadding }px`)

  const handleDeleteCondition = (id: symbol, index: number) => {
    store.deleteCondition(id, index)
  }
  </script>
  
  <style lang="scss" scoped>
  .condition-list {
    &-item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      $m-r: 10px;

      .el-select {
        width: 120px;
        margin-right: $m-r;
      }

      .el-input {
        width: 140px;
        margin-right: $m-r;
      }
    }
  }
  </style>
  