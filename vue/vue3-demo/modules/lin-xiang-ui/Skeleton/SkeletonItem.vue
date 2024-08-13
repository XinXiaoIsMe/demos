<script>
import { onMounted, ref, inject, h, useSlots, nextTick } from 'vue';
import { VISIBLE } from './injection-keys';

export default {
  props: {
    width: String,
    height: String
  },
  setup (props) {
    const visible = inject(VISIBLE);
    const firstRender = ref(true);
    const width = ref(0);
    const height = ref(0);
    const childRef = ref();
    let oldClassName = '';
    let display;
    const defaultSlots = useSlots().default?.() || [];

    return () => {
      const slots = JSON.parse(JSON.stringify(defaultSlots));

      if (slots.length > 1) {
        console.warn('必须有一个根元素!');
        return slots;
      }

      if (!visible.value || !slots.length) return slots;

      nextTick(() => {
        const oChild = childRef.value;
        console.log(oChild);
        width.value = oChild.offsetWidth;
        height.value = oChild.offsetHeight;
        firstRender.value = false;
        display = window.getComputedStyle(oChild).display;
      });

      if (firstRender.value) {
        const {
          type,
          children
        } = slots[0];

        const props = slots[0].props || {};

        oldClassName = props.class || '';
        props.class = oldClassName + ' skeleton-item__first';
        props.ref = childRef;

        return h(type, { ...props }, children);
      }

      const { type } = slots[0];

      const props = slots[0].props || {};
      const style = props.style || {};

      props.class = oldClassName + ' skeleton-item';
      style.width = props.width || `${ width.value }px`;
      style.height = props.height || `${ height.value }px`;

      console.log(display, type);
      
      return display === 'inline' ? h('div', { ...props, style: { ...style, display: 'inline-block' } }) : h(type, { ...props, style });
    };
  }
}
</script>

<style lang="scss">
.skeleton-item {
  background-color: #ccc;

  &__first {
    visibility: hidden;
  }
}
</style>
