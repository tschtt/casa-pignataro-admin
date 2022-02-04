<template>
  <div class="field-attribute-container">
    <details class="field-attribute card">
      <summary class="card-title">
        {{ name_local || 'Nuevo Attributo' }}
      </summary>
      <FieldText
        id="InputName"
        v-model="name_local"
        label="Nombre"
        required
      />
      <fieldset>
        <legend class="text">Opciones</legend>
        <div class="option" v-for="(option, index) in options_local" :key="index">
          <input type="text" v-model="options_local[index].name" />
          <button class="button" icon error @click="optionRemove(index)">
            remove
          </button>
        </div>
        <div class="option">
          <input v-model="option.name" type="text" placeholder="Nueva opcion" />
          <button class="button" icon success @click="optionInsert">
            add
          </button>
        </div>
      </fieldset>
    </details>
    <button v-if="add" class="button" icon success @click.prevent="insert">
      add
    </button>
    <button v-if="!add" class="button" icon error @click.prevent="remove">
      delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    add: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      option: {
        id: 0,
        name: ''
      }
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
    options_local: {
      get() {
        return this.options
      },
      set(value) {
        this.$emit('update:options', value)
      }
    }
  },
  methods: {
    optionInsert() {
      this.options_local = [...this.options_local, this.option]
      this.option = {
        id: 0,
        name: '',
      }
    },
    optionRemove(index) {
      this.options_local = this.options_local.filter((o, i) => i !== index)
    },
    insert() {
      this.$emit('insert')
    },
    remove() {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  padding: 0;
  border: none;

  legend {
    margin-bottom: var(--space-200);
  }
}

.field-attribute-container {
  display: flex;
  align-items: flex-start;
  gap: var(--space-200);

  button {
    padding: var(--space-100);
  }
}

.field-attribute {
  --card-padding-inline: var(--space-100);
  --card-padding-block: var(--space-400);
  --card-shadow: var(--shadow-100);
  --card-space: var(--space-400);

  &[open] {
    // --card-padding-inline: var(--space-300);
    // --card-padding-block: var(--space-500);
    padding-bottom: var(--space-400);
  }

  .card-title {
    cursor: pointer;
  }

  .card-content {
    > * + * {
      margin-top: var(--space-100);
    }
  }

  // &[open] {
  //   --card-padding-inline: var(--space-600);
  //   --card-padding-block: var(--space-600);

  //   position: absolute;
  //   left: 0;
  //   top: 0;

  //   width: 100%;
  //   height: 100%;

  //   overflow-y: auto;

  //   .card-content {
  //     display: flex;
  //     flex-direction: column;
  //     gap: var(--space-200);
  //   }

  //   .card-title {
  //     font-family: var(--font-heading);
  //     font-size: var(--text-300);
  //     font-weight: bold;
  //     line-height: 1rem;
  //     letter-spacing: 1px;
  //   }
  // }
}

.option {
  display: flex;
  align-items: center;
  gap: var(--space-200);

  + .option {
    margin-top: var(--space-200);
  }

  input {
    margin: 0;
  }
  
  button {
    padding: var(--space-100);
  }
}
</style>
