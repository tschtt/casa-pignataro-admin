<template>
  <div class="field-attributes stack stack-400">
    <p>Atributos</p>
    <div class="attribute-list">
      <table class="attribute-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(attribute, index) in value"
            :key="index"
          >
            <td class="cell-name">
              <label :for="`input-attribute-${index}-name`" class="hide-visually">Nombre</label>
              <input :id="`input-attribute-${index}-name`" v-model="attribute.name" type="text">
            </td>
            <td class="cell-value">
              <label :for="`input-attribute-${index}-value`" class="hide-visually">Valor</label>
              <input :id="`input-attribute-${index}-value`" v-model="attribute.value" :list="`input-attribute-${attribute.name}-options`" type="text">
              <datalist v-if="attribute.options" :id="`input-attribute-${attribute.name}-options`">
                <option 
                  v-for="option in attribute.options"
                  :key="option.id"
                  :value="option.name"
                />
              </datalist>
            </td>
            <td class="cell-actions">
              <button icon class="button" @click.prevent="delAttribute(index)">
                delete
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <button class="button full-width" @click.prevent="addAttribute">
                Nuevo Atributo
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    attributes: {
      type: Array,
      required: true,
    },
  },
  watch: {
    attributes() {
      this.loadAttributes()
    }
  },
  mounted() {
    this.loadAttributes()
  },
  methods: {
    loadAttributes() {
      let value = this.value.filter(v => !!v.value)

      console.log(value)

      if(value.length === 0) {
        value = this.attributes.map(({ name, options }) => {
          return { name, value: '', options }
        })

        if(value.length === 0) {
          value.push({ name: '', value: '' })
        }
      }
      
      // value.push({ name: '', value: '' })

      this.$emit('input', value)
    },
    delAttribute(index) {
      this.$emit('input', this.value.filter((v,i) => i !== index))
    },
    addAttribute() {
      this.$emit('input', [...this.value, { name: '', value: '' }])
    },
  }
}
</script>

<style lang="scss" scoped>

.attribute-list {

  > * + * {
    margin-top: var(--space-400);
  }

  > .button {
    padding: var(--space-200);
    width: 100%;
  }
}

.attribute-table {
  width: 100%;

  input {
    margin: 0;
  }

  th {
    font-weight: normal;
  }
  
  td {
    padding-top: 0.5em;
    padding-left: 0.25em;
    padding-right: 0.25em;
  }
  .cell-actions {
    display: flex;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }
}

</style>