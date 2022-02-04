<template>
  <details class="field-category card">
    <summary class="card-title">
      {{ name_local || 'Nueva categoría' }}
    </summary>
    <div class="card-content">
      <fieldset>
        <legend class="subtitle">Datos de la categoría</legend>
        <FieldText id="InputName" v-model="name_local" label="Nombre" required />
      </fieldset>
      <FieldAttributes :attributes.sync="attributes_local" />
      <div class="card-actions">
        <button v-if="add" class="button" success @click.prevent="insert">
          Agregar
        </button>
        <button v-if="!add" class="button" error @click.prevent="remove">
          Eliminar
        </button>
      </div>
    </div>
  </details>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import FieldAttributes from './-FieldAttributes.vue'
export default {
  components: { 
    FieldAttributes,
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    attributes: {
      type: Array,
      required: true,
    },
    add: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      attribute: {
        id: 0,
        name: '',
        options: [],
      },
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
    },
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
    attributeInsert() {
      this.attributes_local = [...this.attributes_local, this.attribute]
      this.attribute = {
        id: 0,
        name: '',
        options: [],
      }
    },
    attributeRemove(index) {
      this.attributes_local = this.attributes_local.filter((a,i) => i !== index)
    },
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

fieldset {
  border: none;
}
.field-category {
  --card-padding-inline: var(--space-200);
  --card-padding-block: var(--space-400);
  --card-shadow: var(--shadow-100);

  .card-title {
    cursor: pointer;
  }

  &[open] {
    --card-padding-inline: var(--space-600);
    --card-padding-block: var(--space-600);
    
    position: absolute;
    left: 0;
    top: 0;
    
    width: 100%;
    height: 100%;

    overflow-y: auto;

    > .card-title {
      font-family: var(--font-heading);
      font-size: 20px;
      line-height: 1rem;
      letter-spacing: 1px;
    }

    > .card-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-200);

      > .card-actions {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }

  }
}

</style>
