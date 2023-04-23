<script>
import { compile } from 'vue';
// Works
// import UiAlert from '/Users/.../vue-20230320_eugene-kachalin/09-rendering/02-TemplateRenderer/components/UiAlert.vue';
export default {
  name: 'TemplateRenderer',

  // components: () => {this.components},

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  // created() {
  //   for (const name in this.components) {
  //     // component(name)
  //   }
  // },

  computed: {
    renderFunction() {
      return compile(
        this.template,
        {
          // still not working
          isCustomElement: (tag) => tag.startsWith('ui-')
        }
      )
    }
  },

  render(...args) {
    return this.renderFunction.apply(this, args);
  },
}
</script>
