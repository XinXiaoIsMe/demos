import { createApp } from 'vue';
import Dialog from './Dialog.vue';

export default function useDialog (options) {
  const props = {
    ...options,
    onClose () {
      app.unmount();
    }
  };
  const app = createApp(Dialog, props);
  const frag = document.createDocumentFragment();
  app.mount(frag);
  document.body.appendChild(frag);
}