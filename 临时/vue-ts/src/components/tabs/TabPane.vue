<template>
  <div class="tab-pane" v-show="show">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, Ref } from 'vue'
import { tabInject } from './inject'

const props = defineProps<{
  name?: string
  label: string
}>()

const activeTab = inject<Ref<string | number>>(tabInject)!
const show = computed(() => activeTab.value === props.name)
</script>
