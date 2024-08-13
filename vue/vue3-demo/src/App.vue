<script setup>
import { ref } from 'vue';
import { SkeletonItem } from '../modules/lin-xiang-ui';
// import CollapseTransition from './components/CollapseTransition.vue';

// const data = ref([
//   {
//     title: '华为',
//     data: [
//       {
//         id: 1,
//         phone_name: 'Mate 40 Pro',
//         disabled: false
//       },
//       {
//         id: 2,
//         phone_name: 'P40 Pro',
//         disabled: true
//       },
//       {
//         id: 3,
//         phone_name: 'P50 Pro',
//         disabled: false
//       },
//       {
//         id: 4,
//         phone_name: 'Mate Xs 2',
//         disabled: false
//       },
//     ]
//   },
//   {
//     title: 'OPPO',
//     data: [
//       {
//         id: 5,
//         phone_name: 'OPPO R17',
//         disabled: false
//       },
//       {
//         id: 6,
//         phone_name: 'OPPO R11',
//         disabled: true
//       },
//       {
//         id: 7,
//         phone_name: 'OPPO R9s',
//         disabled: false
//       },
//       {
//         id: 8,
//         phone_name: 'OPPO Reno',
//         disabled: false
//       },
//     ]
//   },
//   {
//     title: '小米',
//     data: [
//       {
//         id: 9,
//         phone_name: '小米m1',
//         disabled: false
//       },
//       {
//         id: 10,
//         phone_name: '小米OnePlus',
//         disabled: true
//       },
//       {
//         id: 11,
//         phone_name: '小米Pro',
//         disabled: false
//       },
//       {
//         id: 12,
//         phone_name: '小米mix',
//         disabled: false
//       },
//     ]
//   }
// ])

// const show = ref(false)

const visible = ref(true);

setTimeout(() => {
  visible.value = false;
}, 10000);
</script>

<template>
  <div id="app">
    <!-- <Transfer
      :data="data"
      right-title="已选择机型"
    />
    <Condition />
    <CollapseTransition>
      <ul v-if="show">
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    </CollapseTransition>
    <button @click="() => show = !show">TOGGLE</button>
    <hr /> -->
    <Skeleton :visible="visible">
      <div>
        <SkeletonItem>
          <div>123</div>
        </SkeletonItem>
        <SkeletonItem>
          <div class="test">1234</div>
        </SkeletonItem>
        <SkeletonItem>
          <span>999</span>
        </SkeletonItem>
      </div>
    </Skeleton>
  </div>
</template>

<style scoped>
ul {
  transition: all 1s;
}

.test {
  height: 100px;
  margin-top: 10px;
}
</style>
