<template>
  <UiInput :type="type" :step="step" v-model="date" ref="input">
    <template v-if="$slots['left-icon']" #left-icon>
      <slot name="left-icon" />
    </template>
    <template v-if="$slots['right-icon']" #right-icon>
      <slot name="right-icon" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  computed: {
    date: {
      get() {
        if (!this.modelValue) return null;
        
        const date = new Date(this.modelValue).toISOString();
        if (this.type == 'date') return date.substring(0, 10);
        else if (this.type == 'time') {
          if (this.step && this.step % 60 != 0) return date.substring(11, 19);
          else return date.substring(11, 16);
        }
        else return date.substring(0, 19);
      },
      set(_) {
        const value = this.$refs['input'].$refs['input'].valueAsNumber;
        this.$emit('update:modelValue', value);
      }
    }
  },

  props: {
    type: {
      type: String,
      validator: (value) => (value) => ['date', 'time', 'datetime-local'].includes(value),
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
      default: null,
    },
  }
};
</script>
