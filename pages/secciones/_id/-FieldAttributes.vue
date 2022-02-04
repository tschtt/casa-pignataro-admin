<template>
  <fieldset>
    <legend class="subtitle">Atributos</legend>
    <FieldAttribute 
      v-for="(a, index) in attributes_local" :key="index"
      v-bind.sync="attributes_local[index]"
      @remove="remove(index)"
    />
    <FieldAttribute add
      v-bind.sync="attribute"
      @insert="insert"
    />
  </fieldset>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import FieldAttribute from "./-FieldAttribute.vue"
export default {
  components: {
    FieldAttribute,
  },
  props: {
    attributes: {
      type: Array,
      requred: true,
    },
  },
  data() {
    return {
      attribute: {
        id: 0,
        name: '',
        options: [],
      }
    }
  },
  computed: {
    attributes_local: {
      get() {
        return this.attributes
      },
      set(value) {
        this.$emit('update:attributes', value)
      }
    }
  },
  methods: {
    insert() {
      this.$emit('update:attributes', [...this.attributes, this.attribute])
      this.attribute = {
        id: 0,
        name: '',
        attributes: [],
      }
    },
    remove(index) {
      this.$emit('update:attributes', this.attributes.filter((c,i) => i !== index))
    },
  }
}
</script>

<style scoped>

fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
}

</style>
