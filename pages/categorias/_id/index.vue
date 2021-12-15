<template>
  <main class="card">
    <h2 class="title">
      {{ item.name || 'Categoría' }}
    </h2>
    <section class="stack stack-500">
      <h3 class="subtitle">
        Datos de la categoría
      </h3>
      <form id="MainForm" class="form" @submit.prevent="save">
        <FieldText 
          id="InputName" 
          v-model="item.name" 
          label="Nombre de la categoría" 
          required 
        />
      </form>
      <nav>
      </nav>
    </section>
    <section v-if="item.id" class="stack stack-500">
      <h3 class="subtitle">
        Subcategorías
      </h3>
      <TableBase
        :columns="['Estado', 'Nombre']"
        :length="item && item.categories && item.categories.length"
        class="table-border"
      >
        <TableRow
          v-for="item in item.categories" :key="item.id"
          :value="item.id"
          :selected.sync="selected"
        >
          <td class="flex justify-center">
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
          <td>{{ item.name }}</td>
        </TableRow>
      </TableBase>
    </section>
    <section class="stack stack-500">
      <h3 class="hide-visually">
        Acciones
      </h3>
      <nav class="stack stack-500">
        <div v-if="item.id" class="flex flex-wrap justify-end">
          <nuxt-link class="button" :to="`/categorias/0?fkCategorie=${item.id}`">
            Agregar subcategoría
          </nuxt-link>
          <nuxt-link :disabled="!selected" class="button" :event="selected ? 'click' : ''" :to="`/categorias/${selected}`">
            Modificar subcategoría
          </nuxt-link>
          <button :disabled="!selected" class="button" @click="remove">
            Eliminar subcategoría
          </button>
        </div>
        <div class="flex flex-wrap justify-end">
          <button class="button" @click="cancel">
            Cancelar
          </button>
          <button class="button" form="MainForm" success>
            Guardar
          </button>          
        </div>
      </nav>
    </section>
  </main>
</template>

<script>
import { computed, onMounted, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useHandler } from '~/composition'

export default {
  key(route) {
    return route.fullPath
  },
  setup() {
    const $session = useSession()
    const $route = useRoute()
    const $router = useRouter()

    const $categories = useResource('/categories')

    const { handle } = useHandler()
    
    const item = ref({})

    const selected = ref(0)
    
    const id = computed(() => {
      return parseInt($route.value.params.id)
    })
    
    const action = computed(() => {
      return id.value ? 'Modificar' : 'Nuevo'
    })
    
    const save = handle(async () => {
      if(id.value) {
        await $categories.updateOne(id.value, item.value)
      } else {
        await $categories.insertOne({
          ...item.value,
          fkCategorie: parseInt($route.value.query.fkCategorie) || 0,
        })
      }
      $router.back()
    })

    const remove = handle(async () => {
      await $categories.removeOne({ id: selected.value })
      await loadItem()
    })

    const cancel = () => {
      $router.back()
    }

    const toggleActive = handle(async (item) => {
      await $categories.updateOne(item.id, { ...item, active: !item.active })
      await loadItem()
    })
    
    const loadItem = handle(async () => {
      item.value = await $categories.findOne(id.value)
    })
    
    onMounted(async () => {
      await $session.onlyAuthed()
      await loadItem()
    })

    return {
      item,
      action,
      selected,
      save,
      remove,
      cancel,
      toggleActive,
    }
  }  
}

</script>

<style lang="scss" scoped>

// main {
//   margin: 0 auto;
//   max-width: 50ch;
//   padding: var(--space-500);
//   background-color: var(--clr-grey-100);
//   border-radius: 25px;
//   box-shadow: var(--shadow-300);


//   > * + * {
//     margin-top: var(--space-500);
//   }

//   > h2 {
//     font-family: var(--font-heading);
//     font-size: var(--text-300);
//     font-weight: bold;
//     line-height: 1em;
//   }

//   > nav {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: right;
//     gap: var(--space-200);
//   }

// }

</style>