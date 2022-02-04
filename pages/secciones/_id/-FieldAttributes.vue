<template>
  <fieldset class="field-attributes">
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

<style lang="scss" scoped>

.field-attributes {
  display: flex;
  flex-direction: column;
  gap: var(--space-300);

  padding: var(--space-400);
  

  > .subtitle {
    padding-block: var(--space-200);
    margin-bottom: calc(var(--space-200) * -1);
    // margin-bottom: var(--space-200);
    font-size: 18px;
  }
}

</style>
