<template>
<div class="dialog-overlay">
  <div class="dialog">
    <div class="dialog__head">
      {{ title }}
      <div class="dialog__close" @click="handleClose">x</div>
    </div>
    <div class="dialog__body">
      确认要删除吗？
    </div>
  </div>
</div>
</template>

<script setup>
defineProps({
  title: String
});

const emit = defineEmits([ 'close' ]);

function handleClose () {
  emit('close');
}
</script>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .1);
}

.dialog {
  position: absolute;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  overflow: hidden;
  border-radius: 8px;

  &__head {
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 700;
    background-color: pink;
    cursor: move;
    user-select: none;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    cursor: pointer;
  }

  &__body {
    padding: 10px;
    background-color: #fff;
  }
}
</style>
