<template>
  <details class="field-category">
    <summary class="card-title">
      <input type="text" v-model="name_local" placeholder="Nueva categoria" />
      <button v-if="add" class="button" icon success @click.prevent="insert">
        add
      </button>
      <button v-if="!add" class="button" icon error @click.prevent="remove">
        remove
      </button>
    </summary>
    <FieldAttributes :attributes.sync="attributes_local" />
  </details>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import FieldAttributes from './-FieldAttributes.vue'
export default {
  components: {
    FieldAttributes
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
      required: true
    },
    section: {
      type: String,
      required: true
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
        options: []
      }
    }
  },
  computed: {
    title() {
      return `${this.name || 'Nueva categoría'}`
    },
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
        options: []
      }
    },
    attributeRemove(index) {
      this.attributes_local = this.attributes_local.filter(
        (a, i) => i !== index
      )
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
  padding: 0;
  border: none;
  min-width: 0;

  legend {
    // margin-bottom: calc(var(--space-200) * -1);
    margin-bottom: var(--space-200);
  }
}

.field-category-container {
  display: flex;
  align-items: flex-start;
  gap: var(--space-400);
  width: 100%;

  > button {
    margin-top: var(--space-200);
    padding: var(--space-100);
  }
}

.field-category {
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
    justify-content: center;
    align-items: center;
    gap: var(--space-200);
    padding: var(--space-200);
    
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
      
      padding: var(--space-100);
      
      background-color: var(--clr-grey-200);
      color: var(--clr-grey-800);
      
      box-shadow: var(--shadow-100);
      border-radius: 25px;
      content: "arrow_right"
    }

    > input {
      margin: 0;
    }

    > button {
      padding: var(--space-100);
    }
  }
  .card-content {
    padding: var(--space-400);
  }

  &[open] {
    .card-title {
      &::before {
        content: 'arrow_drop_down';
      }
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

// .field-category {
//   --card-padding-inline: var(--space-100);
//   --card-padding-block: var(--space-400);
//   --card-shadow: var(--shadow-100);

//   .card-title {
//     cursor: pointer;
//   }

//   &[open] {
//     --card-padding-inline: var(--space-600);
//     --card-padding-block: var(--space-600);

//     position: absolute;
//     left: 0;
//     top: 0;

//     width: 100%;
//     height: 100%;

//     overflow-y: auto;

//     > .card-title {
//       font-family: var(--font-heading);
//       font-size: var(--text-300);
//       font-weight: bold;
//       line-height: 1rem;
//       letter-spacing: 1px;
//     }

//     > .card-content {
//       display: flex;
//       flex-direction: column;
//       gap: var(--space-200);

//       > .card-actions {
//         display: flex;
//         justify-content: flex-end;
//         align-items: flex-end;
//       }
//     }

//   }
// }
</style>
