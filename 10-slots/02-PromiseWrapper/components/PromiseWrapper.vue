<template>
  <slot v-if="status == 'pending'" name="pending" />
  <slot v-if="status == 'resolved'" :result="item" name="fulfilled" />
  <slot v-if="status == 'rejected'" :error="error" name="rejected" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  data() {
    return {
      item: null,
      error: null,
      status: null,
    }
  },

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  watch: {
    promise: {
      handler() {
        this.status = 'pending';
        this.error = null;
        this.item = null;
        
        this.promise
          .then((result) => {
            this.status = 'resolved';
            this.item = result;
          })
          .catch((error) => {
            this.status = 'rejected';
            this.error = error;
        });
      },
      immediate: true
    }
  }
};
</script>
