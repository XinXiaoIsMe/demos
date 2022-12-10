<template>
<div>
  <div>
    <Selector
      :data="options"
      @change="setTargetIndex"
    />
  </div>
  <div class="transfer">
    <div
      class="box left-list"
      @dragover.prevent
      @drop="removeRightListData([ draggedItem ])"
    >
      <ListTitle
        :title="leftTitle"
        :checked="checkedAllData.left"
        @setCheckedAllData="setCheckedAllData($event, 'left', leftListData)"
      />
      <ListItem
        direction="left"
        :data="leftListData"
        @setCheckedData="setCheckedData"
        @dragged-item="setDraggedItem"
      />
    </div>
    <ButtonGroup
      :disabledState="transferButtonDisabled"
      @left-button-click="removeRightListData(checkedData.right)"
      @right-button-click="addRightListData(checkedData.left)"
    />
    <div
      class="box right-list"
      @dragover.prevent
      @drop="addRightListData([ draggedItem ])"
    >
      <ListTitle
        :title="rightTitle"
        :checked="checkedAllData.right"
        @setCheckedAllData="setCheckedAllData($event, 'right', rightListData)"
      />
      <ListItem
        direction="right"
        :data="rightListData"
        @setCheckedData="setCheckedData"
        @dragged-item="setDraggedItem"
      />
    </div>
  </div>
</div>
</template>

<script setup>
import Selector from './components/Selector'
import ListTitle from './components/ListTitle'
import ListItem from './components/ListItem'
import ButtonGroup from './components/ButtonGroup'

import propsDefinition from './extends/props'
import {
  useTargetIndex,
  useComputedData,
  useRightListData,
  useCheckedData,
  useDragged
} from './extends/hooks'

const props = defineProps(propsDefinition)
const options = props.data.map(({ title }) => title)

const [ targetIndex, setTargetIndex ] = useTargetIndex(0)

const [
  checkedData,
  checkedAllData,
  addCheckedData,
  removeCheckedData,
  setCheckedAllData
] = useCheckedData()

const [
  rightListData,
  addRightListData,
  removeRightListData
] = useRightListData([], checkedData, checkedAllData)

const [
  draggedItem,
  setDraggedItem
] = useDragged()

const {
  leftTitle,
  leftListData,
  transferButtonDisabled
} = useComputedData(props.data, targetIndex, rightListData, checkedData)

const setCheckedData = (checked, leftOrRight, item) => {
  item.checked = checked
  checked
    ? addCheckedData(leftOrRight, item, leftListData, rightListData)
    : removeCheckedData(leftOrRight, item.id, leftListData, rightListData)
}
</script>

<style lang="scss" scoped>
.transfer {
  display: flex;
  width: 360px;
  height: 300px;
  border: 1px solid #ddd;

  .box {
    width: 120px;
    height: 100%;
  }
}
</style>
