<template>
<div class="lx-condition__title" @click="handleClick">
  <div 
    :class="[
      'lx-condition__expand',
      { 'is-expanded': expanded }
    ]"
  ></div>
  <label for="and" class="lx-condition__logic">
    <input
      v-model="logic"
      type="radio"
      id="and"
      name="logic"
      value="and"
      @change="handleChange"
    />
    <span>并且</span>
  </label>
  <label for="or" class="lx-condition__logic">
    <input
      v-model="logic"
      type="radio"
      id="or"
      name="logic"
      value="or"
      @change="handleChange"
    />
    <span>或者</span>
  </label>
  <span class="lx-condition__span">+分组</span>
  <span class="lx-condition__span">+条件</span>
  <Delete />
</div>
</template>

<script setup>
import { ref } from 'vue'
import Delete from './Delete.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'and'
  }
})

const emit = defineEmits([ 'update:modelValue' ])

const logic = ref(props.modelValue)
const expanded = ref(false)

const handleClick = () => {
  expanded.value = !expanded.value
}

const handleChange = () => {
  emit('update:modelValue', logic.value)
}
</script>

<style lang="scss" scoped>
.lx-condition__title {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;

  .lx-condition__expand {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px;
    border-color: transparent transparent #ccc transparent;
    transition: transform .5s;
    margin-top: -4px;
    transform-origin: 50% 75%;
    
    &.is-expanded {
      transform: rotate(180deg);
    }
  }

  .lx-condition__logic {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;

    input {
      margin: 0;
      margin-right: 4px;
    }
  }

  .lx-condition__span {
    color: skyblue;
    font-size: 12px;
    margin-left: 10px;
    cursor: pointer;
  }

  .lx-condition__delete {
    margin-left: 10px;
  }
}
</style>
