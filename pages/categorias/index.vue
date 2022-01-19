<template>
  <main class="card card-table">
    <h2 class="title">
      Categorías
    </h2>
    <TableBase
      :columns="['Estado', 'Nombre']"
      :length="items.length"
    >
      <TableRow
        v-for="item in items" :key="item.id"
        :value="item.id"
        :selected.sync="selected"
      >
        <td class="flex justify-center">
          <button 
            class="button button-margin-auto"
            :success="!!item.active"
            :error="!item.active"
            small
            @click.stop="toggleActive(item)"
          >
            {{ item.active ? 'Activo' : 'Inactivo' }}
          </button>
        </td>
        <td>{{ item.name }}</td>
      </TableRow>
    </TableBase>
    <nav class="actions">
      <nuxt-link class="button" :to="'/categorias/0'">
        Agregar
      </nuxt-link>
      <nuxt-link :disabled="!selected" class="button" :event="selected ? 'click' : ''" :to="`/categorias/${selected}`">
        Modificar
      </nuxt-link>
      <button :disabled="!selected" class="button" @click="remove">
        Eliminar
      </button>
    </nav>
  </main>
</template>

<script>
import { ref, onMounted, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useFetch, useHandler } from '~/composition/index.js'

export default {
  setup() {
    const $router = useRouter()
    const $session = useSession()
    const $fetch = useFetch()
    
    const $categories = useResource('/categories')
    
    const { handle } = useHandler()

    const items = ref([])
    
    const selected = ref(0)

    const toggleActive = handle(async (item) => {
      await $categories.updateOne(item.id, { ...item, active: !item.active })
      await loadItems()
    })

    const remove = handle(async () => {
      await $categories.removeOne({ id: selected.value })
      await loadItems()
    })
    
    const loadItems = handle(async () => {
      items.value =  await $categories.findMany()
    })
    
    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
        await loadItems()
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })
    
    return {
      items,
      selected,
      toggleActive,
      remove,
    }
  }
}
</script>
