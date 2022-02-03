<template>
  <main class="card">
    <h2 class="title">
      Sección
    </h2>
    <section class="stack stack-500">
      <h3 class="subtitle">
        Datos de la seccion
      </h3>
      <form id="MainForm" class="form" @submit.prevent="save">
        <FieldText 
          id="InputName" 
          v-model="item.name" 
          label="Nombre de la categoría" 
          required 
        />
      </form>
    </section>
    <section v-if="item.id" class="stack stack-500">
      <h3 class="subtitle">
        Categorías
      </h3>
      <div>
        {{ item.categories }}
      </div>
    </section>
    <section class="stack stack-500">
      <h3 class="hide-visually">
        Acciones
      </h3>
      <nav class="flex flex-wrap justify-end">
        <button class="button" @click="cancel">
          Cancelar
        </button>
        <button class="button" form="MainForm" success>
          Guardar
        </button>
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

    const $sections = useResource('/sections')

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
        await $sections.updateOne(id.value, item.value)
      } else {
        await $sections.insertOne({
          ...item.value,
          fkCategorie: parseInt($route.value.query.fkCategorie) || 0,
        })
      }
      $router.back()
    })

    const remove = handle(async () => {
      await $sections.removeOne({ id: selected.value })
      await loadItem()
    })

    const cancel = () => {
      $router.back()
    }

    const toggleActive = handle(async (item) => {
      await $sections.updateOne(item.id, { ...item, active: !item.active })
      await loadItem()
    })
    
    const loadItem = handle(async () => {
      item.value = await $sections.findOne(id.value)
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