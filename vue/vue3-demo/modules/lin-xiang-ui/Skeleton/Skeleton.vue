<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { provide, computed } from 'vue';
import { VISIBLE } from './injection-keys';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

provide(VISIBLE, computed(() => props.visible));
</script>
