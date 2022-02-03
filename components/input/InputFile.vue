<template>
  <div class="input">
    <span v-if="count === 0">Subir imagenes...</span>
    <span v-if="count === 1">{{ count }} imagen cargada</span>
    <span v-if="count > 1">{{ count }} imagenes cargadas</span>
    <input
      :id="id"
      :required="required"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      ref="input"
      type="file"
      @input="load"
    >
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api"

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
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
  setup(props, { emit }) {
    const count = ref(0)

    const load = (event) => {
      count.value = event.target.files.length
      emit('input', Array.from(event.target.files))
    }

    return {
      count,
      load, 
    }
  }
}
</script>

<style lang="scss" scoped>

.input {
  position: relative;
  
  padding: var(--space-500) var(--space-500);

  border-radius: 10px;
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