<template>
  <div class="default-container">
    <header>
      <h1>Casa Pignataro</h1>
    </header>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/administradores">Administradores</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">Inicio</nuxt-link>          
        </li>
      </ul>
    </nav>
    <nuxt />
  </div>  
</template>

<style lang="scss" scoped>

.default-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;

  > header {
    grid-column: 1 / -1;
    grid-row: 1;
    padding: var(--space-500);
    box-shadow: var(--shadow-2);
  }

  > nav {
    grid-column: 1 / 2;
    grid-row: 2;
    padding: var(--space-500);
    box-shadow: var(--shadow-2);
  }

  > main {
    padding: var(--space-500);
  }
}

</style>