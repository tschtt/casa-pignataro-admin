<template>
  <div id="app" class="app-container">
    <header class="app-header">
      <h1>
        <img src="/logo-transparent.svg" alt="Casa Pignataro" height="50" width="200">
      </h1>
    </header>
    <div class="app-main">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.app-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 50ch) 1fr;
  grid-template-rows: 100px 1fr;
  
  background-color: var(--clr-grey-300);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  > .app-header {
    grid-column: 1 / -1;
    grid-row: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: var(--clr-main-600);
    padding: var(--space-500);
    box-shadow: var(--shadow-200);
  }

  > .app-main {
    grid-column: 2 / 3;
    grid-row: 2;
  }
  
}

</style>