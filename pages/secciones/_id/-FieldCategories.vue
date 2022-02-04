<!-- eslint-disable vue/no-template-shadow -->
<template>
  <fieldset>
    <legend class="subtitle">Categorías</legend>
    <FieldCategory 
      v-for="(category, index) in categories_local" :key="index"
      v-bind.sync="categories_local[index]"
      :section="section"
      @remove="remove"
    />
    <FieldCategory add
      v-bind.sync="category"
      :section="section"
      @insert="insert"
    />
  </fieldset>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import FieldCategory from "./-FieldCategory.vue"
export default {
  components: {
    FieldCategory,
  },
  props: {
    section: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      requred: true,
    },
  },
  data() {
    return {
      category: {
        id: 0,
        name: '',
        attributes: [],
      }
    }
  },
  computed: {
    categories_local: {
      get() {
        return this.categories
      },
      set(value) {
        this.$emit('update:categories', value)
      }
    }
  },
  methods: {
    insert() {
      this.$emit('update:categories', [...this.categories, this.category])
      this.category = {
        id: 0,
        name: '',
        attributes: [],
      }
    },
    remove(id) {
      this.$emit('update:categories', this.categories.filter(c => c.id !== id))
    },
  }
}
</script>

<style scoped>

fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
}

</style>
