<template>
  <input
    :id="id"
    v-model="localValue"
    :required="required"
    type="number"
    :step="step"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', parseFloat(value))
      }
    },
  }
}
</script>
