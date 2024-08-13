<template>
  <button
    class="uds-button"
    :class="[
      plain ? 'is-plain' : '',
      type ? `uds-button--${ type }` : ''
    ]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: 'primary' | 'success' | 'warning';
  plain?: boolean;
}>();
</script>
