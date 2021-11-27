<template>
  <main>
    <form id="LoginForm" @submit.prevent="login">
      <label for="InputUsername">Usuario</label>
      <input id="InputUsername" v-model="username" type="text" />

      <label for="InputUsername">Contraseña</label>
      <input id="InputUsername" v-model="password" type="password">
    </form>
    <nav>
      <button form="LoginForm">
        Iniciar Sesion
      </button>
    </nav>
  </main>
</template>

<script setup>
import { ref, useRouter, useStore } from '@nuxtjs/composition-api'

const $router = useRouter()
const $store = useStore()

const username = ref('santi')
const password = ref('123456')

const login = async () => {
  try {
    const data = {}

    data.username = username.value
    data.password = password.value
    
    await $store.dispatch('session/login', data)

    $router.push('/')
    
  } catch (error) {
    console.log(error)    
  }

}

</script>