<template>
  <main class="stack">
    <h1>
      Administradores
    </h1>
    <TableBase
      :columns="['Estado', 'Usuario', 'Email']"
      :length="items.length"
    >
      <TableRow
        v-for="item in items" :key="item.username"
        :value="item.id"
        :selected.sync="selected"
      >
        <td>{{ item.activo ? 'Activo' : 'Inactivo' }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
      </TableRow>
    </TableBase>
    <nav class="cluster right">
      <nuxt-link class="button" :to="'/administradores/0'">
        Nuevo
      </nuxt-link>
      <nuxt-link v-if="selected" class="button" :to="`/administradores/${selected}`">
        Modificar
      </nuxt-link>
      <button v-if="selected" class="button">
        Eliminar
      </button>
    </nav>
  </main>
</template>

<script>
import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { $axios } = useContext()
    
    const items = ref([])
    
    const selected = ref(0)
    
    const loadItems = async () => {
      const result = await $axios.$get('/admins')
      items.value = result.items
    }
    
    onMounted(() => {
      loadItems()
    })
    
    return {
      items,
      selected,
    }
  }
}
</script>
