<template>
  <main>
    <h1>{{ action }} administrador</h1>
    <form id="Form" action="">
      <label for="InputUsuario">Usuario</label>
      <input v-model="username" id="InputUsuario" type="text" required>
      <label for="InputEmail">Email</label>
      <input v-model="email" id="InputEmail" type="email" required>
    </form>
    <nav>
      <button form="">Guardar</button>
      <button>Cancelar</button>
    </nav>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import { useAxios } from '~/composition'

const $route = useRoute()
const $axios = useAxios()

const username = ref('')
const email = ref('')

const id = computed(() => {
  return parseInt($route.value.params.id)
})

const action = computed(() => {
  return id.value ? 'Nuevo' : 'Modificar'
})

const loadData = async () => {
  const result = await $axios.$get(`/admins/${id.value}`)
  username.value = result.item.username
  email.value = result.item.email
}

onMounted(() => {
  loadData()
})

</script>