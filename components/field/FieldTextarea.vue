<template>
  <div>
    <label 
      :class="{ hidden: hideLabel }"
      :for="id"
    >
      {{ label }}
    </label>
    <InputTextarea
      :id="id"
      v-model="localValue"
      :name="name"
      :required="required"
      :rows="rows"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
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