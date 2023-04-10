<template>
  <div class="toasts">

    <UiToast class="toast" v-for="toast in toasts" :key="toast.id" :toast="toast" @delete="deleteToast" />

  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';


export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  data() {
    return {
      toasts: [],
    }
  },

  methods: {
    createToast(toastMessage, type, timeout = 5000) {
      // Math.random() as id/key?
      const toastId = Math.random();
      let toastIcon = '';
      let toastClass = `toast_${type}`;

      switch (type) {
        case 'success':
          toastIcon = 'check-circle';
          break;
        case 'error':
          toastIcon = 'alert-circle';
          break
        default:
          toastIcon = 'coffee';
      }

      let toast = {
        id: toastId,
        message: toastMessage,
        icon: toastIcon,
        class: toastClass,
        timerId: null,
      }

      toast.timerId = setTimeout(
        this.deleteToast,
        timeout,
        toast
      );

      this.toasts.push(toast);

    },

    success(message) {
      this.createToast(message, 'success');
    },

    error(message) {
      this.createToast(message, 'error');
    },

    // template for future types
    otherType(message) {
      this.createToast(message, 'other', 15000);
    },

    deleteToast(toast) {
      clearTimeout(toast.timerId);
      this.toasts = this.toasts.filter(el => el.id !== toast.id);
    }
  },
}
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast+.toast {
  margin-top: 20px;
}

/* .toast.toast_success {
  color: var(--green);
} */

/* .toast.toast_error {
  color: var(--red);
} */
</style>
