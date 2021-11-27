<template>
  <main>
    <h1>Administradores</h1>
    <TableBase
      :columns="['Estado', 'Usuario', 'Email']"
      :items="items"
    >
      <TableRow
        v-for="(item, index) in items" :key="index"
        :value="item.id"
        :selected.sync="selectedId"
      >
        <td>{{ item.activo ? 'Activo' : 'Inactivo' }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
      </TableRow>
    </TableBase>
    <nav>
      <nuxt-link class="button" :to="'/administradores/0'">Nuevo</nuxt-link>
      <nuxt-link v-if="selectedId" class="button" :to="`/administradores/${selectedId}`">Modificar</nuxt-link>
      <button v-if="selectedId" class="button">Eliminar</button>
    </nav>
  </main>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

const { $axios } = useContext()

const items = ref([])

const selectedId = ref(0)

const loadItems = async () => {
  const result = await $axios.$get('/admins')
  items.value = result.items
}

onMounted(() => {
  loadItems()
})

</script>

<style>

</style>