<template>
  <tr @click="updateSelected">
    <td>
      <label :for="id" class="hidden">
        Seleccionar
      </label>
      <input
        type="radio"
        v-bind="{ id, value, checked }"
        @change="updateSelected"
      >
    </td>
    <slot />
  </tr>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    }
  },
  computed: {
    id() {
      return `InputRadio${this.value}`
    },
    checked() {
      return this.selected === this.value
    }
  },
  methods: {
    updateSelected() {
      this.$emit('update:selected', this.value)
    }
  }
}
</script>
