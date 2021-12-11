<template>
  <div id="app" class="app-container bg-pattern" :theme="theme">
    <header class="[ app-header ][ align-center ][ bg-main-600 shadow-300 ]">
      <button class="[ header-button ][ justify-self-start ][ material-icons ]" @click="toggleNav">
        menu
      </button>
      <h1>
        <nuxt-link to="/">
          <img src="/logo-transparent.svg" alt="Casa Pignataro" height="50" width="200">
        </nuxt-link>
      </h1>
      <nav class="flex justify-end">
        <nuxt-link class="header-button material-icons" to="/perfil" @click="toggleNav">
          account_circle
        </nuxt-link>
      </nav>
    </header>
    <nav class="[ app-nav ][ title-2 clr-main-800 bg-main-300 shadow-200 ]" :hidden="!showNav">
      <ul class="app-nav-list">
        <li class="flex align-center">
          <button class="header-button material-icons" @click="toggleNav" dark>
            menu
          </button>
        </li>
        <li>
          <nuxt-link to="/" @click.native="toggleNav">
            Inicio
          </nuxt-link>          
        </li>
        <li>
          <nuxt-link to="/perfil" @click.native="toggleNav">
            Mi Perfil
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/administradores" @click.native="toggleNav">
            Administradores
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contacto" @click.native="toggleNav">
            Datos de Contacto
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/configuracion" @click.native="toggleNav">
            Configuración
          </nuxt-link>          
        </li>
      </ul>
    </nav>
    <NotificationList />
    <div class="app-main">
      <nuxt class="background-pattern" />
    </div>
  </div>  
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import { useConfig } from '~/composition/index.js'

export default {
  setup() {
    const { theme } = useConfig()
    
    const showNav = ref(false)

    const toggleNav = () => {
      showNav.value = !showNav.value
    }

    return {
      theme,
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
  grid-template-rows: 100px 1fr;
  min-height: 100%;

  > .app-header {
    grid-column: 1 / -1;
    grid-row: 1 / 2;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-300);

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
    padding: var(--space-600) var(--space-500);
  }
  
}

.app-header {
  padding: var(--space-300) var(--space-500);
  gap: var(--space-500);
}

.app-nav {
  transition: transform 500ms ease-in-out;
}

.app-nav[hidden] {
  display: block;
  transform: translateX(-100%);  
}

.app-nav-list {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 100px auto;

  > :first-child {
    padding: var(--space-300) var(--space-500);
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

.header-button {
  background-color: var(--clr-main-200);
  color: var(--clr-main-800);
  
  padding: var(--space-200);
  
  border: none;
  border-radius: 100%;
  
  box-shadow: var(--shadow-200);
  
  transition: 
    background-color 250ms ease,
    color 250ms ease;
}

.header-button[dark] {
  background-color: var(--clr-main-800);
  color: var(--clr-main-200);
}

.header-button[dark]:hover,
.header-button[dark]:focus {
  background-color: var(--clr-main-200);
  color: var(--clr-main-800);
}

.header-button[dark]:focus {
outline: 2px solid var(--clr-main-800);
}

.header-button:hover,
.header-button:focus {
  background-color: var(--clr-main-800);
  color: var(--clr-main-200);
}

.header-button:focus {
  outline: 2px solid var(--clr-main-200);
}

</style>