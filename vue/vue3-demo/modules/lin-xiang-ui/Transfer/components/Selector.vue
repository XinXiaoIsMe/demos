<template>
  <select
    @change="onSelectChange($event.target.value)"
  >
    <option
      v-for="(title, index) in data"
      :key="index"
      :value="index"
    >{{ title }}</option>
  </select>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['change'])

const onSelectChange = (value) => {
  emit('change', value)
}
</script>

<style scoped>

</style>
