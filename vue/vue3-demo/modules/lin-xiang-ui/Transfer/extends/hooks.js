import { 
  computed,
  reactive,
  ref
} from 'vue'

export function useTargetIndex (initialIndex) {
  const targetIndex = ref(initialIndex)

  function setTargetIndex (index) {
    targetIndex.value = Number(index)
  }

  return [
    targetIndex,
    setTargetIndex
  ]
}

export function useCheckedData () {
  const checkedData = reactive({
    left: [],
    right: []
  })

  const checkedAllData = reactive({
    left: false,
    right: false
  })

  const addCheckedData = (leftOrRight, checkedItem, leftListData, rightListData) => {
    switch (leftOrRight) {
      case 'left':
        checkedData.left.push(checkedItem)
        checkedAllData.left = leftListData.value.every(item => item.disabled || item.checked)
        break
      case 'right':
        checkedData.right.push(checkedItem)
        checkedAllData.right = rightListData.value.every(item => item.disabled || item.checked)
        break
      default:
        break
    }
  }

  const removeCheckedData = (leftOrRight, checkedId, leftListData, rightListData) => {
    switch (leftOrRight) {
      case 'left':
        checkedData.left = checkedData.left.filter(item => item.id !== checkedId)
        checkedAllData.left = leftListData.value.every(item => item.disabled || item.checked)
        break
      case 'right':
        checkedData.right = checkedData.right.filter(item => item.id !== checkedId)
        checkedAllData.right = rightListData.value.every(item => item.disabled || item.checked)
        break
      default:
        break
    }
  }

  const setCheckedAllData = (checked, leftOrRight, listData) => {
    listData.forEach(item => !item.disabled && (item.checked = checked))
    checkedData[leftOrRight] = checked ? listData.filter(item => !item.disabled) : []
    checkedAllData[leftOrRight] = checked
  }

  return [
    checkedData,
    checkedAllData,
    addCheckedData,
    removeCheckedData,
    setCheckedAllData
  ]
}

export function useRightListData (initialData, checkedData, checkedAllData) {
  const rightListData = ref(initialData)

  function addRightListData (newData) {
    newData.forEach(item => item.checked = false)
    rightListData.value = [
      ...rightListData.value,
      ...newData
    ]
    checkedData.left = []
    checkedAllData.left = false
  }

  function removeRightListData (newData) {
    newData.forEach(item => item.checked = false)
    newData.forEach(newItem => {
      rightListData.value = rightListData.value.filter(item => item.id !== newItem.id)
    })
    checkedData.right = []
    checkedAllData.right = false
  }

  return [
    rightListData,
    addRightListData,
    removeRightListData
  ]
}

export function useDragged () {
  const draggedItem = ref(null)

  const setDraggedItem = (item) => {
    draggedItem.value = item
  }

  return [
    draggedItem,
    setDraggedItem
  ]
}

export function useComputedData (data, targetIndex, rightListData, checkedData) {
  const leftTitle = computed(() => data[targetIndex.value].title)

  const leftListData = computed(() => {
    const { data: currentData } = data[targetIndex.value]

    return currentData.filter(item => {
      if (!rightListData.value.find(({ id }) => item.id === id)) {
        item.checked = false
        return true
      }
    })
  })

  const transferButtonDisabled = computed(() => ({
    left: checkedData.right.length === 0,
    right: checkedData.left.length === 0
  }))

  return {
    leftTitle,
    leftListData,
    transferButtonDisabled
  }
}
