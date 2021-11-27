<template>
  <main></main>
</template>

<script setup>
import { onMounted, useStore, useRouter } from '@nuxtjs/composition-api'

const $store = useStore()
const $router = useRouter()

const logout = async () => {
  await $store.dispatch('session/logout')
  $router.push('/sesion/iniciar')
}

onMounted(() => {
  logout()
})

</script>
