<template>
  <main class="card card-table">
    <h2 class="title">
      Artículos
    </h2>
    <TableFull
      :pagination="pagination"
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
            class="button button-margin-auto" 
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
    </TableFull>
    <nav class="actions">
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
import { ref, onMounted, useRouter, useRoute } from '@nuxtjs/composition-api'
import { useResource, useSession, useFetch, useHandler } from '~/composition/index.js'

export default {
  key(route) {
    return route.fullPath
  },
  setup() {
    const $router = useRouter()
    const $route = useRoute()
    const $session = useSession()
    const $fetch = useFetch()
    
    const $articles = useResource('/articles')
    const $categories = useResource('/categories?flat=true')
    
    const { handle } = useHandler()

    const items = ref([])
    const pagination = ref({})
    
    const categories = ref([])
    
    const selected = ref(0)

    // helpers

    const formatPrice = (value) => {
      return `$ ${parseFloat(value).toFixed(2)}`
    }

    const findCategorie = (id) => {
      return categories.value.find(item => item.id === id) || {}
    }

    // actions

    const toggleActive = handle(async (item) => {
      await $articles.updateOne(item.id, { ...item, active: !item.active })
      await loadArticles()
    })

    const remove = handle(async () => {
      await $articles.removeOne({ id: selected.value })
      await loadArticles()
    })

    // Search
    
    const loadArticles = async () => {
      const query = {}
      
      const { search, page } = $route.value.query
      
      if(search) {
        query.search = search
      }

      query.page = page || 0
      query.orderBy = 'code'
      
      const result =  await $articles.findMany(query)
      
      items.value =  result.items
      pagination.value = result.pagination
    }

    const loadCategories = async () => {
      categories.value =  await $categories.findMany()
    }

    const load = async () => {
      await loadArticles()
      await loadCategories()
    }
    
    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
        await load()
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })
    
    return {
      items,
      pagination,

      selected,
      
      findCategorie,
      formatPrice,
      
      toggleActive,
      remove,
    }
  }
}
</script>
