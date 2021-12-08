<template>
  <main class="card stack stack-600">
    <h2 class="title text-center">
      Iniciar Sesión
    </h2>
    <form id="LoginForm" class="form" @submit.prevent="login">
      <label for="InputUsername">Usuario</label>
      <input id="InputUsername" v-model="username" type="text" required />

      <label for="InputUsername">Contraseña</label>
      <input id="InputUsername" v-model="password" type="password" required />
    </form>
    <nav class="flex justify-center">
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

    const username = ref('')
    const password = ref('')

    const login = handle(async () => {
      const data = {}

      data.username = username.value
      data.password = password.value

      await $session.login(data)

      if($session.user.value.passwordReset) {
        await $router.push('/perfil/contrasenia')
      }
      else {
        await $router.push('/')
      }
    })

    return {
      username,
      password,
      login,
    }
  }
}
</script>
