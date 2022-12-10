<template>
  <h1 class="list-title">
    <input
      type="checkbox"
      :checked="checked"
      @click="setCheckedAllData($event.target.checked)"
    >
    <span>{{ title }}</span>
  </h1>
</template>

<script setup>
const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题'
  }
})

const emit = defineEmits(['setCheckedAllData'])

const setCheckedAllData = (checked) => {
  emit('setCheckedAllData', checked)
}
</script>

<style scoped>
.list-title {
  display: flex;
  align-items: center;
  height: 38px;
  font-weight: normal;
  margin: 0;
  color: #666;
  border-bottom: 1px solid #ddd;
  background-color: #efefef;
  font-size: 14px;
}
</style>
