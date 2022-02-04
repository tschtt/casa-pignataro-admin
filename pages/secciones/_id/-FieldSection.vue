<template>
  <fieldset>
    <legend class="subtitle">
      Datos de la seccion
    </legend>
    <FieldText 
      id="InputName" 
      v-model="name_local" 
      label="Nombre" 
      required 
    />
  </fieldset>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
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
    }
  }
}
</script>

<style>

</style>