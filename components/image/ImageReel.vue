<template>
  <div class="image-container scroll-x shadow-200">
    <div v-for="(image, index) in images" class="image relative" :key="image">
      <button class="material-icons" @click.prevent="remove(index)">
        close
      </button>
      <img :src="image" width="500" height="500" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    remove(index) {
      this.$emit('remove', index)
    }
  }
}
</script>

<style lang="scss" scoped>

.image-container {
  border-radius: 10px;

  > * {
    padding: var(--space-300);
    gap: var(--space-200);
  }
  
  button {
    position: absolute;
    top: var(--space-100);
    right: var(--space-100);

    padding: var(--space-200);

    box-shadow: var(--shadow-200);
    
    border: none;
    border-radius: 100%;
  }

  img {
    border-radius: 10px;
    box-shadow: var(--shadow-200);
  }
  
}

.image {
  width: 200px;
  min-width: 200px;
  aspect-ratio: 1;
  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

</style>