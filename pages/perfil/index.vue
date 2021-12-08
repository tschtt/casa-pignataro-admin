<template>
  <main class="[ main card ]">
    <h2 class="title">
      Mi Perfil
    </h2>
    <nav class="stack stack-300">
      <nuxt-link class="button full-width" to="/perfil/contrasenia">
        Cambiar Contraseña
      </nuxt-link>
      <button class="button full-width" error @click="logout">
        Cerrar sesión
      </button>
    </nav>
  </main>
</template>

<script>
import { onMounted, useRouter } from '@nuxtjs/composition-api'
import { useSession, useFetch, useHandler } from '~/composition/index.js'

export default {
  setup() {
    const $fetch = useFetch()
    const $router = useRouter()
    const $session = useSession()
    
    const { handle } = useHandler()
    
    const logout = handle(async () => {
      await $session.logout()
      await $router.push('/sesion/iniciar')
    })

    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })

    return {
      logout,
    }
  }
}
</script>
