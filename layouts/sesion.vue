<template>
  <div class="sesion-container">
    <!-- <header>
      <h1>
        <img class="logo" src="/logo-transparent.svg" alt="Casa Pignataro" width="300">
      </h1>
    </header> -->
    <nuxt />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.sesion-container {
  display: grid;
  height: 100%;
  padding: var(--space-300);

  background-image: url('/construccion-fondo.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  > header {
    padding: 1rem;
  }
  
  .logo {
    margin: auto;
  }
}

</style>