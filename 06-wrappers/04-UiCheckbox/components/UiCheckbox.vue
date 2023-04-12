<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" v-model="checkModel" v-bind="$attrs"/>
    <span class="checkbox__box"></span>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'UiCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, Array, Set],
      required: true,
    },

    value: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    argType() {
      return typeof this.modelValue == 'boolean' ? 'boolean' : Array.isArray(this.modelValue) ? 'array' : 'set';
    },

    checkModel: {
      get() {
        // console.log(this.value)
        let value;
        switch (this.argType) {
          case 'boolean':
            value = this.modelValue;
            break;
          case 'array':
            value = this.modelValue.includes(this.value);
            break;
          case 'set':
            value = this.modelValue.has(this.value);
            break;
        }
        return value;
      },
      set(data) {
        let newData;
        switch (this.argType) {
          case 'boolean':
            newData = data;
            break;
          case 'array':
            newData = [...this.modelValue];
            if (newData.includes(this.value)) {
              newData = newData.filter((item) => item != this.value);
            } else {
              newData.push(this.value);
            }
            break;
          case 'set':
            newData = new Set(this.modelValue);
            if (newData.has(this.value)) {
              newData.delete(this.value);
            } else {
              newData.add(this.value);
            }

        }
        this.$emit('update:modelValue', newData);
      }
    }
  }
}
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color, border-color;
}

.checkbox>input.checkbox__input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox>.checkbox__box {
  border: 2px solid var(--blue-light);
}

.checkbox>.checkbox__box {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox>input.checkbox__input:checked~.checkbox__box:after {
  display: block;
}

.checkbox>.checkbox__box:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('@/assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
