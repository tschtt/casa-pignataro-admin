<template>
  <main class="main stack">
    <h2>
      Administradores
    </h2>
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
    <nav>
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
import { ref, onMounted, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useFetch } from '~/composition/index.js'

export default {
  setup() {
    const $router = useRouter()
    const $session = useSession()
    const $fetch = useFetch()
    
    const $admins = useResource('/admins')
    
    const items = ref([])
    
    const selected = ref(0)
    
    const loadItems = async () => {
      items.value =  await $admins.findMany()
    }
    
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
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  padding: var(--space-400);

  > * + * {
    margin-top: var(--space-400);
  }

  > h2 {
    font-family: var(--font-heading);
    font-size: var(--text-300);
    padding: var(--space-200);
    background-color: var(--clr-grey-100);
    text-align: center;
    font-weight: bold;
    box-shadow: var(--shadow-200);
    border-radius: 10px;
  }

  > nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    gap: var(--space-200);
  }
}

</style>
