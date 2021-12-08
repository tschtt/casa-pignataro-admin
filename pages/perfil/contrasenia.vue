<template>
  <main class="card card-narrow center" narrow>
    <h2 class="title text-center">
      Reinicar Contraseña
    </h2>
    <form id="MainForm" class="form" @submit.prevent="save">
      <label for="InputPassword">Contraseña</label>
      <input id="InputPassword" type="password" v-model="password">
    </form>
    <nav class="flex justify-center">
      <button class="button" form="MainForm" main>
        Reiniciar Contraseña
      </button>
    </nav>
  </main>
</template>

<script>
import { ref, useRouter, onMounted } from '@nuxtjs/composition-api'
import { useFetch, useSession, useNotification } from "~/composition/index.js"

export default {
  setup() {
    const $fetch = useFetch()
    const $router = useRouter()
    const $session = useSession()
    const $notification = useNotification()

    const password = ref("")

    const save = async () => {
      await $fetch.patch('/session/user', { 
        body: {
          password: password.value,
          passwordReset: 0,
        }
      })

      await $notification.insert({ message: 'Contraseña actualizada!' })

      await $router.push('/')
    }

    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })

    return {
      password,
      save,
    }
  }
}
</script>
