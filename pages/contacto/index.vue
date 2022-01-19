<template>
  <main class="card card-table">
    <h2 class="title">
      Datos de contacto
    </h2>
    <TableBase
      :columns="['Estado', 'Orden', 'Icono', 'Dato', 'Descripción']"
      :length="items.length"
    >
      <TableRow
        v-for="item in items" :key="item.order"
        :value="item.id"
        :selected.sync="selected"
      >
        <td>
          <button 
            class="button" 
            :success="!!item.active"
            :error="!item.active"
            small
            @click.stop="toggleActive(item)"
          >
            {{ item.active ? 'Activo' : 'Inactivo' }}
          </button>
        </td>
        <td>{{ item.order }}</td>
        <td>
          <span class="material-icons">
            {{ item.icon }}
          </span>
        </td>
        <td>{{ item.name }}</td>
        <td>
          <pre class="contact-value">{{ item.value }}</pre>
        </td>
      </TableRow>
    </TableBase>
    <nav class="actions">
      <nuxt-link class="button" :to="'/contacto/0'">
        Agregar
      </nuxt-link>
      <nuxt-link :disabled="!selected" class="button" :event="selected ? 'click' : ''" :to="`/contacto/${selected}`">
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
    
    const $admins = useResource('/contact')
    
    const { handle } = useHandler()

    const items = ref([])
    
    const selected = ref(0)

    const toggleActive = handle(async (item) => {
      await $admins.updateOne(item.id, { ...item, active: !item.active })
      await loadItems()
    })

    const remove = handle(async () => {
      await $admins.removeOne({ id: selected.value })
      await loadItems()
    })
    
    const loadItems = handle(async () => {
      items.value =  await $admins.findMany()
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

<style lang="scss" scoped>

.contact-value {
  text-align: left;
}

</style>
