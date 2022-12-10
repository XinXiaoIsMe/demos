<template>
  <div>
    <div
      v-for="item in data"
      :key="item.id"
      :draggable="!item.disabled"
      :class="['list-item', item.disabled ? 'disabled' : '']"
      @dragstart="draggedItem(item)"
    >
      <input
        type="checkbox"
        :disabled="item.disabled"
        :id="'__checkbox__' + item.id"
        :checked="item.checked"
        @click="setCheckedData($event.target.checked, direction, item)"
      />
      <label :for="'__checkbox__' + item.id">{{ item.phone_name }}</label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  direction: {
    type: String,
    default: 'left'
  }
})

const emit = defineEmits(['setCheckedData', 'draggedItem'])

const setCheckedData = (checked, direction, item) => {
  emit('setCheckedData', checked, direction, item)
}

const draggedItem = (item) => {
  emit('draggedItem', item)
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 12px;
  color: #666;

  &.disabled {
    opacity: .6;
  }
}
</style>
