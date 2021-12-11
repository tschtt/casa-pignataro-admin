<template>
  <input
    :id="id"
    v-model="localValue"
    :required="required"
    type="number"
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
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
  }
}
</script>
