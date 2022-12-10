<template>
<div class="box button-group">
  <button
    :disabled="disabledState.left"
    @click="onButtonClick('left')"
  >&lt;</button>
  <button
    :disabled="disabledState.right"
    @click="onButtonClick('right')"
  >&gt;</button>
</div>
</template>

<script setup>
const props = defineProps({
  disabledState: {
    type: Object,
    default: () => ({
      left: true,
      true: true
    })
  }
})

const emit = defineEmits(['leftButtonClick', 'rightButtonClick'])

const onButtonClick = (direction) => {
  switch (direction) {
    case 'left':
      emit('leftButtonClick')
      break
    case 'right':
      emit('rightButtonClick')
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

  button {
    border: none;
    outline: none;
    width: 38px;
    height: 38px;
    background-color: orange;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:first-child {
      margin-right: 10px;
    }

    &:disabled {
      opacity: .6;
      cursor: not-allowed;
    }
  }
}
</style>
