<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isUploading }" :style="image ? `--bg-url: url(${image})` : null" @click="handleClick">

        <span class="image-uploader__text">{{ previewMessage }}</span>
        
        <input
          v-bind="$attrs"
          ref="input"
          type="file"
          accept="image/*"
          class="image-uploader__input"
          @change="handleFileChange" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  data() {
    return {
      isUploading: false,
      image: null,
    }
  },

  created() {
    if (this.preview) this.image = this.preview;
  },

  computed: {
    previewMessage() {
      if (this.isUploading) return "Загрузка...";
      return this.image ? 'Удалить изображение' : 'Загрузить изображение';
    }
  },

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'remove', 'error', 'upload'],

  methods: {
    handleClick(event) {
      if (this.isUploading) {
        event.preventDefault();
      }
      else if (this.image) {
        event.preventDefault();
        this.handleDelete();
      }
    },

    handleFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        this.$emit('select', e.target.files[0]);
        this.image = URL.createObjectURL(e.target.files[0]);
        if (this.uploader) this.handleUpload(e.target.files[0]);
      }
    },

    handleDelete() {
      // где это правильно сделать?
      if (this.image.slice(0, 4) == 'blob') {
        URL.revokeObjectURL(this.image);
      }
      this.image = null;
      this.$refs['input'].value = null;
      this.$emit('remove');
    },

    handleUpload(file) {
      this.isUploading = true;
      this.uploader(file)
        .then((response) => {
          this.$emit('upload', response);
          this.image = response.image;
          this.isUploading = false;
        })
        .catch((error) => {
          this.$emit('error', error);
          this.handleDelete();
          this.isUploading = false;
        })
    }
  }
};
</script>

<style scoped>
.image-uploader {}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
