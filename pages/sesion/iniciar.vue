<template>
  <main class="app-main">
    <h2 class="font-heading bold text-300 text-center">
      Iniciar Sesión
    </h2>
    <form id="LoginForm" class="form" @submit.prevent="login">
      <label for="InputUsername">Usuario</label>
      <input id="InputUsername" v-model="username" type="text" />

      <label for="InputUsername">Contraseña</label>
      <input id="InputUsername" v-model="password" type="password">
    </form>
    <nav class="flex flex-center">
      <button class="button" form="LoginForm" main>
        Iniciar Sesión
      </button>
    </nav>
  </main>
</template>

<script>
import { ref, useRouter } from '@nuxtjs/composition-api'
import { useSession, useHandler } from '~/composition/index.js'

export default {
  layout: 'sesion',
  setup() {
    const $router = useRouter()
    const $session = useSession()
    
    const { handle } = useHandler()

    const username = ref('santi')
    const password = ref('123456')

    const login = handle(async () => {
      const data = {}

      data.username = username.value
      data.password = password.value

      await $session.login(data)

      $router.push('/')        
    })

    return {
      username,
      password,
      login,
    }
  }
}
</script>

<style lang="scss" scoped>

.app-main {
  margin: var(--space-700) var(--space-500);
  padding: var(--space-500);

  background-color: var(--clr-grey-100);
  border-radius: 25px;
  box-shadow: var(--shadow-400);

  > * + * {
    margin-top: var(--space-500);
  }

  > h2 {
    font-family: var(--font-heading);
    font-size: var(--text-300);
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
  }
}

</style>