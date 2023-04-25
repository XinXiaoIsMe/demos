<template>
  <div class="tabs">
    <div class="tabs-hd">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="[
          'tabs-hd__item',
          {
            'is-active': modelValue === tab.name
          }
        ]"
        @click="handleTabClick(tab)"
      >{{ tab.label }}</div>
    </div>
    <div class="tabs-bd">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots, provide, toRefs } from 'vue'
import { tabInject } from './inject'
import type { TabInfo } from './types'

const props = defineProps<{
  modelValue: string | number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', name: string | number): void
  (e: 'change', tabInfo: TabInfo): void
}>()
const { modelValue } = toRefs(props)
const slots = useSlots()
const tabs = computed(() => {
  return (slots.default?.().filter(item => item.props).map((item, index) => ({ name: index, ...item.props })) || []) as TabInfo[]
})

const handleTabClick = (tab: TabInfo) => {
  emit('update:modelValue', tab.name)
  emit('change', tab)
}

provide(tabInject, modelValue)
</script>

<style lang="scss" scoped>
.tabs {
  &-hd {
    display: flex;
    border-bottom: 2px solid blue;
  }

  &-hd__item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;

    &.is-active {
      background-color: orange;
    }
  }
}
</style>
