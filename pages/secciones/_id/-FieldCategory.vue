<template>
  <details class="category-item">
    <summary class="category-item-name">
      {{ name_local || 'Nueva categoría' }}
    </summary>
    <div class="category-item-content">
      <FieldText
        id="InputName"
        v-model="name_local"
        label="Nombre"
        required
      />
      <div class="form-actions flex flex-wrap justify-end">
        <button v-if="add" class="button" success @click.prevent="insert">Agregar</button>
        <button v-if="!add" class="button" error @click.prevent="remove">Eliminar</button>
      </div>
    </div>
  </details>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    add: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    name_local: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      }
    }
  },
  methods: {
    insert() {
      this.$emit('insert')
    },
    remove() {
      this.$emit('remove', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>

.category-item {
  padding: var(--space-200) var(--space-400);

  border: 1px solid var(--clr-grey-400);
  border-radius: 15px;

  box-shadow: var(--shadow-100);

  transition: box-shadow 400ms ease;

  &:hover {
    box-shadow: var(--shadow-200);
  }

  + .category-item {
    margin-top: var(--space-400);
  }

  > * + * {
    margin-top: var(--space-400);
  }

  .category-item-name {
    cursor: pointer;
  }

  .category-item-content {
    padding: var(--space-200) var(--space-200);
  }
}
</style>

