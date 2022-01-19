<template>
  <div id="app" class="[ app-container ][ bg-pattern ]">
    <header class="[ app-header ][ bg-main-600 padding-500 shadow-200 ][ flex flex-center ]">
      <h1>
        <img 
          src="/logo-transparent.svg" 
          alt="Casa Pignataro Electrodomésticos" 
          width="200" height="50"
        />
      </h1>
    </header>
    <NotificationList />
    <div class="app-main">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.app-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 55ch) 1fr;
  grid-template-rows: 100px 1fr;

  > .app-header {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  > .app-main {
    grid-column: 2 / 3;
    grid-row: 2;
    padding: var(--space-600) var(--space-500);
  }
}

</style>