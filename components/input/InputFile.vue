<template>
  <div class="input">
    <span>Subir archivos...</span>
    <input
      :id="id"
      :required="required"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      type="file"
    >
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>

.input {
  position: relative;

  padding: var(--space-500) var(--space-500);

  outline: 2px dashed var(--clr-grey-400);
  outline-offset: calc(var(--space-200) * -1);

  color: var(--clr-grey-600);

  > span {
    cursor: pointer;
  }
  
  > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}

</style>