<template>
  <main class="card stack">
    <h1 class="title-2 text-center">
      Iniciar Sesión
    </h1>
    <form id="LoginForm" @submit.prevent="login">
      <label for="InputUsername">Usuario</label>
      <input id="InputUsername" v-model="username" type="text" />

      <label for="InputUsername">Contraseña</label>
      <input id="InputUsername" v-model="password" type="password">
    </form>
    <nav class="cluster">
      <button class="button" form="LoginForm">
        Iniciar Sesión
      </button>
    </nav>
  </main>
</template>

<script>
import { ref, useRouter } from '@nuxtjs/composition-api'
import { useSession } from '~/composition/index.js'

export default {
  layout: 'sesion',
  setup() {
    const $router = useRouter()
    const $session = useSession()

    const username = ref('santi')
    const password = ref('123456')

    const login = async () => {
      const data = {}

      data.username = username.value
      data.password = password.value

      await $session.login(data)

      $router.push('/')
    }

    return {
      username,
      password,
      login,
    }
  }
}

</script>

<style scoped lang="scss">

.card {
  --stack-space: var(--space-500);
  place-self: center;
  min-width: 60ch;
}

</style>