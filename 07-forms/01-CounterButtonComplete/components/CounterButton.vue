<template>
  <button @click="increaseCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    }
  },

  watch: {
    count(value) {
      if (this.localCount != value) {
        this.localCount = value
      }
    }
  },

  methods: {
    increaseCount() {
      this.localCount++;
      this.$emit('update:count', this.localCount)
    }
  },

  props: {
    count: {
      type: Number,
      default: 0,
    }
  }
};
</script>
