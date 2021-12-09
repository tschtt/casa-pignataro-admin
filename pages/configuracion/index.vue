<template>
  <main class="card">
    <h2 class="title">
      Configuración
    </h2>
    <form class="form" action="">
      <label for="ColorSelect">Tema de la página</label>
      <select id="ColorSelect" v-model="theme">
        <option value="orange">Naranja</option>
        <option value="red">Rojo</option>
        <option value="blue">Azul</option>
      </select>
    </form>
  </main>
</template>

<script>
import { useConfig } from '~/composition/index.js'

export default {
  setup() {
    const { theme } = useConfig()

    return {
      theme
    }
  }
}
</script>

<style>

</style>