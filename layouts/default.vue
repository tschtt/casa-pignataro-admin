<template>
  <div id="app" class="app-container">
    <header class="app-header shadow-300">
      <button class="material-icons" @click="toggleNav">
        menu
      </button>
      <h1>
        <img src="/logo-transparent.svg" alt="Casa Pignataro" height="50" width="200">
      </h1>
    </header>
    <nav class="app-nav shadow-200" :hidden="!showNav">
      <ul class="app-nav-list">
        <li>
          <button class="material-icons" @click="toggleNav" dark>
            menu
          </button>
        </li>
        <li>
          <nuxt-link to="/administradores" @click.native="toggleNav">
            Administradores
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" @click.native="toggleNav">
            Inicio
          </nuxt-link>          
        </li>
      </ul>
    </nav>
    <div class="app-main">
      <nuxt class="background-pattern" />
    </div>
  </div>  
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  setup() {
    const showNav = ref(false)

    const toggleNav = () => {
      showNav.value = !showNav.value
    }

    return {
      showNav,
      toggleNav,
    }
  },
}
</script>

<style lang="scss" scoped>

.app-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 80ch) 1fr;
  grid-template-rows: 100px auto;

  min-height: 100%;

  background-color: var(--clr-grey-300);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  > .app-header {
    grid-column: 1 / -1;
    grid-row: 1 / 2;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0;

    z-index: 10;
  }

  > .app-nav {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    z-index: 20;
  }

  > .app-main {
    grid-column: 2 / 3;
    grid-row: 2 / -1;
    overflow-x: hidden;
    min-height: 100%;
    padding: var(--space-500);
  }
  
}

.app-header {
  display: flex;
  align-items: center;
  background-color: var(--clr-main-600);
  padding: var(--space-300) var(--space-500);
  gap: var(--space-500);

  > button {
    align-self: center;
    justify-self: start;
  }
}

.app-nav {
  background-color: var(--clr-main-300);
  transition: all 500ms ease-in-out;
}

.app-nav[hidden] {
  display: block;
  transform: translateX(-100%);  
}

.app-nav-list {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 100px auto;

  font-family: var(--font-heading);
  font-size: var(--text-300);
  color: var(--clr-main-800);

  > :first-child {
    font-size: var(--text-400);
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: var(--space-300) var(--space-500);
    gap: var(--space-500);
  }

  a {
    display: block;
    text-decoration: none;
    padding: var(--space-300) var(--space-500);
    background-color: var(--clr-main-300);
    transition: color 250ms ease;
    transition: background-color 500ms ease;
  }

  a:hover,
  a:focus {
    outline: none;
    background-color: var(--clr-main-800);
    color: var(--clr-main-300);
  }

  a:focus {
    text-decoration: underline;
  }

}

button {
  background-color: var(--clr-main-200);
  color: var(--clr-main-800);
  
  padding: var(--space-200);
  
  border: none;
  border-radius: 100%;
  
  box-shadow: var(--shadow-200);
  
  transition: color, background-color 250ms ease;
}

button[dark] {
  background-color: var(--clr-main-800);
  color: var(--clr-main-200);
}

button[dark]:hover,
button[dark]:focus {
  background-color: var(--clr-main-200);
  color: var(--clr-main-800);
}

button[dark]:focus {
outline: 2px solid var(--clr-main-800);
}

button:hover,
button:focus {
  background-color: var(--clr-main-800);
  color: var(--clr-main-200);
}

button:focus {
  outline: 2px solid var(--clr-main-200);
}

</style>