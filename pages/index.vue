<template>
  <main>
  </main>
</template>

<script>
import { onMounted, useRouter } from '@nuxtjs/composition-api'
import { useSession, useFetch } from '~/composition'

export default {
  setup() {
    const $router = useRouter()
    const $session = useSession()
    const $fetch = useFetch()

    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })
  },
}
</script>
