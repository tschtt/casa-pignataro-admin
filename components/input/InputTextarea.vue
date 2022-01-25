<template>
  <textarea
    :id="id"
    v-model="localValue"
    :required="required"
    :name="name"
    :rows="rows"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: [Number, String],
      default: 8,
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
