<template>
  <div class="field-attribute-container">
    <details class="field-attribute">
      <summary class="card-title">
        <input type="text" v-model="name_local" placeholder="Nuevo atributo">
      </summary>
      <fieldset class="card-content">
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
      remove
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
    margin-bottom: calc(var(--space-200) * -1);
    // margin-bottom: var(--space-200);
  }
}

.field-attribute-container {
  display: flex;
  align-items: flex-start;
  gap: var(--space-400);
  min-width: 0;

  > button {
    margin-top: var(--space-200);
    padding: var(--space-100);
  }
}

.field-attribute {
  --card-padding-inline: 0;
  --card-padding-block: 0;
  --card-shadow: var(--shadow-100);
  --card-space: 0;

  flex-grow: 1;

  box-shadow: var(--card-shadow);
  padding: var(--card-padding-inline) var(--card-padding-block);
  
  border-radius: 25px;

  box-shadow: var(--shadow-100);

  .card-title {
    display: flex;
    align-items: center;
    
    &::before {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;  /* Preferred icon size */
      display: inline-block;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;

      /* Support for all WebKit browsers. */
      -webkit-font-smoothing: antialiased;
      /* Support for Safari and Chrome. */
      text-rendering: optimizeLegibility;

      /* Support for Firefox. */
      -moz-osx-font-smoothing: grayscale;

      /* Support for IE. */
      font-feature-settings: 'liga';
      
      margin: var(--space-200);
      margin-right: 0;
      padding: var(--space-100);
      
      background-color: var(--clr-grey-200);
      color: var(--clr-grey-800);
      
      box-shadow: var(--shadow-100);
      border-radius: 25px;
      content: "arrow_right"
    }

    input {
      margin: var(--space-200);
      // box-shadow: none;
    }
  }

  .card-content {
    padding: var(--space-400);
  }

  &[open] {
    
    .card-title::before {
      content: "arrow_drop_down"
    }
    
    // --card-padding-inline: var(--space-300);
    // --card-padding-block: var(--space-500);
    // padding-bottom: var(--space-400);
  }

  .card-title {
    cursor: pointer;
  }
  .card-content {
    > * + * {
      margin-top: var(--space-100);
    }
  }
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
