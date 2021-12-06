<template>
  <main class="main">
    <h2>Mi Perfil</h2>
    <button class="button full-width" error @click="logout">
      Cerrar sesión
    </button>
  </main>
</template>

<script>
import { useRouter } from '@nuxtjs/composition-api'
import { useSession } from '~/composition/index.js'

export default {
  setup() {
    const $router = useRouter()
    const $session = useSession()
    
    const logout = async () => {
      await $session.logout()
      await $router.push('/sesion/iniciar')
    }

    return {
      logout,
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  background-color: var(--clr-grey-100);
  border-radius: 25px;
  box-shadow: var(--shadow-300);
  padding: var(--space-500);

  > * + * {
    margin-top: var(--space-500);
  }

  > h2 {
    font-family: var(--font-heading);
    font-size: var(--text-300);
    font-weight: bold;
  }
}

.full-width {
  width: 100%;
}

</style>