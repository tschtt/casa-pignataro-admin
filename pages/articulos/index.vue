<template>
  <main class="main">
    <h2 class="title">
      Artículos
    </h2>
    <TableBase
      :columns="['Estado', 'Código', 'Nombre', 'Precio', 'Categoría']"
      :length="items.length"
    >
      <TableRow
        v-for="item in items" :key="item.order"
        :value="item.id"
        :selected.sync="selected"
      >
        <td >
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
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
        <td right>{{ formatPrice(item.value) }}</td>
        <td left>{{ findCategorie(item.fkCategorie).full }}</td>
      </TableRow>
    </TableBase>
    <nav>
      <nuxt-link class="button" :to="'/articulos/0'">
        Agregar
      </nuxt-link>
      <nuxt-link :disabled="!selected" class="button" :event="selected ? 'click' : ''" :to="`/articulos/${selected}`">
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
    
    const $articles = useResource('/articles')
    const $categories = useResource('/categories?flat')
    
    const { handle } = useHandler()

    const items = ref([])
    const categories = ref([])
    
    const selected = ref(0)

    const formatPrice = (value) => {
      return `$ ${parseFloat(value).toFixed(2)}`
    }

    const findCategorie = (id) => {
      return categories.value.find(item => item.id === id) || {}
    }

    const toggleActive = handle(async (item) => {
      await $articles.updateOne({ ...item, active: !item.active })
      await loadItems()
    })

    const remove = handle(async () => {
      await $articles.removeOne({ id: selected.value })
      await loadItems()
    })
    
    const loadItems = handle(async () => {
      items.value =  await $articles.findMany()
      categories.value =  await $categories.findMany()
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
      findCategorie,
      formatPrice,
      toggleActive,
      remove,
    }
  }
}
</script>

<style lang="scss" scoped>

.main {
  background-color: var(--clr-grey-100);
  box-shadow: var(--shadow-400);
  border-radius: 25px;

  > h2 {
    padding: var(--space-500);
  }

  > nav {
    padding: var(--space-500);
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    gap: var(--space-200);
  }
}

.contact-value {
  min-width: 50ch;
  text-align: left;
}

</style>
