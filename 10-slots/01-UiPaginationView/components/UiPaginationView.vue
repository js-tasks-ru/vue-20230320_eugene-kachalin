<template>
  <div class="pagination-container">
    <slot :item="item" v-for="item in displayedItems" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  computed: {
    displayedItems() {
      const startIndex = (this.page - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.items.slice(startIndex, endIndex);
    }
  },

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
