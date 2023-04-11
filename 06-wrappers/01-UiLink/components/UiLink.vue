<template>
  <component :is="tag" class="link">
    <slot />
  </component>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'UiLink',

  props: {
    tag: {
      type: [String, Object, Function],
      default: RouterLink,
    },
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
